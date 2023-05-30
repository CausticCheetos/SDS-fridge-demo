from django.db import models

# Create your models here.
class Flow(models.Model):
    FlowId = models.AutoField(primary_key=True)
    date = models.DecimalField(max_digits=50, decimal_places=0)
    value = models.DecimalField(max_digits=50, decimal_places=45)

    def _str_(self):
            return self.value
    
class Notification(models.Model):
    NotificationId = models.AutoField(primary_key=True)
    ParamName = models.TextField()
    ParamDescription = models.TextField()
    ParamType = models.TextField()
    ParamStartRange = models.TextField()
    ParamEndRange = models.TextField()

    def _str_(self):
         return self.ParamName

class UserEmail(models.Model):
    UserEmailId = models.AutoField(primary_key=True)
    EmailAddress = models.EmailField(unique=True)
    def _str_(self):
         return self.EmailAddress

class User(models.Model):

    type = (
        ('1','user'),
        ('2','admin'),
    )
    userId = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=128)
    lastname = models.CharField(max_length=128)
    password = models.CharField(max_length=256)
    email = models.EmailField(unique=True)
    usertype = models.CharField(max_length=32,choices=type,default='1')

    def __str__(self):
        return self.name