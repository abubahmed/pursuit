from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model

User = get_user_model()


class Profile(models.Model):
    PROFILE_GENDER_CHOICES = [
      ("Male", "Male"),
      ("Female", "Female"),
      ("Nonbinary", "Nonbinary"),
      ("Other", "Other"),
      ("Prefer not to say", "Prefer not to say"),
    ]
    PROFILE_PREFERRED_LEVEL_CHOICES = [
      ("Entry", "Entry"),
      ("Mid", "Mid"),
      ("Senior", "Senior"),
      ("Lead", "Lead"),
      ("Manager", "Manager"),
      ("Director", "Director"),
      ("Other", "Other"),
    ]
    PROFILE_PREFERRED_TYPE_CHOICES = [
      ("Full-time", "Full-time"),
      ("Part-time", "Part-time"),
      ("Contract", "Contract"),
      ("Internship", "Internship"),
      ("Freelance", "Freelance"),
      ("Fellowship", "Fellowship"),
      ("Other", "Other"),
    ]
    PROFILE_PREFERRED_MODE_CHOICES = [
      ("Remote", "Remote"),
      ("Onsite", "Onsite"),
      ("Hybrid", "Hybrid"),
      ("Other", "Other"),
    ]
    PROFILE_PREFERRED_DURING_CHOICES = [
      ("Winter", "Winter"),
      ("Spring", "Spring"),
      ("Summer", "Summer"),
      ("Fall", "Fall"),
      ("Year-round", "Year-round"),
      ("Other", "Other"),
    ]

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
      choices=PROFILE_GENDER_CHOICES,
    )
    preferred_level = models.CharField(
      max_length=100,
      blank=True,
      null=True,
      choices=PROFILE_PREFERRED_LEVEL_CHOICES,
    )
    preferred_type = models.CharField(
      max_length=100,
      choices=PROFILE_PREFERRED_TYPE_CHOICES,
      blank=True,
      null=True,
    )
    preferred_mode = models.CharField(
      max_length=100,
      choices=PROFILE_PREFERRED_MODE_CHOICES,
      blank=True,
      null=True,
    )
    preferred_during = models.CharField(
      max_length=100,
      blank=True,
      null=True,
      choices=PROFILE_PREFERRED_DURING_CHOICES,
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