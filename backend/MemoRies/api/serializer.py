from rest_framework.serializers import ModelSerializer
from .models import Note 
from rest_framework import serializers
from django.contrib.auth import get_user_model # If used custom user model

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        user = UserModel.objects.create_user(
            username=validated_data['username'],
            email = validated_data['email'],
            password=validated_data['password'],
        )

        return user

    class Meta:
        model = UserModel
        # Tuple of serialized model fields (see link [2])
        fields = ( "id", "username","email", "password", )