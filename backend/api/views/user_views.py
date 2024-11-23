from platformdirs import user_cache_dir
from loguru import logger
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from api.models.profile_model import Profile
from api.serializer import ProfileSerializer, UserSerializer


class UserListView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        if not user_id:
            return Response(
                {"success": False, "message": "User ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            User = get_user_model()
            user = User.objects.get(id=user_id)
            serializer = UserSerializer(user)
            logger.info(serializer.data)
            return Response(
                {
                    "success": True,
                    "message": "successful get",
                    "data": {
                        "user": serializer.data,
                    },
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to get user"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProfileListView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        if not user_id:
            return Response(
                {"success": False, "message": "User ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            profile = Profile.objects.get(user_id=user_id)
            serializer = ProfileSerializer(profile)
            logger.info(serializer.data)
            return Response(
                {
                    "success": True,
                    "message": "successful get",
                    "data": {
                        "profile": serializer.data,
                    },
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to get profile"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProfilePutBasicView(APIView):
    def put(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        if not user_id:
            return Response(
                {"success": False, "message": "User ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            new_first_name = request.data.get("first_name")
            new_last_name = request.data.get("last_name")
            new_email = request.data.get("email")
            new_phone_number = request.data.get("phone_number")
            new_location = request.data.get("location")
            new_birthday = request.data.get("birthday")
            new_bio = request.data.get("bio")
            new_social_links = request.data.get("social_links")
            new_gender = request.get("gender")
            if not any(
                new_first_name,
                new_last_name,
                new_email,
                new_phone_number,
                new_location,
                new_birthday,
                new_bio,
                new_social_links,
                new_gender,
            ):
                return Response(
                    {"success": False, "message": "No data to update"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            profile = Profile.objects.get(user_id=user_id)
            profile.first_name = (
                new_first_name if new_first_name else profile.first_name
            )
            profile.last_name = new_last_name if new_last_name else profile.last_name
            profile.email = new_email if new_email else profile.email
            profile.phone_number = (
                new_phone_number if new_phone_number else profile.phone_number
            )
            profile.location = new_location if new_location else profile.location
            profile.birthday = new_birthday if new_birthday else profile.birthday
            profile.bio = new_bio if new_bio else profile.bio
            if new_social_links:
                profile.social_links.extend(new_social_links)
                profile.social_links = list(set(profile.social_links))
            profile.gender = (
                new_gender
                if new_gender
                and new_gender
                in [choice[0] for choice in Profile.PROFILE_GENDER_CHOICES]
                else profile.gender
            )

            profile.save()
            serializer = ProfileSerializer(profile)
            logger.info(serializer.data)
            return Response(
                {
                    "success": True,
                    "message": "successful update",
                    "data": {
                        "profile": serializer.data,
                    },
                }
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to update profile"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProfilePutPreferencesView(APIView):
    def put(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        if not user_id:
            return Response(
                {"success": False, "message": "User ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            preferred_level = request.data.get("preferred_level")
            preferred_type = request.data.get("preferred_type")
            preferred_mode = request.data.get("preferred_mode")
            preferred_during = request.data.get("preferred_during")
            if not any(
                preferred_level, preferred_type, preferred_mode, preferred_during
            ):
                return Response(
                    {"success": False, "message": "No data to update"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            profile = Profile.objects.get(user_id=user_id)
            profile.preferred_level = (
                preferred_level
                if preferred_level
                and preferred_level
                in [choice[0] for choice in Profile.PROFILE_PREFERRED_LEVEL_CHOICES]
                else profile.preferred_level
            )
            profile.preferred_type = (
                preferred_type
                if preferred_type
                and preferred_type
                in [choice[0] for choice in Profile.PROFILE_PREFERRED_TYPE_CHOICES]
                else profile.preferred_type
            )
            profile.preferred_mode = (
                preferred_mode
                if preferred_mode
                and preferred_mode
                in [choice[0] for choice in Profile.PROFILE_PREFERRED_MODE_CHOICES]
                else profile.preferred_mode
            )
            profile.preferred_during = (
                preferred_during
                if preferred_during
                and preferred_during
                in [choice[0] for choice in Profile.PROFILE_PREFERRED_DURING_CHOICES]
                else profile.preferred_during
            )

            profile.save()
            serializer = ProfileSerializer(profile)
            logger.info(serializer.data)
            return Response(
                {
                    "success": True,
                    "message": "successful update",
                    "data": {
                        "profile": serializer.data,
                    },
                }
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to update profile"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProfilePutSkillsView(APIView):
    def put(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        if not user_id:
            return Response(
                {"success": False, "message": "User ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            new_skills = request.data.get("skills")
            new_interests = request.data.get("interests")
            if not any(new_skills, new_interests):
                return Response(
                    {"success": False, "message": "No data to update"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            profile = Profile.objects.get(user_id=user_id)
            if new_skills:
                profile.skills.extend(new_skills)
                profile.skills = list(set(profile.skills))
            if new_interests:
                profile.interests.extend(new_interests)
                profile.interests = list(set(profile.interests))

            profile.save()
            serializer = ProfileSerializer(profile)
            logger.info(serializer.data)
            return Response(
                {
                    "success": True,
                    "message": "successful update",
                    "data": {
                        "profile": serializer.data,
                    },
                }
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to update profile"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
