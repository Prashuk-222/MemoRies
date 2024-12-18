from django.urls import path
from api.views import NotesListView, NoteListView, NoteCreateView, recaptcha, NoteDetail

urlpatterns = [
    path('notes/', NotesListView.as_view(), name='notes-view'),
    path('notes/create/', NoteCreateView.as_view(), name='note-create-view'),
    path('notes/<uuid:note_uuid>/', NoteListView.as_view(), name='note-view'),
    path('recaptcha/', recaptcha, name='recaptcha'),
    path('notes/<uuid:pk>/', NoteDetail.as_view(), name='note-detail'),
]
