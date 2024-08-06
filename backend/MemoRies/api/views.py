from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializer import NoteSerilazer
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
            'Endpoints' : '/notes/id',
            'method' : 'GET',
            'body' : None,
            'description' : 'Returns a single note object'
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

@api_view(['GET'])
def getNotes_by_pk(request,pk):
    notes = Note.objects.get(id=pk)
    serializer = NoteSerilazer(notes, many = False)
    return Response(serializer.data)

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerilazer(notes, many = True)
    return Response(serializer.data)

@api_view(['PUT'])
def updateNote(request,pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerilazer(instance = note, data=data)
    
    if(serializer.is_valid()):
        serializer.save()
    
    return Response(serializer.data)
    
@api_view(['DELETE'])
def deleteNote(request,pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note is Deleted,Successfully')

@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body = data['body']
    )
    serializer = NoteSerilazer(note, many = False)
    return Response()