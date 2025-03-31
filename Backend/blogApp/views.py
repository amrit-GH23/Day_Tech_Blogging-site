from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Blog
from .serializers import BlogSerializer

@api_view(['POST'])
def signup(request):
    name = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=400)

    user = User.objects.create_user(username=email, password=password, email=email, first_name=name)
    return Response({'message': 'Signup successful'}, status=201)

@api_view(['POST'])
def login_view(request):
    from django.contrib.auth import authenticate
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'message': 'Login successful'})
    return Response({'error': 'Invalid credentials'}, status=400)


@api_view(['GET'])
def get_all_blogs(request):
    blogs = Blog.objects.all().order_by('-created_at')
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_blog(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_blog(request, pk):
    try:
        blog = Blog.objects.get(id=pk)
        serializer = BlogSerializer(blog)
        return Response(serializer.data)
    except Blog.DoesNotExist:
        return Response({'error': 'Blog not found'}, status=404)

@api_view(['PUT'])
def Edit_blog(request,pk):
    try:
        blog=Blog.objects.get(id=pk)
    # Update the blog instance with new data
        serializer = BlogSerializer(blog, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Save updated data to the database
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    except Blog.DoesNotExist:
        return Response({"error":"Blog does not exists"}, status=404)

   
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Requires authentication
def Check_User(request,pk):
    try:
        blog=Blog.objects.get(id=pk)
    except Blog.DoesNotExist:
        return Response({"error":"Blog does not exists"}, status=404)
    if(blog.author==request.user):
        return Response({"authorized": True}, status=200)
    else:
        return Response({"authorized": False}, status=403)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myBlogs(request):
    auth=request.user
    try:
        blogs=Blog.objects.filter(author=auth).order_by("-created_at")
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data,status=200)
    except Blog.DoesNotExist:
        return Response({"error":"No blog from this user"}, status=404)   
