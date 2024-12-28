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
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"successs": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        season_id = int(request.data.get("season_id"))
        if not season_id:
            return Response(
                {"success": False, "message": "Season Id is required"},
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


class JobCreateURLView(APIView):
    def post(self, request):
        print("request.data", request.data)
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        url = request.data.get("url")
        season_id = int(request.data.get("season_id"))
        season = Season.objects.get(id=season_id)
        user_id = request.user.id
        if not url or not season_id or not season:
            return Response(
                {
                    "success": False,
                    "message": "URL and Season ID are required",
                },
                status=status.HTTP_400_BAD_REQUEST,
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
            number_jobs = season.number_jobs
            job_number = number_jobs + 1
            season.number_jobs = job_number
            season.save()
            job_data = {
                "title": variables["title"] or "",
                "company": variables["company"] or "",
                "description": variables["description"] or "",
                "location": variables["location"] or "",
                "salary": variables["salary"] or "",
                "skills": variables["skills"] or [],
                "during": variables["during"] or "",
                "stage": "Applied",
                "type": variables["type"] or "",
                "level": variables["level"] or "",
                "mode": variables["mode"] or "",
                "education": variables["education"] or "",
                "contact": variables["contact"] or "",
                "user": user_id,
                "season": season_id,
                "url": url,
                "starred": False,
                "hidden": False,
                "number": job_number,
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


class JobUpdateView(APIView):
    def post(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        job_id = request.data.get("job_id")
        stage = request.data.get("stage")
        starred = request.data.get("starred")
        hidden = request.data.get("hidden")
        if not job_id:
            return Response(
                {"success": False, "message": "Job ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not stage and not starred and not hidden:
            return Response(
                {"success": False, "message": "No data to update"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            job = Job.objects.get(id=job_id, user_id=user_id)
            if not job:
                return Response(
                    {"success": False, "message": "Job not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            STAGE_CHOICES = Job.JOB_STATUS_CHOICES
            HIDDEN_CHOICES = ["True", "False"]
            STARRED_CHOICES = ["True", "False"]
            if (
                (starred and starred not in STARRED_CHOICES)
                or (stage and stage not in STAGE_CHOICES)
                or (hidden and hidden not in HIDDEN_CHOICES)
            ):
                return Response(
                    {"success": False, "message": "Invalid data to update"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if stage and stage in STAGE_CHOICES:
                job.stage = stage
            if starred and starred in STARRED_CHOICES:
                job.starred = True if starred == "True" else False
            if hidden and hidden in HIDDEN_CHOICES:
                job.hidden = True if hidden == "True" else False
            job.save()
            return Response(
                {"success": True, "message": "Job updated successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {"success": False, "message": "Failed to update job"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class JobDeleteView(APIView):
    def delete(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        job_id = request.data.get("job_id")
        if not job_id:
            return Response(
                {"success": False, "message": "Job ID is required"},
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
