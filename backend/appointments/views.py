
from django.utils import timezone
import pytz


from django.db.models import Q

from rest_framework import permissions, viewsets
from datetime import datetime, timedelta, date as dt
from .filters import (datefilter, get_date_range as delta,
                      MedicationIdFilter, AppointmentFilter)
from core.models import (
    Client, Prescription, Appointment,
    Treatment, Medication
)
from .serializers import (
    AppointmentSerializer, MedicationSerializer,
    PrescriptionSerializer, TreatmentSerializer,
)
from .pagination import AppointmentPagination


class AllAppointmentsViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    pagination_class = None
    filter_class = AppointmentFilter
    lookup_field = 'id'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def filter_by_month_and_year(self, queryset):
        month_name = self.request.query_params.get('month', None)
        if month_name:
            month = datetime.strptime(month_name.split()[0], '%B').month
            year = int(month_name.split()[1])
            month_start, month_end = self.get_month_range(month, year)
            return queryset.filter(date__range=[month_start, month_end])
        return queryset

    def get_month_range(self, month, year):
        month_start = datetime.strptime(f'{year}-{month:02d}-01', '%Y-%m-%d')
        if month == 12:
            next_month = 1
            next_year = year + 1
        else:
            next_month = month + 1
            next_year = year
            month_end = datetime.strptime(
                f'{next_year}-{next_month:02d}-01', '%Y-%m-%d') - timedelta(days=1)
        return month_start, month_end

    def filter_by_week(self, queryset):
        date_str = self.request.query_params.get('week', None)
        if date_str:
            start_date = datetime.strptime(date_str, '%Y-%m-%d')
            end_date = start_date + timedelta(days=6)
            return queryset.filter(date__range=[start_date, end_date])
        return queryset

    def filter_by_date(self, queryset):
        # today = datetime.now()
        date_query = self.request.query_params.get('dq', None)
        if date_query is not None:
            todays_date = dt.today()
            todays_query = datetime.strptime(
                f'{todays_date}T00:00:00Z', '%Y-%m-%dT%H:%M:%SZ')
            query = delta(date_query)
            if query is not None:
                queryset = queryset.filter(
                    date__gte=todays_query, date__lte=query)
            if date_query == 'custom':
                date_str = self.request.query_params.get('date', None)
                if date_str is not None:
                    date = datetime.strptime(
                        f'{date_str}T00:00:00Z', '%Y-%m-%dT%H:%M:%SZ')
                    end_date = datetime.strptime(
                        f'{date_str}T23:59:00Z', '%Y-%m-%dT%H:%M:%SZ')
                    queryset = queryset.filter(
                        date__gte=date, date__lte=end_date)
        return queryset

    def filter_by_week_number(self, queryset, name, value):
        return queryset.filter(date__week=value)

    def filter_by_week_start(self, queryset, name, value):
        today = timezone.now().date()
        start_date = today - \
            timedelta(days=today.weekday() + (0 if value else 1))
        return queryset.filter(
            date__range=[start_date, start_date + timedelta(days=6)
                         ])

    def filter_by_keywords(self, queryset):
        keywords = self.request.query_params.get('input', None)
        if keywords:
            conditions = Q()
            keywords_list = keywords.split(' ')
            for word in keywords_list:
                conditions |= Q(client__name__icontains=word) | Q(
                    description__icontains=word)
            if conditions:
                return queryset.filter(conditions)
        return queryset

    def filter_by_client(self, queryset):
        client_query = self.request.query_params.get('client', None)
        if client_query is not None:
            queryset = queryset.filter(client=client_query)
        return queryset

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = self.filter_by_month_and_year(queryset)
        queryset = self.filter_by_week(queryset)
        queryset = self.filter_by_keywords(queryset)
        queryset = self.filter_by_date(queryset)
        queryset = self.filter_by_client(queryset)
        # queryset = self.filter_by_week(queryset)

        return queryset.filter()


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    pagination_class = AppointmentPagination
    filter_class = AppointmentFilter
    # lookup_field = 'client'


class PrescriptionViewset(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    lookup_field = 'appointment'

    def perform_create(self, serializer):
        appointment = serializer.validated_data['appointment']
        client = Client.objects.get(id=appointment.client.id)
        serializer.save(user=self.request.user, client=client)


class TreatmentViewset(viewsets.ModelViewSet):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer
    lookup_field = 'appointment'

    def perform_create(self, serializer):
        appointment = serializer.validated_data['appointment']
        client = Client.objects.get(id=appointment.client.id)
        serializer.save(user=self.request.user, client=client)


class MedicationViewset(viewsets.ModelViewSet):
    queryset = Medication.objects.all().prefetch_related('prescriptions')
    serializer_class = MedicationSerializer
    lookup_field = 'id'
    kwargs_fields = 'medicine_name'
    filter_backends = [MedicationIdFilter]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


'''
You're right, I missed that. Here's an updated version of the filter_by_week function that 
takes into account the sunday and monday query parameters:

def filter_by_week(query_params):
    date_str = query_params.get("week")
    if not date_str:
        return Appointment.objects.none()

    date_obj = datetime.strptime(date_str, "%Y-%m-%d")
    is_sunday = query_params.get("sunday", True)
    is_monday = query_params.get("monday", False)

    if is_monday:
        start_date = date_obj - timedelta(days=date_obj.weekday())
    else:
        start_date = date_obj - timedelta(days=date_obj.weekday() + (date_obj.weekday() == 6))

    if is_sunday:
        end_date = start_date + timedelta(days=6)
    else:
        end_date = start_date + timedelta(days=5)

    start_date = datetime.combine(start_date, datetime.min.time())
    end_date = datetime.combine(end_date, datetime.max.time())

    appointments = Appointment.objects.filter(date__range=(start_date, end_date))

    # Check for appointments that start before the start_date but end after it
    if is_monday and start_date.day > date_obj.day:
        appointments |= Appointment.objects.filter(date__lt=start_date, date_to__gt=start_date)
    elif not is_monday and start_date.day < date_obj.day:
        appointments |= Appointment.objects.filter(date__lt=start_date, date_to__gt=start_date)

    return appointments.order_by("date")


To handle appointments that start at 23:00 and end at 01:00, we can add an additional check to see if the appointment starts on one day and ends on the next day. We can then split the appointment into two separate appointments, one for each day.

To handle the case where the week starts on a day other than Monday, we can use the isocalendar() method of the datetime object to determine the day of the week, and adjust the start date accordingly.

To allow the user to specify the starting day of the week, we can add an optional start_day parameter to the filter_by_week function. If start_day is not specified, we will assume that the week starts on Sunday.

Here's the updated code:

from django.db.models import Q
from datetime import datetime, timedelta


def get_week_range(date_obj, start_day=6):
    """Return start and end datetime objects for the week."""
    # Adjust start date based on start day of the week
    if start_day != 6:
        offset = start_day - date_obj.isocalendar()[2]
        date_obj += timedelta(days=offset)

    # Calculate start and end dates of the week
    start_date = date_obj - timedelta(days=date_obj.isoweekday() - 1)
    end_date = start_date + timedelta(days=6)

    return start_date, end_date


def filter_by_week(queryset, date_str, start_day=6):
    """Filter appointments by week."""
    # Convert date string to datetime object
    date_obj = datetime.strptime(date_str, "%Y-%m-%d")

    # Get start and end dates of the week
    start_date, end_date = get_week_range(date_obj, start_day=start_day)

    # Split appointments that span multiple days
    q1 = Q(date__range=(start_date, end_date))
    q2 = Q(date__lt=start_date, date_to__gte=start_date)
    q3 = Q(date__lt=end_date, date_to__gte=end_date)
    q4 = Q(date__lt=start_date, date_to__gt=end_date)
    queryset = queryset.filter(q1 | q2 | q3 | q4)

    return queryset


# Filter appointments for the week of 2023-02-06, starting on Sunday
queryset = filter_by_week(Appointment.objects.all(), "2023-02-06")

# Filter appointments for the week of 2023-02-06, starting on Monday
queryset = filter_by_week(Appointment.objects.all(), "2023-02-06", start_day=0)





'''
