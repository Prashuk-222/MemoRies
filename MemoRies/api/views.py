from rest_framework import viewsets, permissions
from .models import Note
from .serializers import NoteSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Restrict notes to those owned by the currently logged-in user
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically associate the note with the logged-in user
        serializer.save(user=self.request.user)
