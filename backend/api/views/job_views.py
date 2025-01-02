from loguru import logger
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models.job_model import Job
from api.models.season_model import Season
from api.serializer import JobSerializer
from api.util.openai_client import OpenAIClient
from api.util.scraper import Scraper
from django.contrib.auth import get_user_model
import csv
import io

User = get_user_model()


class JobListView(APIView):
    def post(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {
                    "successs": False,
                    "message": "User is not authenticated",
                    "data": {
                        "jobs": [],
                        "count": 0,
                    },
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        season_id = int(request.data.get("season_id"))
        season = Season.objects.get(id=season_id, user=user_id)
        if not season_id or not season:
            return Response(
                {
                    "success": False,
                    "message": "Season ID was not provided or season does not exist",
                    "data": {
                        "jobs": [],
                        "count": 0,
                    },
                },
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
                {
                    "success": False,
                    "message": "Failed to get jobs with error(s) " + str(e),
                    "data": {
                        "jobs": [],
                        "count": 0,
                    },
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class JobCreateTextView(APIView):
    def post(self, request):
        print("request.data", request.data)
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated", "data": {}},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        max_character_limit = 10000
        text = request.data.get("text")
        if not text or len(text) == 0 or len(text) > max_character_limit:
            return Response(
                {
                    "success": False,
                    "message": "Text was not provided or is too large",
                    "data": {},
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        user_id = request.user.id
        season_id = int(request.data.get("season_id"))
        season = Season.objects.get(id=season_id, user=user_id)
        if not season_id or not season:
            return Response(
                {
                    "success": False,
                    "message": "Season ID was not provided or season does not exist",
                    "data": {},
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            logger.info(text)
            client = OpenAIClient()
            variables = client.extract_variables(text)
            if not variables:
                return Response(
                    {
                        "success": False,
                        "message": "Failed to extract variables",
                        "data": {},
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            logger.info(variables)
            job_data = {
                "title": variables["title"] or "",
                "company": variables["company"] or "",
                "description": variables["description"] or "",
                "location": variables["location"] or "",
                "salary": variables["salary"] or "",
                "skills": variables["skills"] or [],
                "during": variables["during"] or "",
                "status": "Applied",
                "type": variables["type"] or "",
                "level": variables["level"] or "",
                "mode": variables["mode"] or "",
                "contact": variables["contact"] or "",
                "user": user_id,
                "season": season_id,
                "starred": False,
                "hidden": False,
            }
            serializer = JobSerializer(data=job_data)
            if not serializer.is_valid():
                return Response(
                    {
                        "success": False,
                        "message": "Serialization failed with error(s) "
                        + str(serializer.errors),
                        "data": {},
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer.save()
            season.jobs.add(serializer.instance)
            season.save()
            serialized_data = serializer.data
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
                    "message": "Failed to create job with error(s) " + str(e),
                    "data": {},
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class JobCreateURLView(APIView):
    def post(self, request):
        print("request.data", request.data)
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated", "data": {}},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        url = request.data.get("url")
        season_id = int(request.data.get("season_id"))
        season = Season.objects.get(id=season_id, user=user_id)
        if not url or not season_id or not season:
            return Response(
                {
                    "success": False,
                    "message": "URL or Season ID was not provided or season does not exist",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            scraper = Scraper()
            text = scraper.get_text(url)
            logger.info(text)
            client = OpenAIClient()
            variables = client.extract_variables(text)
            if not variables:
                return Response(
                    {
                        "success": False,
                        "message": "Failed to extract variables",
                        "data": {},
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            logger.info(variables)
            job_data = {
                "title": variables["title"] or "",
                "company": variables["company"] or "",
                "description": variables["description"] or "",
                "location": variables["location"] or "",
                "salary": variables["salary"] or "",
                "skills": variables["skills"] or [],
                "during": variables["during"] or "",
                "status": "Applied",
                "type": variables["type"] or "",
                "level": variables["level"] or "",
                "mode": variables["mode"] or "",
                "contact": variables["contact"] or "",
                "user": user_id,
                "season": season_id,
                "url": url,
                "starred": False,
                "hidden": False,
            }
            serializer = JobSerializer(data=job_data)
            if not serializer.is_valid():
                return Response(
                    {
                        "success": False,
                        "message": "Serialization failed with error(s) "
                        + str(serializer.errors),
                        "data": {},
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer.save()
            season.jobs.add(serializer.instance)
            season.save()
            serialized_data = serializer.data
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
                    "message": "Failed to create job with error(s) " + str(e),
                    "data": {},
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
        job = Job.objects.get(id=job_id, user=user_id)
        status_attribute = request.data.get("status")
        starred = request.data.get("starred")
        hidden = request.data.get("hidden")
        if not job_id or not job:
            return Response(
                {
                    "success": False,
                    "message": "Job ID was not provided or job does not exist",
                    "data": {},
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not status_attribute and not starred and not hidden:
            return Response(
                {"success": False, "message": "No data to update", "data": {}},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            job = Job.objects.get(id=job_id, user=user_id)
            STATUS_CHOICES = Job.JOB_STATUS_CHOICES
            STATUS_CHOICES = [status[0] for status in STATUS_CHOICES]
            HIDDEN_CHOICES = ["True", "False"]
            STARRED_CHOICES = ["True", "False"]
            if (
                (starred and starred not in STARRED_CHOICES)
                or (status_attribute and status_attribute not in STATUS_CHOICES)
                or (hidden and hidden not in HIDDEN_CHOICES)
            ):
                return Response(
                    {
                        "success": False,
                        "message": "Invalid updated parameters provided",
                        "data": {},
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if status_attribute and status_attribute in STATUS_CHOICES:
                job.status = status_attribute
            if starred and starred in STARRED_CHOICES:
                job.starred = True if starred == "True" else False
            if hidden and hidden in HIDDEN_CHOICES:
                job.hidden = True if hidden == "True" else False
            job.save()
            serialized_data = JobSerializer(job).data
            return Response(
                {
                    "success": True,
                    "message": "Job updated successfully",
                    "data": serialized_data,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {
                    "success": False,
                    "message": "Failed to update job with error(s) " + str(e),
                    "data": {},
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class JobDeleteView(APIView):
    def post(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated", "data": {}},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        job_id = request.data.get("job_id")
        job = Job.objects.get(id=job_id, user=user_id)
        if not job_id or not job:
            return Response(
                {
                    "success": False,
                    "message": "Job ID was not provided or job does not exist",
                    "data": {},
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            job = Job.objects.get(id=job_id, user=user_id)
            serialized_data = JobSerializer(job).data
            job.delete()
            return Response(
                {
                    "success": True,
                    "message": "Job deleted successfully",
                    "data": serialized_data,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {
                    "success": False,
                    "message": "Failed to delete job with error(s) " + str(e),
                    "data": {},
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class JobExportView(APIView):
    def post(self, request):
        if not request.user.is_authenticated or not request.user.id:
            return Response(
                {"success": False, "message": "User is not authenticated", "data": ""},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        user_id = request.user.id
        season_id = int(request.data.get("season_id"))
        season = Season.objects.get(id=season_id, user=user_id)
        if not season_id or not season:
            return Response(
                {
                    "success": False,
                    "message": "Season ID was not provided or season does not exist",
                    "data": "",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            jobs = Job.objects.filter(user=user_id, season=season_id)
            serializer = JobSerializer(jobs, many=True)
            serialized_data = serializer.data
            logger.info(serialized_data)
            csv_data = [
                [
                    "ID",
                    "Title",
                    "Company",
                    "Description",
                    "Location",
                    "Salary",
                    "Skills",
                    "During",
                    "Status",
                    "Type",
                    "Level",
                    "Mode",
                    "Contact",
                    "Starred",
                    "Hidden",
                    "Link",
                    "Added On",
                ]
            ]
            for job in serialized_data:
                csv_data.append(
                    [
                        job["id"] or "",
                        job["title"] or "",
                        job["company"] or "",
                        job["description"] or "",
                        job["location"] or "",
                        job["salary"] or "",
                        job["skills"] or "",
                        job["during"] or "",
                        job["status"] or "",
                        job["type"] or "",
                        job["level"] or "",
                        job["mode"] or "",
                        job["contact"] or "",
                        job["starred"] or "",
                        job["hidden"] or "",
                        job["url"] or "",
                        job["created_at"] or "",
                    ]
                )
            output = io.StringIO()
            csv.writer(output).writerows(csv_data)
            file_string = output.getvalue()
            output.close()
            return Response(
                {
                    "success": True,
                    "message": "successful get",
                    "data": file_string,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.exception(e)
            return Response(
                {
                    "success": False,
                    "message": "Failed to export jobs with error(s) " + str(e),
                    "data": "",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
