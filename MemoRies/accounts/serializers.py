from rest_framework import serializers
from rest_framework import status
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.core import exceptions
from django.core.validators import validate_email
from django.contrib.auth.models import update_last_login
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import ProfileUser


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for creating user accounts.
    """
    password = serializers.CharField(write_only=True, max_length=128)
    password2 = serializers.CharField(write_only=True, max_length=128)

    class Meta:
        model = ProfileUser
        fields = ('email', 'password', 'first_name', 'password2')
        extra_kwargs = {
            'password': {'write_only': True},  # Ensures password is write-only
        }

    def validate(self, data):
        """
        Check if the given passwords are the same.
        """
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password2': _("The password fields didn't match.")})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        user = ProfileUser.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            password=validated_data['password'],
            is_active=True  # User remains inactive until email is confirmed
        )

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        """
        Add custom claims to the token.
        """
        token = super().get_token(user)
        token['name'] = user.first_name  # Example custom claim
        return token

    def validate(self, attrs):
        """
        Validate the user's credentials and token generation.
        """
        data = super().validate(attrs)

        if not self.user.is_active:
            raise AuthenticationFailed("User is not active, please confirm your email.")


        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data


class ForgottenPasswordSerializer(serializers.Serializer):
    """
    Serializer for sending reset password link to the given email.
    """
    email = serializers.EmailField(max_length=255, write_only=True, required=True)

    def validate_email(self, value):
        """
        Validate the email format.
        """
        try:
            validate_email(value)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"email": _("Invalid email address.")})
        return value


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    password1 = serializers.CharField(max_length=128, required=True)
    password2 = serializers.CharField(max_length=128, required=True)

    def validate(self, data):
        """
        Check if the given passwords are the same.
        """
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({'password2': _("The password fields didn't match.")})
        return data
