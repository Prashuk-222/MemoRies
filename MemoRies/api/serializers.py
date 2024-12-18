from rest_framework import serializers

from api.models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('title', 'content', 'created_at', 'updated_at', 'id')

    def to_representation(self, obj):
        return {
            "title": obj.title,
            "content": obj.content,
            "created_at": obj.created_at,
            "updated_at": obj.updated_at,
            "id": obj.id,
        }

    def validate_content(self, value):
        if len(value) > 6000:
            raise serializers.ValidationError(
                'This field can only contain max 6000 characters.')

        return value
