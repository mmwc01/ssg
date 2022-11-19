from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PhoneMessageModel
from .serializers import PhoneMessageSerializer

class PhoneMessageApiView(APIView):
    # 1. List all
    def get(self, request, *args, **kwargs):
        phoneMessages = PhoneMessageModel.objects.all()
        serializer = PhoneMessageSerializer(phoneMessages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        data = {
            'task': request.data.get('task'), 
            'completed': request.data.get('completed'), 
            'user': request.user.id
        }
        serializer = PhoneMessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)