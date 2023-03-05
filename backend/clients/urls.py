from django.urls import path, include
from rest_framework import routers

from .views import (
    AttachmentViewSet, ClientViewSet, AllClientsViewSet,
    ClinicalExaminationViewset, ClientHealthStatusViewSet,
    ClientImageUpdateView, CountByForeignKeyView, ClientAppointmentViewSet

)

router = routers.DefaultRouter()
router.register('all', ClientAppointmentViewSet, basename='clients')
# router.register('all', AllClientsViewSet)
router.register('clients', ClientViewSet)
router.register('attachments', AttachmentViewSet)
router.register('status', ClientHealthStatusViewSet, basename="healthstatus")

router.register('examinations', ClinicalExaminationViewset)

urlpatterns = [
    path('', include(router.urls)),
    path("<int:id>/image/", ClientImageUpdateView.as_view(),
         name="client-image-update"),
    path('<int:id>/counts/',
         CountByForeignKeyView.as_view(), name='count_by_foreign_key'),
]
