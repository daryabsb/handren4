from django.shortcuts import render
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Min

from django_filters import rest_framework as filters

from django.db.models import Q

from rest_framework import permissions, viewsets, generics


# Create your views here.

from core.models import (
    Client, Attachment, ClinicalExamination, ClientHealthStatus,
    Appointment, Treatment,
)
from .serializers import (
    AttachmentSerializer, ClientSerializer,
    ClinicalExaminationSerializer, ClientHealthStatusSerializer,
    ClientImageSerializer
)
from .pagination import ClientPagination


class AttachmentViewSet(viewsets.ModelViewSet):
    # Manage ingredientss in the database
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
    lookup_field = 'id'

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        # print(self.request.query_params)
        queryset = Attachment.objects.all()
        client = self.request.query_params.get('client', None)
        type = self.request.query_params.get('type', None)

        if client is not None:
            queryset = queryset.filter(client=client)

        if type is not None:
            queryset = queryset.filter(file_type=type)

        return queryset.order_by('-id')

    def perform_create(self, serializer):
        """Create a new attachment"""
        print(self.request.user)
        serializer.save(user=self.request.user)


class AllClientsViewSet(viewsets.ModelViewSet):
    # Manage ingredientss in the database
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    pagination_class = None
    lookup_field = 'id'


class ClinicalExaminationViewset(viewsets.ModelViewSet):
    queryset = ClinicalExamination.objects.all()
    serializer_class = ClinicalExaminationSerializer
    lookup_field = 'client'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ClientViewSet(viewsets.ModelViewSet):
    # Manage ingredientss in the database
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    pagination_class = ClientPagination
    lookup_field = 'id'

    def perform_create(self, serializer):
        print(self.request.user)
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        # print(self.request.query_params)
        queryset = Client.objects.all()

        # PERFORM FILTER BY SEARCH INPUT
        conditions = Q()
        keywords = self.request.query_params.get('input', None)
        # print(keywords)
        if keywords:

            keywords_list = keywords.split(' ')
            print(keywords_list)
            for word in keywords_list:
                conditions |= Q(name__icontains=word) | Q(
                    email__icontains=word)

            if conditions:
                # print(type(conditions))
                queryset = Client.objects.filter(conditions)

        # PERFORM FILTER BY DATE
        # PATIENT OBJECT DOESNT HAVE DATE

        return queryset


class ClientHealthStatusViewSet(viewsets.ModelViewSet):
    queryset = ClientHealthStatus.objects.all()
    serializer_class = ClientHealthStatusSerializer
    lookup_field = 'client'


class ClientImageUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ClientImageSerializer
    # permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_object(self):
        kwarg_id = self.kwargs.get("id")
        obj = Client.objects.get(id=kwarg_id)
        return obj


class CountByForeignKeyView(APIView):
    def get(self, request, id):
        appointment_count = Appointment.objects.filter(client=id).count()
        treatment_count = Treatment.objects.filter(client=id).count()
        next_appointment = Appointment.objects.filter(
            client=id, date__gte=timezone.now().date()).aggregate(
                Min('date'))['date__min']

        # Add more models and counts as needed
        response_data = {
            'appointment_count': appointment_count,
            'treatment_count': treatment_count,
            'next_appointment': next_appointment,
            # Add more counts as needed
        }
        return Response(response_data)


class ClientAppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    pagination_class = None
    lookup_field = 'id'

    def get_queryset(self):
        queryset = Client.objects.annotate(
            appointment_count=Count('appointments'),
            next_appointment=Min('appointments__date', filter=Q(
                appointments__date__gte=timezone.now().date()))
        ).order_by('-id', '-next_appointment')
        return queryset

    @action(detail=True, url_path='count-by-foreign-key')
    def count_by_foreign_key(self, request, id=None):
        client = self.get_object()
        appointment_count = client.appointment_count
        treatment_count = client.treatments.count()
        next_appointment = client.next_appointment

        response_data = {
            'appointment_count': appointment_count,
            'treatment_count': treatment_count,
            'next_appointment': next_appointment,
            # Add more counts as needed
        }
        return Response(response_data)
