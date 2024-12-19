from django.shortcuts import render

# Create your views here.
from firebase_admin import auth
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer


class GoogleSignInView(APIView):
    def post(self, request):
        data = request.data
        google_id = data.get('google_id')
        email = data.get('email')
        display_name = data.get('display_name')
        photo_url = data.get('photo_url')

        if not google_id or not email:
            return Response({"error": "Google ID and email are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user already exists
        user, created = User.objects.get_or_create(username=email, defaults={"email": email})

        # Update or create the UserProfile
        profile, created = UserProfile.objects.update_or_create(
            user=user,
            defaults={
                "google_id": google_id,
                "display_name": display_name,
                "photo_url": photo_url,
            },
        )

        return Response(
            {
                "message": "User profile saved successfully.",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "display_name": profile.display_name,
                    "photo_url": profile.photo_url,
                },
            },
            status=status.HTTP_200_OK,
        )


class UserProfileView(APIView):
    def get(self, request):
        # Step 1: Verify Firebase ID token
        id_token = request.headers.get('Authorization')

        if id_token is None:
            return Response({"error": "Authentication token is missing"}, status=status.HTTP_400_BAD_REQUEST)

        id_token = id_token.split(' ')[1] if id_token.startswith('Bearer ') else id_token

        try:
            decoded_token = auth.verify_id_token(id_token)
            firebase_uid = decoded_token['uid']
            
            # Step 2: Retrieve or create the user
            user, created = User.objects.get_or_create(username=firebase_uid)
            profile = UserProfile.objects.get_or_create(user=user)

            # Step 3: Return the user profile data
            return Response({
                "id": profile.id,
                "email": user.email,
                "display_name": profile.display_name,
                "photo_url": profile.photo_url
            }, status=status.HTTP_200_OK)

        except auth.InvalidIdTokenError:
            return Response({"error": "Invalid Firebase ID token"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateUserProfileView(APIView):
    def post(self, request):
        user = request.user  # Get the authenticated user

        if not user.is_authenticated:
            return Response({"error": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        google_id = data.get('google_id')

        user_profile, created = UserProfile.objects.get_or_create(user=user, google_id=google_id)

        # Serialize and return profile data
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)