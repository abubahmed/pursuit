from django.dispatch import receiver
from allauth.account.signals import user_signed_up
from .serializer import ProfileSerializer
from loguru import logger


@receiver(user_signed_up)
def user_signed_up_handler(request, user, **kwargs):
    first_name = user.first_name if user.first_name else ""
    last_name = user.last_name if user.last_name else ""
    email = user.email if user.email else ""
    user_id = user.id if user.id else ""
    logger.info(f"User signed up: {first_name} {last_name} {email} {user_id}")
    profile_data = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "user": user_id,
    }
    serializer = ProfileSerializer(data=profile_data)
    if serializer.is_valid():
        serializer.save()
    else:
        logger.exception(serializer.errors)
