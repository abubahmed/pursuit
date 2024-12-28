from yaml import serialize
from loguru import logger
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.season_model import Season
from api.serializer import SeasonSerializer
from django.contrib.auth import get_user_model
from datetime import datetime

User = get_user_model()


class SeasonListView(APIView):
    def get(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"successs": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        try:
            seasons = Season.objects.filter(user_id=user_id)
            serializer = SeasonSerializer(seasons, many=True)
            logger.info(serializer.data)
            return Response(
                {
                    "success": True,
                    "message": "successful get",
                    "data": {
                        "seasons": serializer.data,
                        "count": len(serializer.data),
                    },
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to get seasons"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SeasonCreateView(APIView):
    def post(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        try:
            name = request.data.get("name")
            start_date = datetime.now()
            description = request.data.get("description")
            season_status = "Active"
            if not name or not description:
                return Response(
                    {"success": False, "message": "Name and description is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            season_data = {
                "name": name,
                "start_date": start_date,
                "description": description,
                "status": season_status,
                "user": user_id,
            }
            serializer = SeasonSerializer(data=season_data)
            if not serializer.is_valid():
                return Response(
                    {"success": False, "message": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Season created successfully",
                    "data": {"season": serializer.data},
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to create season"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SeasonUpdateView(APIView):
    def put(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        season_id = request.data.get("season_id")
        season = Season.objects.get(id=season_id, user_id=user_id)
        if not season_id or not season:
            return Response(
                {
                    "success": False,
                    "message": "Season ID is missing or season not found",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            name = request.data.get("name")
            description = request.data.get("description")
            season.name = name if name else season.name
            season.description = description if description else season.description
            season.save()
            return Response(
                {"success": True, "message": "Season updated successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to update season"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SeasonDeleteView(APIView):
    def delete(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        season_id = request.data.get("season_id")
        season = Season.objects.get(id=season_id, user_id=user_id)
        if not season_id or not season:
            return Response(
                {
                    "success": False,
                    "message": "Season ID is missing or season not found",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            season.delete()
            return Response(
                {"success": True, "message": "Season deleted successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to delete season"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
