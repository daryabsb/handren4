class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    filter_class = AppointmentFilter
    # lookup_field = 'client'

    def filter_by_month(self):
        month_name = self.request.query_params.get('month', None)
        if month_name:
            month = datetime.strptime(month_name.split()[0], '%B').month
            year = int(month_name.split()[1])
            month_start = datetime.strptime(
                f'{year}-{month:02d}-01', '%Y-%m-%d')
            if month == 12:
                next_month = 1
                next_year = year + 1
            else:
                next_month = month + 1
                next_year = year
            month_end = datetime.strptime(
                f'{next_year}-{next_month:02d}-01', '%Y-%m-%d') - timedelta(days=1)
            return Appointment.objects.filter(date__gte=month_start, date__lte=month_end)
        return Appointment.objects.all()

    def filter_by_week_number(self, queryset, name, value):
        return queryset.filter(date__week=value)

    def filter_by_week_start(self, queryset, name, value):
        today = timezone.now().date()
        start_date = today - \
            timedelta(days=today.weekday() + (0 if value else 1))
        return queryset.filter(date__range=[start_date, start_date + timedelta(days=6)])

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = self.filter_by_month()
        queryset = self.filter_by_week_number(queryset) ???

        return queryset.filter()
