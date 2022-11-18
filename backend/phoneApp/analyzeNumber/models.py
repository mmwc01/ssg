from django.db import models
 
class PhoneMessageModel(models.Model):
    phoneNumber = models.BigIntegerField(default=0)
    message = models.TextField()
 
    def __str__(self):
        return self.phoneNumber