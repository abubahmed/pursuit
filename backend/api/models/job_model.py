from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model
from numpy import number
from .season_model import Season

User = get_user_model()


class Job(models.Model):
    JOB_STATUS_CHOICES = [
        ("Research", "Research"),
        ("Applied", "Applied"),
        ("Assessment", "Assessment"),
        ("Interview", "Interview"),
        ("Offer", "Offer"),
        ("Rejected", "Rejected"),
        ("Waitlisted", "Waitlisted"),
        ("Withdrawn", "Withdrawn"),
        ("Other", "Other"),
        ("", "None"),
    ]
    JOB_DURING_CHOICES = [
        ("Winter", "Winter"),
        ("Spring", "Spring"),
        ("Summer", "Summer"),
        ("Fall", "Fall"),
        ("Year-round", "Year-round"),
        ("Other", "Other"),
        ("", "None"),
    ]
    JOB_TYPE_CHOICES = [
        ("Full-time", "Full-time"),
        ("Part-time", "Part-time"),
        ("Contract", "Contract"),
        ("Internship", "Internship"),
        ("Freelance", "Freelance"),
        ("Other", "Other"),
        ("", "None"),
    ]
    JOB_LEVEL_CHOICES = [
        ("Entry", "Entry"),
        ("Mid", "Mid"),
        ("Senior", "Senior"),
        ("Lead", "Lead"),
        ("Manager", "Manager"),
        ("Director", "Director"),
        ("Other", "Other"),
        ("", "None"),
    ]
    JOB_MODE_CHOICES = [
        ("Remote", "Remote"),
        ("Onsite", "Onsite"),
        ("Hybrid", "Hybrid"),
        ("Other", "Other"),
        ("", "None"),
    ]

    url = models.URLField(max_length=2000, blank=True, null=True)
    title = models.CharField(max_length=200, blank=True, null=True)
    company = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    salary = models.CharField(max_length=200, blank=True, null=True)
    status = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        choices=JOB_STATUS_CHOICES,
    )
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    skills = ArrayField(
        models.CharField(max_length=200), blank=True, default=list, null=True
    )
    during = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        choices=JOB_DURING_CHOICES,
    )
    type = models.CharField(
        max_length=200,
        choices=JOB_TYPE_CHOICES,
        blank=True,
        null=True,
    )
    level = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        choices=JOB_LEVEL_CHOICES,
    )
    mode = models.CharField(
        max_length=200,
        choices=JOB_MODE_CHOICES,
        blank=True,
        null=True,
    )
    starred = models.BooleanField(default=False)
    hidden = models.BooleanField(default=False)
    number = models.IntegerField(blank=True, null=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="job_user", blank=True, null=True
    )
    season = models.ForeignKey(
        Season,
        on_delete=models.CASCADE,
        related_name="job_season",
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.title + " at " + self.company + " (" + self.status + ")"
