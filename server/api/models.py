from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from .helpers import getdate
from .manager import UserManager
# Create your models here.
class User(AbstractUser):
    email_is_verified = models.BooleanField(null=True,default=False,blank=True)
    otp = models.CharField(max_length=10,null=True,blank=True,default=None)
    
    REQUIRED_FIELDS = []
restoreHistory
class Room(models.Model):
    room_id = models.UUIDField(default = uuid.uuid4,editable = False)
    name = models.CharField(max_length=100)
    capacity = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(User,to_field="username",on_delete=models.CASCADE,related_name="creater")
    joined_by = models.ForeignKey(User,to_field="username",on_delete=models.CASCADE,related_name="joiner",default=None)
    created_at = models.CharField(max_length=100,default = getdate)
