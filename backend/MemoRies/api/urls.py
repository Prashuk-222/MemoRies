from django.urls import path,re_path,include
from . import views
from .views import CreateUserView
# from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import (
    LoginView, LogoutView, # PasswordChangeView, PasswordResetConfirmView,
    # PasswordResetView, UserDetailsView,
)

urlpatterns = [
    # path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    # path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    path('register/', views.CreateUserView, name='rest_register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    # path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    # path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path('',views.getRoutes ,name = "routes" ),
    path('notes/',views.getNotes ,name = "notes"),
    path('notes/<int:pk>/',views.getNotes_by_pk ,name = "note"),
    path('notes/<int:pk>/update/',views.updateNote ,name = "update_notes"),
    path('notes/<int:pk>/delete/',views.deleteNote ,name = "delete_note"),
    path('notes/create/',views.createNote ,name = "create_note"),
]