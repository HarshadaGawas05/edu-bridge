from django.contrib import admin
from .models import Course, Enrollment, CourseCompletion

admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(CourseCompletion)
