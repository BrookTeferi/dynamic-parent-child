from rest_framework import serializers
from .models import Node

class NodeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    def get_children(self, obj):
        serializer = self.__class__(obj.children.all(), many=True)
        return serializer.data

    class Meta:
        model=Node
        fields = ['id', 'name', 'parent', 'children']