# ...existing code...
AUTH_USER_MODEL = "accounts.CustomUser"
# ...existing code...
INSTALLED_APPS = [
    # ...existing apps...
    "accounts",
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    # ...social providers...
]

SITE_ID = 1

ACCOUNT_USER_MODEL_USERNAME_FIELD = "username"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = "username"
ACCOUNT_EMAIL_VERIFICATION = "optional"
# ...existing code...
