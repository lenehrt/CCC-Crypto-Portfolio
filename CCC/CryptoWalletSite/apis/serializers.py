from rest_framework import serializers
from .models import *
from users.models import *
from django.contrib.auth import get_user_model

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "username")