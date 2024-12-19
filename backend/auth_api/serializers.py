from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'google_id', 'display_name', 'photo_url', 'phone_number', 'address', 'date_of_birth']
