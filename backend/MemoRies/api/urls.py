from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes ,name = "routes" ),
    path('notes/',views.getNotes ,name = "notes"),
    path('notes/<int:pk>/',views.getNotes_by_pk ,name = "note"),
    path('notes/<int:pk>/update/',views.updateNote ,name = "update_notes"),
    path('notes/<int:pk>/delete/',views.deleteNote ,name = "delete_note"),
    path('notes/create/',views.createNote ,name = "create_note"),
]