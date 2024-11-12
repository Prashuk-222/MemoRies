from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomerAdmin(UserAdmin):
    # Customize the fields that appear in the admin panel
    list_display = (['email', 'password', 'first_name', 'last_name'])
    list_filter = (['is_superuser'])
    search_fields = (['email', 'first_name', 'last_name'])
    ordering = (['email'])

    # Add any extra configurations as needed

admin.site.register(CustomUser, CustomerAdmin)
