# Generated by Django 5.1.1 on 2024-12-18 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("auth_api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="education",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="enrollment_date",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="skill_level",
            field=models.CharField(
                choices=[
                    ("beginner", "Beginner"),
                    ("intermediate", "Intermediate"),
                    ("advanced", "Advanced"),
                ],
                default="beginner",
                max_length=50,
            ),
        ),
    ]