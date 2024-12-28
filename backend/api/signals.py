from django.dispatch import receiver
from allauth.account.signals import user_signed_up, user_logged_in
from .serializer import ProfileSerializer
from loguru import logger


@receiver(user_signed_up)
def user_signed_up_handler(sociallogin, user, **kwargs):
    profile_data = {}
    if sociallogin and sociallogin.account.provider == "google":
        profile_data = {
            "first_name": user.first_name
            or sociallogin.account.extra_data["given_name"]
            or "",
            "last_name": user.last_name
            or sociallogin.account.extra_data["family_name"]
            or "",
            "email": user.email or sociallogin.account.extra_data["email"] or "",
            "user": user.id or "",
            "avatar_url": sociallogin.account.extra_data["picture"] or "",
        }
    else:
        profile_data = {
            "email": user.email or "",
            "user": user.id or "",
            "avatar_url": "",
        }
    serializer = ProfileSerializer(data=profile_data)
    if serializer.is_valid():
        serializer.save()
    else:
        logger.exception(serializer.errors)
