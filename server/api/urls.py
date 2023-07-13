

from django.urls import path,re_path
from .views import Login,Signup,GetUserDetails,VerifyOTP,GetRoomDetails,TurnServers,UserStatus,CheckIfRoomExists,TokenRefresh,CheckIfHostHasJoinedRoom,ConvertHtmlToDocx
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView
from dj_rest_auth.views import LoginView, LogoutView

urlpatterns = [
    path('Login/', Login.as_view()),
    path('Signup/', Signup.as_view()),
    path('VerifyOTP/', VerifyOTP.as_view()),
    path('GetRoomDetails/',GetRoomDetails.as_view()),
    path('TurnServers/',TurnServers.as_view()),
    path('UserStatus/',UserStatus.as_view()),
    path('CheckIfRoomExists/',CheckIfRoomExists.as_view()),
    path('CheckIfHostHasJoinedRoom/',CheckIfHostHasJoinedRoom.as_view()),
    path('GetUserDetails/',GetUserDetails.as_view()),
    path('ConvertHtmlToDocx/',ConvertHtmlToDocx.as_view()),
]