from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from .models import Note
from .serializer import NoteSerializer
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model # If used custom user model
from django.views.decorators.csrf import csrf_exempt

from .serializer import UserSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoints' : '/notes/',
            'method' : 'GET',
            'body' : None,
            'description' : 'Returns an array of notes'
        },
        {
            'Endpoints' : '/notes/create/',
            'method' : 'POST',
            'body' : {'body': ""},
            'description' : 'Creates new notes with data sent in post request'
        },
        {
            'Endpoints' : '/notes/id/update/',
            'method' : 'PUT',
            'body' : {'body': ""},
            'description' : 'Update an existing note with data sent in post request'
        },
        {
            'Endpoints' : '/notes/id/delete/',
            'method' : 'DELETE',
            'body' : None,
            'description' : 'Deletes an existing notes'
        },
        
    ]
    return Response(routes)

@csrf_exempt
@api_view(['GET'])
def getNotes_by_pk(request,pk):
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(notes, many = False)
    return Response(serializer.data)

@csrf_exempt
@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many = True)
    return Response(serializer.data)

@csrf_exempt
@api_view(['PUT'])
def updateNote(request,pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance = note, data=data)
    
    if(serializer.is_valid()):
        serializer.save()
    
    return Response(serializer.data)

@csrf_exempt    
@api_view(['DELETE'])
def deleteNote(request,pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note is Deleted,Successfully')

@csrf_exempt
@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body = data['body']
    )
    serializer = NoteSerializer(note, many = False)
    return Response()

@csrf_exempt
class CreateUserView(CreateAPIView):

    model = get_user_model()
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]
    serializer_class = UserSerializer