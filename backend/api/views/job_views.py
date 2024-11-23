from loguru import logger
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.job_model import Job
from api.models.season_model import Season
from api.serializer import JobSerializer, SeasonSerializer
from api.util.inference_client import InferenceClientClass
from api.util.scraper import Scraper
from django.contrib.auth import get_user_model

User = get_user_model()


class JobListView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"successs": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        season_id = request.data.get("season_id")
        if not user_id or not season_id:
            return Response(
                {"success": False, "message": "User ID and Season Id are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            jobs = Job.objects.filter(user_id=user_id, season_id=season_id)
            serializer = JobSerializer(jobs, many=True)
            logger.info(serializer.data)
            return Response(
                {
                    "success": True,
                    "message": "successful get",
                    "data": {
                        "jobs": serializer.data,
                        "count": len(serializer.data),
                    },
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to get jobs"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class JobCreateView(APIView):
    def post(self, request):
        print("request.data", request.data)
        if not request.user.is_authenticated:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        url = request.data.get("url")
        season_id = int(request.data.get("season_id"))
        user_id = request.user.id
        if not url or not season_id or not user_id:
            return Response(
                {
                    "success": False,
                    "message": "URL, Season ID, and User ID are required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        season = Season.objects.get(id=season_id, user_id=user_id)
        if not season:
            return Response(
                {"success": False, "message": "Season not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            scraper = Scraper()
            soup = scraper.scrape_data(url)
            text = scraper.get_text(soup)
            logger.info(text)
            client = InferenceClientClass()
            variables = client.extract_variables(text)
            if not variables:
                return Response(
                    {"success": False, "message": "Failed to extract variables"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            logger.info(variables)
            job_data = {
                "title": variables["title"],
                "company": variables["company"],
                "description": variables["description"],
                "location": variables["location"],
                "salary": variables["salary"],
                "status": variables["status"],
                "skills": variables["skills"],
                "during": variables["during"],
                "stage": "Application",
                "type": variables["type"],
                "level": variables["level"],
                "mode": variables["mode"],
                "commitment": variables["commitment"],
                "education": variables["education"],
                "contact": variables["contact"],
                "deadline": variables["deadline"],
                "user": user_id,
                "season": season_id,
                "url": url,
            }
            serializer = JobSerializer(data=job_data)
            if not serializer.is_valid():
                return Response(
                    {
                        "success": False,
                        "message": "Invalid job data " + str(serializer.errors),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer.save()
            saved_instance = serializer.instance
            serialized_data = JobSerializer(saved_instance).data
            job = Job.objects.get(id=saved_instance.id)
            season.jobs.add(job)
            season.save()
            logger.info(serialized_data)
            return Response(
                {
                    "success": True,
                    "message": "Job created successfully",
                    "data": serialized_data,
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {
                    "success": False,
                    "message": "Failed to create job with error " + str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class JobDeleteView(APIView):
    def delete(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        job_id = request.data.get("job_id")
        if not user_id or not job_id:
            return Response(
                {"success": False, "message": "User ID and Job ID are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            job = Job.objects.get(id=job_id, user_id=user_id)
            if not job:
                return Response(
                    {"success": False, "message": "Job not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            job.delete()
            return Response(
                {"success": True, "message": "Job deleted successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to delete job"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
