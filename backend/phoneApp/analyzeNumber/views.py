from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PhoneMessageSerializer
from .services import PhoneMessageDataAnalysisService

class PhoneMessageApiView(APIView):
    # 1. Create
    def post(self, request, *args, **kwargs):
        data = {
            'phoneNumber': request.data.get('phoneNumber'), 
            'message': request.data.get('message')
        }
        serializer = PhoneMessageSerializer(data=data)
        if serializer.is_valid():
            phone_object = PhoneMessageDataAnalysisService.analyze_phone(PhoneNumber=data['phoneNumber'])
            new_message = PhoneMessageDataAnalysisService.convert_message(original_message=data['message'])
            phone_object['message'] = new_message
            return Response(phone_object, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    