from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect
from api.serializers import NoteSerializer
from api.models import Note
from accounts.models import ProfileUser
from MemoRies import settings
import requests
from rest_framework import status
from rest_framework.views import APIView


class NotesListView(generics.ListAPIView):
    """
    Return all user's notes
    """
    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)


class NoteCreateView(generics.CreateAPIView):
    """
    Create a user's note
    """
    permission_classes = [IsAuthenticated]
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class NoteListView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete a user's note
    """
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    lookup_url_kwarg = 'note_uuid'
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)

    def perform_destroy(self, instance):
        # Custom logic can be added here, like logging
        instance.delete()

    def update(self, request, *args, **kwargs):
        # You can add custom validation before update if needed
        instance = self.get_object()
        # partial=True allows partial update
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        # Custom logic can be added here, if needed
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        # Custom logic before delete (e.g., logging or checks) can be added here
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def recaptcha(request):
    r = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data={
            'secret': settings.RECAPTCHA,
            'response': request.data['captcha_value'],
        }
    )
    return Response({'captcha': r.json()})


class NoteDetail(APIView):
    def delete(self, request, pk):
        try:
            note = Note.objects.get(pk=pk)
            note.delete()
            return Response({'success': True}, status=status.HTTP_204_NO_CONTENT)
        except Note.DoesNotExist:
            return Response(
                {'success': False, 'error': 'Note not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'success': False, 'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
