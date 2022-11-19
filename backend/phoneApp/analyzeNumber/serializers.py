# todo/todo_api/serializers.py
from rest_framework import serializers
from .models import PhoneMessageModel
class PhoneMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneMessageModel
        fields = ["phoneNumber", "message"]