# Create your tests here.
from django.test import TestCase
from rest_framework.test import APIRequestFactory, APITestCase

class BasicTest(APITestCase):
    def test_get_all_booking(self):
        booking_date = date.today() + timedelta(days=10)
        response = self.client.get(f'/parking/parkinglot/?=${booking_date}')
        self.assertEqual(response.json()['message'], "success")
        
    def test_single_booking(self):
        booking_date = date.today() + timedelta(days=10)
        data={
            
            "name":"ed",
            "license_plate_number":"ed52",
            "date":f"{booking_date}"   
        }
        response = self.client.post('/parking/parkinglot/',data)
        print(response.json())
        self.assertEqual(response.json()['message'], 'sucessfully created')