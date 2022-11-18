from django import forms
from .models import PhoneMessageModel


# creating a form
class PhoneMessageForm(forms.ModelForm):

	# create meta class
	class Meta:
		# specify model to be used
		model = PhoneMessageModel

		# specify fields to be used
		fields = [
			"phoneNumber",
			"message",
		]
