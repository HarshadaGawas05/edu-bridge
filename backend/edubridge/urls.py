from django.contrib import admin
from django.urls import path, include
from courses.views import enroll_course, complete_course #course_detail
from django.views.generic import RedirectView

urlpatterns = [
    path("", RedirectView.as_view(url="/admin/", permanent=False)),  # Redirect to admin
    path("admin/", admin.site.urls),
    #path("course/<int:course_id>/enroll/", enroll_course, name="enroll_course"),  # Enroll in course
    path('course/<int:course_id>/enroll/', enroll_course, name='enroll_course'),
    path("admin/", admin.site.urls),
    path("auth_api/", include("auth_api.urls")),  # Include auth_api URLs
]
