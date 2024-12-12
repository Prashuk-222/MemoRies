from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.views import TokenViewBase, TokenRefreshView
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import HttpResponseRedirect
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str
from accounts.utils import send_reset_password_email, account_token
from accounts.models import ProfileUser
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.serializers import (
    CustomTokenObtainPairSerializer,
    ForgottenPasswordSerializer,
    ChangePasswordSerializer,
    RegisterSerializer,
)


class RegisterUserView(generics.CreateAPIView):
    """
    Create a new user account.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        # Save the user profile
        user = serializer.save(is_active=True)

        # Generate the JWT token after successful user registration
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Add the token to the response
        return Response({
            "user": RegisterSerializer(user).data,
            "access_token": access_token,
            "refresh_token": str(refresh),
        }, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Obtain a pair of JWT tokens.
    """
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AuthenticationFailed:
            raise InActiveUser()
        except TokenError:
            raise InvalidToken()

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class CustomTokenRefreshView(TokenRefreshView):
    """
    Refresh a JWT token.
    """
    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect('/#/404')


class ForgottenPasswordView(generics.CreateAPIView):
    """
    Send a password reset link to the user's email.
    """
    serializer_class = ForgottenPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        try:
            profile = ProfileUser.objects.get(email=email)
            send_reset_password_email(profile)
        except ProfileUser.DoesNotExist:
            pass  # Avoid leaking email existence information

        return Response(
            {'detail': 'If the email exists, a reset link has been sent.'},
            status=status.HTTP_200_OK,
            content_type='application/json',
        )


class ChangePasswordView(generics.UpdateAPIView):
    """
    Set a new password for the user after validating the token and uid.
    """
    serializer_class = ChangePasswordSerializer
    queryset = ProfileUser.objects.all()
    token_generator = account_token

    def get_user(self, uidb64):
        try:
            uid = smart_str(urlsafe_base64_decode(uidb64))
            return self.queryset.get(pk=uid)
        except (TypeError, ValueError, OverflowError, ProfileUser.DoesNotExist):
            return None

    def get_object(self):
        user = self.get_user(self.kwargs['uidb64'])
        if user and self.token_generator.check_token(user, self.kwargs['token']):
            return user
        return None

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        if not user:
            return Response(
                {'detail': 'Invalid token or uid.'},
                status=status.HTTP_400_BAD_REQUEST,
                content_type='application/json',
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user.set_password(serializer.validated_data['password1'])
        user.save()

        return Response(
            {'detail': 'Password has been reset successfully.'},
            status=status.HTTP_200_OK,
            content_type='application/json',
        )
