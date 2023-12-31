from django.db import models
from django.contrib.auth.models import AbstractUser,PermissionsMixin,BaseUserManager
import uuid
from .helpers import getdate
from .manager import UserManager
# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self,email,username,password=None):
        if not email:
            raise ValueError("User must have an email address")
        email = self.normalize_email(email)
        user = self.model(email = email,username = username)
        user.set_password(password)
        user.save(using=self._db)
        return user
    

class User(AbstractUser,PermissionsMixin):
    email = models.EmailField(max_length=225,unique=True)
    email_is_verified = models.BooleanField(null=True,default=False,blank=True)
    otp = models.CharField(max_length=10,null=True,blank=True,default=None)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

class Room(models.Model):
    room_id = models.UUIDField(default = uuid.uuid4,editable = False)
    name = models.CharField(max_length=100)
    capacity = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(User,to_field="username",on_delete=models.CASCADE,related_name="creater")
    joined_by = models.ForeignKey(User,to_field="username",on_delete=models.CASCADE,related_name="joiner",default=None)
    created_at = models.CharField(max_length=100,default = getdate)
    participants = models.IntegerField(default=0)
    blocked = models.BooleanField(default=False)

