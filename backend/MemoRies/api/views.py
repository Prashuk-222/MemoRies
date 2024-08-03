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
    notes = Note.objects.all()
    serializer = NoteSerilazer(notes, many = True)
    return Response(serializer.data)