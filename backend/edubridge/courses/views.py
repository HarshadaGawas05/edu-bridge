import json  # Make sure to import json
from django.shortcuts import render, get_object_or_404, redirect
from .models import Course, Enrollment, CourseCompletion
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.http import JsonResponse


@login_required
def enroll_course(request, course_id):
    print(f"User: {request.user}, Authenticated: {request.user.is_authenticated}") # Debug line

    course = get_object_or_404(Course, id=course_id)

    if request.method == "POST":
        # Load JSON data from the request body
        data = json.loads(request.body)
        name = data.get('name')
        education = data.get('education')

        # Create enrollment
        enrollment, created = Enrollment.objects.get_or_create(
            user=request.user,
            course=course,
            defaults={
                'name': name,
                'education': education,
            }
        )

        if created:
            return JsonResponse({'message': 'Enrollment successful.', 'enrollment_id': enrollment.id})
        else:
            return JsonResponse({'error': 'You are already enrolled in this course.'}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@login_required
def course_detail(request, course_id):
    course = get_object_or_404(Course, id=course_id)
    return render(request, 'courses/course_detail.html', {'course': course})

@login_required
def complete_course(request, enrollment_id):
    enrollment = get_object_or_404(Enrollment, id=enrollment_id, user=request.user)

    # Mark enrollment as completed
    enrollment.completed = True
    enrollment.save()

    # Create CourseCompletion record
    CourseCompletion.objects.create(enrollment=enrollment)

    return render(request, 'courses/completion_confirmation.html', {'enrollment': enrollment})
