from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    education = models.CharField(max_length=100, blank=True, null=True)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} enrolled in {self.course.title}"

class CourseCompletion(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    completion_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.enrollment.user.username} completed {self.enrollment.course.title} on {self.completion_date}"
