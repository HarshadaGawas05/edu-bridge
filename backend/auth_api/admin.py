from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'display_name', 'get_email', 'created_at')  # Use get_email to display email
    search_fields = ('display_name', 'user__email')  # Use user__email to search by email

    # Define a method to get the user's email
    def get_email(self, obj):
        return obj.user.email
    get_email.admin_order_field = 'user__email'  # Allow sorting by email
    get_email.short_description = 'Email'  # Label for the column
