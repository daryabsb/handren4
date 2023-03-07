from django.db.models import Q
from django.utils import timezone
from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from .serializers import (
    ClientSerializer,
    AppointmentSerializer,
    TreatmentSerializer,
    AttachmentSerializer,
    PrescriptionSerializer,
    MedicationSerializer,
    ClinicalExaminationSerializer,
)

from .paginations import AppointmentPagination
from core.models import (Client, Appointment, Treatment, Attachment, Prescription,
                         Medication, ClinicalExamination,)


class TimelineViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = AppointmentSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['date']
    search_fields = ['title', 'client__name']
    pagination_class = PageNumberPagination

    def get_queryset(self):
        now = timezone.now()
        queryset = Appointment.objects.filter(date__lte=now).order_by('-date')
        client_id = self.request.query_params.get('client_id', None)
        date_from = self.request.query_params.get('date_from', None)
        date_to = self.request.query_params.get('date_to', None)
        if client_id is not None:
            queryset = queryset.filter(client_id=client_id)
        if date_from is not None and date_to is not None:
            queryset = queryset.filter(date__range=[date_from, date_to])
        return queryset.prefetch_related(
            'treatments', 'prescriptions', 'prescriptions__medication'
            # 'attachments',
        )


class UpcomingTimelineViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = AppointmentSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['date']
    search_fields = ['title', 'client__name']
    pagination_class = PageNumberPagination

    def get_queryset(self):
        now = timezone.now()
        queryset = Appointment.objects.filter(date__gte=now).order_by('date')
        client_id = self.request.query_params.get('client_id', None)
        date_from = self.request.query_params.get('date_from', None)
        date_to = self.request.query_params.get('date_to', None)
        if client_id is not None:
            queryset = queryset.filter(client_id=client_id)
        if date_from is not None and date_to is not None:
            queryset = queryset.filter(date__range=[date_from, date_to])
        return queryset.prefetch_related(
            'treatments', 'prescriptions', 'prescriptions__medication'
            # 'attachments',
        )


class ClientViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()


class TreatmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TreatmentSerializer
    queryset = Treatment.objects.all()


class AttachmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AttachmentSerializer
    queryset = Attachment.objects.all()


class PrescriptionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PrescriptionSerializer
    queryset = Prescription.objects.all()


class MedicationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MedicationSerializer
    queryset = Medication.objects.all()


class ClinicalExaminationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ClinicalExaminationSerializer
    queryset = ClinicalExamination.objects.all()


class TimelineViewset2(viewsets.ReadOnlyModelViewSet):
    serializer_class = AppointmentSerializer
    pagination_class = AppointmentPagination

    def get_queryset(self):
        queryset = Appointment.objects.select_related(
            'client').order_by('-date')

        # filter by client id if provided
        client_id = self.request.query_params.get('client')
        if client_id:
            queryset = queryset.filter(client_id=client_id)

        # filter by date range if provided
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date and end_date:
            queryset = queryset.filter(
                Q(date__gte=start_date) & Q(date__lte=end_date) | Q(
                    date_to__gte=start_date) & Q(date_to__lte=end_date)
            )

        return queryset
