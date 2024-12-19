from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    google_id = models.CharField(max_length=255, unique=True)  # Unique Google ID
    display_name = models.CharField(max_length=255)  # User's Google display name
    photo_url = models.URLField(blank=True, null=True)  # URL of profile picture
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # Optional phone number
    address = models.TextField(blank=True, null=True)  # Optional address
    date_of_birth = models.DateField(blank=True, null=True)  # Optional DOB

    # New Fields for Edu-Bridge
    education = models.CharField(max_length=255, blank=True, null=True)  # User's education level
    skill_level = models.CharField(
        max_length=50,
        choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')],
        default='beginner'
    )  # Skill level choice
    enrollment_date = models.DateField(blank=True, null=True)  # Date the user enrolled in courses

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set on creation
    updated_at = models.DateTimeField(auto_now=True)  # Automatically update on save

    def __str__(self):
        return f"{self.display_name} ({self.user.username})"
