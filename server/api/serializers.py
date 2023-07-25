from rest_framework import serializers
from .models import User,Room
from .helpers import *
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email','first_name','last_name','password')
        

class VerifyOTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email_is_verified","otp","email")

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"
