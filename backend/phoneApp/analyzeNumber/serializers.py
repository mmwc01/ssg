# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from .models import PhoneMessageModel


class PhoneMessageSerializer(serializers.Serializer):
    PhoneNumber = serializers.IntegerField(required=True)
    Message = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):
        """
        Create and return a new `PhoneMessage` instance, given the validated data.
        """
        return PhoneMessageModel.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `PhoneMessage` instance, given the validated data.
        """
        instance.PhoneNumber = validated_data.get('phoneNumber', instance.phoneNumber)
        instance.Message = validated_data.get('message', instance.message)
        instance.save()
        """TODO: insert analysis logic here and don't just return instance"""
        return instance
