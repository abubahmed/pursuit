from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model

User = get_user_model()


class Job(models.Model):
    url = models.URLField(blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    salary = models.CharField(max_length=100, blank=True, null=True)
    STATUS_CHOICES = [
        ("Open", "Open"),
        ("Closed", "Closed"),
        ("Opening soon", "Opening soon"),
        ("Other", "Other"),
    ]
    status = models.CharField(
        max_length=100, blank=True, null=True, choices=STATUS_CHOICES
    )
    STAGE_CHOICES = [
        ("Research", "Research"),
        ("Application", "Application"),
        ("Assessment", "Assessment"),
        ("Interview", "Interview"),
        ("Pending", "Pending"),
        ("Offer", "Offer"),
        ("Rejected", "Rejected"),
        ("Waitlisted", "Waitlisted"),
        ("Other", "Other"),
    ]
    stage = models.CharField(
        max_length=100, blank=True, null=True, choices=STAGE_CHOICES
    )
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    skills = ArrayField(
        models.CharField(max_length=100), blank=True, default=list, null=True
    )
    DURING_CHOICES = [
        ("Winter", "Winter"),
        ("Spring", "Spring"),
        ("Summer", "Summer"),
        ("Fall", "Fall"),
        ("Year-round", "Year-round"),
        ("Other", "Other"),
    ]
    during = models.CharField(
        max_length=100, blank=True, null=True, choices=DURING_CHOICES
    )
    TYPE_CHOICES = [
        ("Full-time", "Full-time"),
        ("Part-time", "Part-time"),
        ("Contract", "Contract"),
        ("Internship", "Internship"),
        ("Freelance", "Freelance"),
        ("Fellowship", "Fellowship"),
        ("Other", "Other"),
    ]
    type = models.CharField(max_length=100, choices=TYPE_CHOICES, blank=True, null=True)
    LEVEL_CHOICES = [
        ("Entry", "Entry"),
        ("Mid", "Mid"),
        ("Senior", "Senior"),
        ("Lead", "Lead"),
        ("Manager", "Manager"),
        ("Director", "Director"),
        ("Other", "Other"),
    ]
    level = models.CharField(
        max_length=100, blank=True, null=True, choices=LEVEL_CHOICES
    )
    MODE_CHOICES = [
        ("Remote", "Remote"),
        ("Onsite", "Onsite"),
        ("Hybrid", "Hybrid"),
        ("Other", "Other"),
    ]
    mode = models.CharField(max_length=100, choices=MODE_CHOICES, blank=True, null=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="jobs", blank=True, null=True
    )

    def __str__(self):
        return self.title + " at " + self.company


mock_job = {
    "title": "Software Engineer",
    "company": "Google",
    "description": "Develop and maintain software applications.",
    "location": "New York, NY",
    "salary": 120000.00,
    "status": "Open",
    "stage": "Application",
    "skills": ["Python", "Django", "JavaScript"],
    "during": "Year-round",
    "type": "Full-time",
    "level": "Mid",
    "mode": "Hybrid",
}
