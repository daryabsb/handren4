from django.urls import path, include
from rest_framework import routers
from .views import (
    TimelineViewset,
    ClientViewSet,
    TreatmentViewSet,
    AttachmentViewSet,
    PrescriptionViewSet,
    MedicationViewSet,
    ClinicalExaminationViewSet,
)

router = routers.DefaultRouter()
router.register(r'timeline', TimelineViewset, basename='timeline')
router.register(r'clients', ClientViewSet, basename='clients')
router.register(r'treatments', TreatmentViewSet, basename='treatments')
router.register(r'attachments', AttachmentViewSet, basename='attachments')
router.register(r'prescriptions', PrescriptionViewSet,
                basename='prescriptions')
router.register(r'medications', MedicationViewSet, basename='medications')
router.register(r'examinations', ClinicalExaminationViewSet,
                basename='examinations')

urlpatterns = [
    path('', include(router.urls)),
]
