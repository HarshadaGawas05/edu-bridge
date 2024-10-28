"""
URL configuration for edubridge project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from courses.views import enroll_course, complete_course, course_detail
from django.views.generic import RedirectView

urlpatterns = [
    path("", RedirectView.as_view(url="/admin/", permanent=False)),  # Redirect to admin
    path("admin/", admin.site.urls),
    
    # Course URLs
    path("course/<int:course_id>/", course_detail, name="course_detail"),  # Course detail view
    path("course/<int:course_id>/enroll/", enroll_course, name="enroll_course"),  # Enroll in course
]
