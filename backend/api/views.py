from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Job
from .serializer import JobSerializer, UserSerializer  # Add this import
from rest_framework.views import APIView, status
from rest_framework.response import Response
from .models import mock_job
from django.contrib.auth import get_user_model


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://127.0.0.1:3000/"
    client_class = OAuth2Client


class UserListView(APIView):
    def get(self, request):
        User = get_user_model()
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)  # Serialize user data
        return Response(
            {"success": True, "message": "successful get", "data": serializer.data},
            status=status.HTTP_200_OK,
        )


class JobListView(APIView):
    def get(self, request):
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(
            {"success": True, "message": "successful get", "data": serializer.data},
            status=status.HTTP_200_OK,
        )


class JobCreateView(APIView):
    def post(self, request):
        print("request.data", request.data)
        url = request.data.get("url")
        mock_job_clone = mock_job.copy()
        mock_job_clone["url"] = url
        serializer = JobSerializer(data=mock_job_clone)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "successful post",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"success": False, "message": "failed post", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )
