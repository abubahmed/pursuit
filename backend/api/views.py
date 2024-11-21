from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Job
from .serializer import JobSerializer, UserSerializer
from rest_framework.views import APIView, status
from rest_framework.response import Response
from .models import mock_job
from django.contrib.auth import get_user_model
from .util.inference_client import InferenceClientClass
from .util.scraper import Scraper
from loguru import logger
from datetime import datetime


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://127.0.0.1:3000/"
    client_class = OAuth2Client


class UserListView(APIView):
    def get(self, request):
        User = get_user_model()
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(
            {
                "success": True,
                "message": "successful get",
                "data": {
                    "users": serializer.data,
                    "count": len(serializer.data),
                },
            },
            status=status.HTTP_200_OK,
        )


class JobListView(APIView):
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
            jobs = Job.objects.filter(user_id=user_id)
            serializer = JobSerializer(jobs, many=True)
            logger.info(serializer.data)
            if not serializer.data:
                return Response(
                    {
                        "success": True,
                        "message": "No jobs found",
                        "data": {
                            "jobs": [],
                            "count": 0,
                        },
                    },
                    status=status.HTTP_200_OK,
                )
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


# class JobCreateView(APIView):
#     def post(self, request):
#         print("request.data", request.data)
#         url = request.data.get("url")
#         mock_job_clone = mock_job.copy()
#         mock_job_clone["url"] = url
#         serializer = JobSerializer(data=mock_job_clone)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(
#                 {
#                     "success": True,
#                     "message": "successful post",
#                     "data": serializer.data,
#                 },
#                 status=status.HTTP_201_CREATED,
#             )
#         return Response(
#             {"success": False, "message": "failed post", "data": serializer.errors},
#             status=status.HTTP_400_BAD_REQUEST,
#         )


class JobCreateView(APIView):
    def post(self, request):
        print("request.data", request.data)
        if not request.user.is_authenticated:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        url = request.data.get("url")
        user_id = request.user.id
        if not url:
            return Response(
                {"success": False, "message": "URL is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not user_id:
            return Response(
                {"success": False, "message": "User ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            scraper = Scraper()
            soup = scraper.scrape_data(url)
            text = scraper.get_text(soup)
            logger.info(text)
            client = InferenceClientClass()
            variables = client.extract_variables(text)
            variables_template = {
                "title": "",
                "company": "",
                "description": "",
                "location": "",
                "salary": 0.0,
                "status": "",
                "skills": [],
                "during": "",
                "type": "",
                "level": "",
                "mode": "",
            }
            logger.info(variables)
            if not all(key in variables for key in variables_template):
                return Response(
                    {"success": False, "message": "Failed to extract variables"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            if all(not value for value in variables.values()):
                return Response(
                    {"success": False, "message": "No variables extracted"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
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
                "user": user_id,
                "url": url,
            }
            serializer = JobSerializer(data=job_data)
            if not serializer.is_valid():
                return Response(
                    {"success": False, "message": "Invalid job data"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer.save()
            saved_instance = serializer.instance
            serialized_data = JobSerializer(saved_instance).data
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
                {"success": False, "message": "Failed to create job"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
