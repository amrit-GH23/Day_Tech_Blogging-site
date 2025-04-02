from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # login
    TokenRefreshView      # refresh
)


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),   # login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.signup),
    path('login/', views.login_view),
    path('blogs/', views.get_all_blogs),
    path('blogs/<int:pk>/', views.get_blog),
    path('blogs/create/', views.create_blog),
    path('validate/<int:pk>/', views.Check_User),
    path('edit/<int:pk>/', views.Edit_blog),
    path('myBlogs/', views.myBlogs),
    path('delete/<int:pk>/', views.deleteBlog),
]
