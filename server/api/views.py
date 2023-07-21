from django.shortcuts import render
from rest_framework.generics import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from .helpers import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import *
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
import datetime
from rest_framework.response import Response
from .models import User
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from twilio.rest import Client
import json
from rest_framework_simplejwt.views import TokenRefreshView
import requests
from django.http import FileResponse
from django.conf import settings
import os
from docx import Document
from io import BytesIO
from bs4 import BeautifulSoup
# Create your views here.
from django.core.files.storage import FileSystemStorage
import html2text

class VerifyOTP(APIView):  # Making a Class Based View Called Verify OTP
    def post(self, request):  # making a post reuqest
        data = request.data  # collecting the data sent by the frontend
        # Using the Serializer Class VerifyOTPSerializer and sending in the data to the serializer
        serializer = VerifyOTPSerializer(data=data)
        if serializer.is_valid():  # checing is serializer accepts the data
            # obtaining the email of the person from the serialized data
            email = serializer.data["email"]
            # obtaining the otp from the serialized data
            otp = serializer.data["otp"]
            # getting or filtering the user with email equal to the email sent by the frontend
            user = User.objects.filter(email=email)
            if not user.exists():  # if the user is not present in the database then he is unauthorized
                return Response("UnAuthorized", status=status.HTTP_401_UNAUTHORIZED)
            # if otp is wrong then asking the user to retry thus sending a http response of a bad request
            if user[0].otp != otp:
                return Response("Wrong Otp Please Retry", status=status.HTTP_400_BAD_REQUEST)
            user = user.first()  # since filter gives list of objects so we filter out the first element from the list using the .first()
            # since otp is verified as it had no obstacles so making the email_is_verified Field True
            user.email_is_verified = True
            user.save()  # saving the user instance
        # senidng a http response of 200 saying the user that his otp is verified
        return Response('OTP Succesfully Verified', status=status.HTTP_200_OK)


class Signup(CreateAPIView):  # making a class Based view using APIView
    serializer_class = UserSerializer
    queryset = User.objects.all()


class Login(APIView):  # making a class based view called Login Using APIView
    def post(self, request):  # creating a post request
        try:
            username = request.data['username']
            password = request.data['password']
            email = request.data['email']
            user = User.objects.filter(username=username).first()
            if user is None:  
                return Response({'error': 'invalid username or password'}, status=status.HTTP_404_NOT_FOUND)
            if not user.check_password(password):
                return Response({'error': 'invalid username or password'}, status=status.HTTP_404_NOT_FOUND)
            else:
                if email == user.email:  
                    refresh = RefreshToken.for_user(user)
                    user.last_login = datetime.datetime.now() 
                    user.save()  
                    tokens = requests.post('http://localhost:8000/api/token/', data={"username":username,"password":password})
                    if(tokens.status_code == 401):
                        return Response({'error': 'invalid username or password'}, status=status.HTTP_404_NOT_FOUND)
                    if(tokens.status_code == 500):
                        return Response({'error': 'Some Error Occured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    print(tokens.json())
                    if(tokens.status_code == 200):
                        access_token = tokens.json()['access']
                        refresh_token = tokens.json()['refresh']
                        return Response({  
                            'id':user.id,
                            'message': 'login successfull',
                            'refresh':str(refresh_token),
                            'access': str(access_token),
                            'username': user.username,
                            'last_login_date': getdate(),
                            'last_login_time': gettime(),
                            'email': user.email},
                            status=status.HTTP_200_OK)

                else:  
                    return Response({'errors': 'email not matched'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'errors': 'Some Error Occured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class TokenRefresh(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            try:
                # Verify and decode the existing refresh token
                token = RefreshToken(refresh_token)

                # Rotate the refresh token by blacklisting the current token
                token.blacklist()

                # Generate a new refresh token and access token
                user = token.get('user')
                new_refresh = RefreshToken.for_user(user)
                new_access = new_refresh.access_token

                return Response({
                    'refresh': str(new_refresh),
                    'access': str(new_access),
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Refresh token not provided'}, status=status.HTTP_400_BAD_REQUEST)




class GetRoomDetails(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        try:
            user = self.request.user
            room_id = request.data['roomID']
            length_of_participants = request.data['length_of_participants']
            old_room = Room.objects.filter(room_id=room_id).filter(created_by = user).first()
            room = Room.objects.filter(room_id = room_id).first()
            if old_room is not None:
                serializer = RoomSerializer(old_room)
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                if room is None:
                    return Response({'errors': 'Room Not Found'}, status=status.HTTP_404_NOT_FOUND)
                else:
                    serializer = RoomSerializer(room)
                    return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'errors': 'Some Error Occured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class TurnServers(APIView):
    def get(self,request):
        AccountSID = "ACceb1c26f5c6fc371a6fa793dbcb74814"
        AuthToken = "2ae496b97e92993c62610aa48756efb1"
        client = Client(AccountSID, AuthToken)
        token = client.tokens.create()
        ice_servers = token.ice_servers  # Retrieve the iceServers from the token
        return Response(ice_servers)
    

class UserStatus(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = self.request.user
        data = request.data
        room_id = data['roomID']
        room = Room.objects.filter(room_id = room_id).first()
        if room is not None:
            return Response('joinroom')
        else:
            return Response('createroom')
class CheckIfRoomExists(APIView):
    def post(self,request):
        data = request.data
        room_id = data['roomID']
        room = Room.objects.filter(room_id = room_id).first()
        if room is not None:
            return Response(True)
        else:
            return Response(False)
        
class CheckIfHostHasJoinedRoom(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        data = request.data
        room_id = data['roomID']
        user = self.request.user
        AllRooms = Room.objects.filter(room_id = room_id)
        totalsum = 0
        for room in AllRooms:
            totalsum += room.participants
        HostCreatedRoom = Room.objects.filter(room_id = room_id).filter(created_by = user).first()
        UserCreatedRoom = Room.objects.filter(room_id = room_id).filter(joined_by = user).first()
        if UserCreatedRoom is not None:
            if UserCreatedRoom.blocked == True:
                return Response('Blocked')
        if totalsum >= AllRooms.first().capacity:
            print('Room Full',Room.objects.filter(room_id = room_id).filter(is_active = True).count())
            return Response('Room Full')
        if AllRooms.first() is not None:
            if AllRooms.first().is_active == True:
                return Response(True)
            else:
                if HostCreatedRoom is not None:
                    if HostCreatedRoom.is_active == False:
                        HostCreatedRoom.is_active = True
                        HostCreatedRoom.save()
                        return Response(True)
                    else:
                        return Response(False)
                else:
                    return Response(False)
                    
    
class GetUserDetails(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        id = request.data["id"]
        #dont send password
        user = User.objects.filter(id = id).first()
        if user is not None:
            #except for the password send everything else
            serializer = UserSerializer(user)
            return Response({'id':serializer.data['id'],"email":serializer.data['email'],'username':serializer.data['username']},status=status.HTTP_200_OK)
        else:
            return Response({'errors': 'User Not Found'}, status=status.HTTP_404_NOT_FOUND)
        

class ConvertHtmlToDocx(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        data=request.data['data']
        html_content = str(BeautifulSoup(data))
        document = Document()
        document.add_paragraph(html2text.html2text(str(html_content)))

        # Save the Word document to a temporary file
        temp_file_path = os.path.join(settings.MEDIA_ROOT, 'temp.docx')
        document.save(temp_file_path)

        # Upload the Word document to the media folder using Django's FileSystemStorage
        fs = FileSystemStorage()
        filename = fs.save('converted.docx', open(temp_file_path, 'rb'))

        # Generate the download URL
        uploaded_file_url = fs.url(filename)
        download_url = request.build_absolute_uri(uploaded_file_url)

        # Delete the temporary file
        os.remove(temp_file_path)

        # Return the download URL in a JSON response
        return Response({'download_url': download_url})
    

class ChangeRoomCapacity(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        data = request.data
        user = request.user
        room_id = data['roomID']
        capacity = data['capacity']
        room = Room.objects.filter(room_id = room_id).filter(created_by = user).first()
        if room is not None:
            room.capacity = capacity
            room.save()
            return Response({capacity:capacity},status=status.HTTP_200_OK)
        else:
            return Response('Room Not Found',status=status.HTTP_500_INTERNAL_SERVER_ERROR)