from django.urls import path
from .views import GoogleSignInView, UserProfileView, CreateUserProfileView  # Import class, not function

urlpatterns = [
    path("google-signin/", GoogleSignInView.as_view(), name="google-signin"),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
    path("user-profile/", CreateUserProfileView.as_view(), name="createuser_profile"),  # Correct usage
]
