from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model

User = get_user_model()


class Season(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=[
            ("Active", "Active"),
            ("Inactive", "Inactive"),
        ],
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="season_user",
        blank=True,
        null=True,
    )
    jobs = models.ManyToManyField(
        "Job", related_name="season_job", blank=True, null=True
    )

    def __str__(self):
        return self.name + " (" + self.status + ")"


class Job(models.Model):
    JOB_STATUS_CHOICES = [
        ("Open", "Open"),
        ("Closed", "Closed"),
        ("Opening soon", "Opening soon"),
        ("Other", "Other"),
        ("", "None"),
    ]
    JOB_STAGE_CHOICES = [
        ("Research", "Research"),
        ("Application", "Application"),
        ("Assessment", "Assessment"),
        ("Interview", "Interview"),
        ("Pending", "Pending"),
        ("Offer", "Offer"),
        ("Rejected", "Rejected"),
        ("Waitlisted", "Waitlisted"),
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
        ("Fellowship", "Fellowship"),
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

    url = models.URLField(blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    salary = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=JOB_STATUS_CHOICES,
    )
    stage = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=JOB_STAGE_CHOICES,
    )
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    skills = ArrayField(
        models.CharField(max_length=100), blank=True, default=list, null=True
    )
    during = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=JOB_DURING_CHOICES,
    )
    type = models.CharField(
        max_length=100,
        choices=JOB_TYPE_CHOICES,
        blank=True,
        null=True,
    )
    level = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=JOB_LEVEL_CHOICES,
    )
    mode = models.CharField(
        max_length=100,
        choices=JOB_MODE_CHOICES,
        blank=True,
        null=True,
    )
    commitment = models.CharField(max_length=100, blank=True, null=True)
    education = models.CharField(max_length=100, blank=True, null=True)
    contact = models.CharField(max_length=100, blank=True, null=True)
    deadline = models.CharField(max_length=100, blank=True, null=True)
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


class Profile(models.Model):
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    social_links = ArrayField(
        models.CharField(max_length=100), blank=True, default=list, null=True
    )
    gender = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=[
            ("Male", "Male"),
            ("Female", "Female"),
            ("Nonbinary", "Nonbinary"),
            ("Other", "Other"),
            ("Prefer not to say", "Prefer not to say"),
        ],
    )
    preferred_level = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=[
            ("Entry", "Entry"),
            ("Mid", "Mid"),
            ("Senior", "Senior"),
            ("Lead", "Lead"),
            ("Manager", "Manager"),
            ("Director", "Director"),
            ("Other", "Other"),
        ],
    )
    preferred_type = models.CharField(
        max_length=100,
        choices=[
            ("Full-time", "Full-time"),
            ("Part-time", "Part-time"),
            ("Contract", "Contract"),
            ("Internship", "Internship"),
            ("Freelance", "Freelance"),
            ("Fellowship", "Fellowship"),
            ("Other", "Other"),
        ],
        blank=True,
        null=True,
    )
    preferred_mode = models.CharField(
        max_length=100,
        choices=[
            ("Remote", "Remote"),
            ("Onsite", "Onsite"),
            ("Hybrid", "Hybrid"),
            ("Other", "Other"),
        ],
        blank=True,
        null=True,
    )
    preferred_during = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        choices=[
            ("Winter", "Winter"),
            ("Spring", "Spring"),
            ("Summer", "Summer"),
            ("Fall", "Fall"),
            ("Year-round", "Year-round"),
            ("Other", "Other"),
        ],
    )
    skills = ArrayField(
        models.CharField(max_length=100), blank=True, default=list, null=True
    )
    interests = ArrayField(
        models.CharField(max_length=100), blank=True, default=list, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="profile_user",
        blank=True,
        null=True,
    )
    
    def __str__(self):
        return self.first_name + " " + self.last_name + " (" + self.email + ")"