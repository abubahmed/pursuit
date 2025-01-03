import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = os.getenv("DEBUG") == "True"
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS").split(",")

DEBUG = DEBUG

INSTALLED_APPS = [
    # ...existing apps...
    "corsheaders",
    "debug_toolbar",  # Add debug toolbar
    # ...existing apps...
]

MIDDLEWARE = [
    # ...existing middleware...
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",  # Add debug toolbar middleware
    # ...existing middleware...
]

CORS_ALLOWED_ORIGINS = ALLOWED_ORIGINS

# INTERNAL_IPS = [
#     "127.0.0.1",
# ]

# Add this at the end of your settings.py
import socket

hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
# INTERNAL_IPS += [ip[:-1] + "1" for ip in ips]
