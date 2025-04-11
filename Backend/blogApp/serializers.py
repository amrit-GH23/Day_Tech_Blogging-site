from rest_framework import serializers
from .models import Blog,Comment

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'created_at']

    def get_author(self, obj):
        return obj.author.first_name
    
class commentSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['author', 'blog', 'created_at']

    def get_author(self, obj):
        return obj.author.first_name
