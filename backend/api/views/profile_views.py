from loguru import logger
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from api.models.profile_model import Profile
from api.serializer import ProfileSerializer, UserSerializer

User = get_user_model()


class UserListView(APIView):
    def get(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {
                    "success": False,
                    "message": "User is not authenticated",
                    "data": {
                        "user": {},
                    },
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        try:
            user = User.objects.get(id=user_id)
            if not user:
                return Response(
                    {
                        "success": False,
                        "message": "User not found",
                        "data": {"user": {}},
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            serializer = UserSerializer(user)
            serialized_data = serializer.data
            logger.info(serialized_data)
            return Response(
                {
                    "success": True,
                    "message": "successful get",
                    "data": {
                        "user": serialized_data,
                    },
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {
                    "success": False,
                    "message": "Failed to get user with error(s) " + str(e),
                    "data": {"user": {}},
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProfileListView(APIView):
    def get(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {
                    "success": False,
                    "message": "User is not authenticated",
                    "data": {
                        "profile": {},
                    },
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        try:
            profile = Profile.objects.get(user=user_id)
            if not profile:
                return Response(
                    {
                        "success": False,
                        "message": "Profile not found",
                        "data": {
                            "profile": {},
                        },
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            serializer = ProfileSerializer(profile)
            serialized_data = serializer.data
            logger.info(serialized_data)
            return Response(
                {
                    "success": True,
                    "message": "successful get",
                    "data": {
                        "profile": serialized_data,
                    },
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {
                    "success": False,
                    "message": "Failed to get profile with error(s) " + str(e),
                    "data": {"profile": {}},
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProfileUpdateBasicView(APIView):
    def put(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {
                    "success": False,
                    "message": "User is not authenticated",
                    "data": {
                        "profile": {},
                    },
                },
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
                    {
                        "success": False,
                        "message": "No data to update",
                        "data": {
                            "profile": {},
                        },
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            profile = Profile.objects.get(user=user_id)
            if not profile:
                return Response(
                    {
                        "success": False,
                        "message": "Profile not found",
                        "data": {
                            "profile": {},
                        },
                    },
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
                {
                    "success": False,
                    "message": "Failed to update profile with error(s) " + str(e),
                    "data": {"profile": {}},
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
