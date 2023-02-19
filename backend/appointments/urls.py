from django.urls import path, include, re_path
from rest_framework import routers


from .views import (
    AppointmentViewSet, PrescriptionViewset, TreatmentViewset,
    MedicationViewset, AllAppointmentViewSet,
)

router = routers.DefaultRouter()

router.register('all', AllAppointmentViewSet)
router.register('appointments', AppointmentViewSet)
router.register('prescriptions', PrescriptionViewset)
router.register('treatments', TreatmentViewset)
router.register('medications', MedicationViewset)


urlpatterns = [
    path('', include(router.urls)),

]
