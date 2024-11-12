from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserRegistrationSerializer, UserSerializer, UserLoginSerializer
from rest_framework.permissions import AllowAny

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = RefreshToken.for_user(user)
            return Response({
                "user": UserSerializer(user).data,
                "token": {
                    "refresh": str(token),
                    "access": str(token.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        print(request.data.get('email'))
        print(request.data.get('password'))
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)

        if user is not None:
            token = RefreshToken.for_user(user)
            return Response({
                "user": UserSerializer(user).data,
                "token": {
                    "refresh": str(token),
                    "access": str(token.access_token),
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)
