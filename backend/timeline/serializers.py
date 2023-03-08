from rest_framework import serializers
from core.models import (Appointment, Client, Treatment,
                         Prescription, Medication, Attachment,
                         ClinicalExamination)


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ('id', 'file', 'page_count',
                  'file_type', 'client', 'appointment')


class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = ('id', 'medicine_name', 'dosage', 'duration')


class PrescriptionSerializer(serializers.ModelSerializer):
    medication = MedicationSerializer(required=False)

    class Meta:
        model = Prescription
        fields = ('id', 'note', 'medication', 'created', 'updated')


class TreatmentSerializer(serializers.ModelSerializer):
    prescriptions = PrescriptionSerializer(many=True, required=False)

    class Meta:
        model = Treatment
        fields = ('id', 'note', 'prescriptions', 'created', 'updated',)


class ClientSerializer(serializers.ModelSerializer):
    treatments = TreatmentSerializer(many=True)

    class Meta:
        model = Client
        fields = ('id', 'name', 'image', 'created', 'updated', 'treatments')


class AppointmentSerializer(serializers.ModelSerializer):
    client = ClientSerializer()
    attachments = AttachmentSerializer(many=True)

    class Meta:
        model = Appointment
        fields = ('id', 'title', 'date', 'date_to',
                  'created', 'updated', 'client', 'attachments')


class ClinicalExaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalExamination
        fields = '__all__'
