
from django.urls import path
from .views import PhoneMessageApiView

urlpatterns = [
    path('api', PhoneMessageApiView.as_view()),
]