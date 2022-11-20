from django.db import models
 
class PhoneMessageModel(models.Model):
    phoneNumber = models.TextField(default='')
    message = models.TextField()
 
    def __str__(self):
        return self.phoneNumber