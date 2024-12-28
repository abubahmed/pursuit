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
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        try:
            User = get_user_model()
            user = User.objects.get(id=user_id)
            if not user:
                return Response(
                    {"success": False, "message": "User not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
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
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        try:
            profile = Profile.objects.get(user_id=user_id)
            if not profile:
                return Response(
                    {"success": False, "message": "Profile not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
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


class ProfileUpdateBasicView(APIView):
    def put(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        try:
            new_first_name = request.data.get("first_name")
            new_last_name = request.data.get("last_name")
            if not any(
                new_first_name,
                new_last_name,
            ):
                return Response(
                    {"success": False, "message": "No data to update"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            profile = Profile.objects.get(user_id=user_id)
            if not profile:
                return Response(
                    {"success": False, "message": "Profile not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            profile.first_name = (
                new_first_name if new_first_name else profile.first_name
            )
            profile.last_name = new_last_name if new_last_name else profile.last_name
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