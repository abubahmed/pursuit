from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model

User = get_user_model()


class Season(models.Model):
    SEASON_STATUS_CHOICES = [
        ("Active", "Active"),
        ("Inactive", "Inactive"),
        ("Upcoming", "Upcoming"),
    ]
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
        choices=SEASON_STATUS_CHOICES,
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
