from loguru import logger
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.season_model import Season
from api.serializer import SeasonSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class SeasonListView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"successs": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        if not user_id:
            return Response(
                {"success": False, "message": "User ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
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
