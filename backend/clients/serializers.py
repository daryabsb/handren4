from io import BytesIO
import imghdr
from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
import base64
from django.core.files.base import ContentFile
from core.models import (
    Client, Attachment, ClinicalExamination, ClientHealthStatus
)


class AttachmentSerializer(serializers.ModelSerializer):
    # Serializer for uploading images for recipes

    class Meta:
        model = Attachment
        fields = ('id', 'client', 'file_type',
                  'filename', 'file', 'page_count')
        read_only_Fields = ('id', 'page_count')


class ClinicalExaminationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClinicalExamination
        fields = '__all__'
        read_only_Fields = ('id', 'created',)


class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = [
            'id', 'name', 'dob', 'age', 'gender', 'description', 'phone',
            'email', 'image', 'status',
            # 'treatments', 'appointments', 'attachments',
            # 'examinations','medicals',

        ]
        read_only_Fields = ('id',)
        not_required_fields = ('age')


class ClientHealthStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientHealthStatus
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.heart_condition = validated_data.get(
            'heart_condition', instance.heart_condition)
        instance.blood_sugar = validated_data.get(
            'blood_sugar', instance.blood_sugar)
        instance.blood_pressure = validated_data.get(
            'blood_pressure', instance.blood_pressure)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.height = validated_data.get('height', instance.height)
        instance.smoking_status = validated_data.get(
            'smoking_status', instance.smoking_status)
        instance.alcohol_consumption = validated_data.get(
            'alcohol_consumption', instance.alcohol_consumption)
        instance.physical_activity = validated_data.get(
            'physical_activity', instance.physical_activity)
        instance.notes = validated_data.get('notes', instance.notes)
        instance.save()
        return instance


class ClientImageSerializer(serializers.ModelSerializer):
    # image = serializers.SerializerMethodField()
    # image_data = serializers.CharField(write_only=True, allow_null=True)

    class Meta:
        model = Client
        # fields = ClientSerializer.Meta.fields + ['id', 'image', 'image_data']
        fields = ("id", "image",)
        read_only_Fields = ('id',)

    # def get_image(self, obj):
    #     print("CHECK OBJ")
    #     if obj.image:
    #         print(obj.image)
    #         return obj.image.url
    #     else:
    #
    #         return None

    def update(self, instance, validated_data):
        image_data = validated_data.pop('image', None)
        print("WHY THIS", image_data)
        if image_data is not None:
            if str(image_data).startswith('data:image'):
                format, imgstr = image_data.split(';base64,')
                ext = format.split('/')[-1]
                data = base64.b64decode(imgstr)
                print("data1", data)
                data = BytesIO(data)
            else:
                image_data = image_data.read()
                ext = imghdr.what(None, h=image_data)
                data = BytesIO(image_data)

            if ext is None:
                # Invalid image format
                raise ValueError("Invalid image format")

            data = ContentFile(data.getvalue(), name=f"{instance.id}.{ext}")
            instance.image.save(f"{instance.id}.{ext}", data, save=True)

        return super().update(instance, validated_data)
