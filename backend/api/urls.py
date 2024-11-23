from django.urls import path, re_path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView
from allauth.socialaccount.views import signup
from .views.views import GoogleLogin
from .views.job_views import JobListView, JobCreateView
from .views.user_views import (
    UserListView,
    ProfileListView,
    ProfilePutBasicView,
    ProfilePutPreferencesView,
    ProfilePutSkillsView,
)
from django.conf import settings
from django.conf.urls import include

urlpatterns = [
    path("register/", RegisterView.as_view(), name="rest_register"),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("signup/", signup, name="rest_signup"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("user/", UserDetailsView.as_view(), name="rest_user_details"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
    path("google/", GoogleLogin.as_view(), name="google_login"),
    path("jobs/", JobListView.as_view(), name="job_list"),
    path("jobs/add/", JobCreateView.as_view(), name="job_add"),
    path("user/", UserListView.as_view(), name="user_list"),
    path("user/profile", ProfileListView.as_view(), name="profile_list"),
    path("user/profile/basic", ProfilePutBasicView.as_view(), name="profile_put_basic"),
    path(
        "user/profile/preferences",
        ProfilePutPreferencesView.as_view(),
        name="profile_put_preferences",
    ),
    path(
        "user/profile/skills", ProfilePutSkillsView.as_view(), name="profile_put_skills"
    ),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns = [
        re_path(r"^__debug__/", include(debug_toolbar.urls)),
    ] + urlpatterns
