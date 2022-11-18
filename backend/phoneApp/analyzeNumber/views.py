from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PhoneMessageModel
from .serializers import SnippetSerializer


@api_view(['GET', 'POST'])
def phone_message_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        phoneMessages = PhoneMessageModel.objects.all()
        serializer = SnippetSerializer(phoneMessages, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)