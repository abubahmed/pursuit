# Generated by Django 4.2.16 on 2024-11-23 19:57

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_job_commitment_alter_job_company_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='commitment',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='company',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='contact',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='deadline',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='during',
            field=models.CharField(blank=True, choices=[('Winter', 'Winter'), ('Spring', 'Spring'), ('Summer', 'Summer'), ('Fall', 'Fall'), ('Year-round', 'Year-round'), ('Other', 'Other'), ('', 'None')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='education',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='level',
            field=models.CharField(blank=True, choices=[('Entry', 'Entry'), ('Mid', 'Mid'), ('Senior', 'Senior'), ('Lead', 'Lead'), ('Manager', 'Manager'), ('Director', 'Director'), ('Other', 'Other'), ('', 'None')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='location',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='mode',
            field=models.CharField(blank=True, choices=[('Remote', 'Remote'), ('Onsite', 'Onsite'), ('Hybrid', 'Hybrid'), ('Other', 'Other'), ('', 'None')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='salary',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='skills',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, default=list, null=True, size=None),
        ),
        migrations.AlterField(
            model_name='job',
            name='stage',
            field=models.CharField(blank=True, choices=[('Research', 'Research'), ('Application', 'Application'), ('Assessment', 'Assessment'), ('Interview', 'Interview'), ('Pending', 'Pending'), ('Offer', 'Offer'), ('Rejected', 'Rejected'), ('Waitlisted', 'Waitlisted'), ('Other', 'Other'), ('', 'None')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='status',
            field=models.CharField(blank=True, choices=[('Open', 'Open'), ('Closed', 'Closed'), ('Opening soon', 'Opening soon'), ('Other', 'Other'), ('', 'None')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='title',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='type',
            field=models.CharField(blank=True, choices=[('Full-time', 'Full-time'), ('Part-time', 'Part-time'), ('Contract', 'Contract'), ('Internship', 'Internship'), ('Freelance', 'Freelance'), ('Fellowship', 'Fellowship'), ('Other', 'Other'), ('', 'None')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='job',
            name='url',
            field=models.URLField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='email',
            field=models.EmailField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='first_name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='gender',
            field=models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female'), ('Nonbinary', 'Nonbinary'), ('Other', 'Other'), ('Prefer not to say', 'Prefer not to say')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='interests',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, default=list, null=True, size=None),
        ),
        migrations.AlterField(
            model_name='profile',
            name='last_name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='location',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='preferred_during',
            field=models.CharField(blank=True, choices=[('Winter', 'Winter'), ('Spring', 'Spring'), ('Summer', 'Summer'), ('Fall', 'Fall'), ('Year-round', 'Year-round'), ('Other', 'Other')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='preferred_level',
            field=models.CharField(blank=True, choices=[('Entry', 'Entry'), ('Mid', 'Mid'), ('Senior', 'Senior'), ('Lead', 'Lead'), ('Manager', 'Manager'), ('Director', 'Director'), ('Other', 'Other')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='preferred_mode',
            field=models.CharField(blank=True, choices=[('Remote', 'Remote'), ('Onsite', 'Onsite'), ('Hybrid', 'Hybrid'), ('Other', 'Other')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='preferred_type',
            field=models.CharField(blank=True, choices=[('Full-time', 'Full-time'), ('Part-time', 'Part-time'), ('Contract', 'Contract'), ('Internship', 'Internship'), ('Freelance', 'Freelance'), ('Fellowship', 'Fellowship'), ('Other', 'Other')], max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='skills',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, default=list, null=True, size=None),
        ),
        migrations.AlterField(
            model_name='profile',
            name='social_links',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, default=list, null=True, size=None),
        ),
        migrations.AlterField(
            model_name='season',
            name='description',
            field=models.TextField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='season',
            name='name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='season',
            name='status',
            field=models.CharField(blank=True, choices=[('Active', 'Active'), ('Inactive', 'Inactive'), ('Upcoming', 'Upcoming')], max_length=200, null=True),
        ),
    ]
