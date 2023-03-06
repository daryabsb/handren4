from rest_framework import pagination


class AppointmentPagination(pagination.PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 100
