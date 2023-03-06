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
from .models import Client, Appointment, Treatment, Attachment, Prescription, Medication, ClinicalExamination


class TimelineViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = AppointmentSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['date']
    search_fields = ['title', 'client__name']
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = Appointment.objects.all().order_by('-date')
        client_id = self.request.query_params.get('client_id', None)
        date_from = self.request.query_params.get('date_from', None)
        date_to = self.request.query_params.get('date_to', None)
        if client_id is not None:
            queryset = queryset.filter(client_id=client_id)
        if date_from is not None and date_to is not None:
            queryset = queryset.filter(date__range=[date_from, date_to])
        return queryset.prefetch_related('treatments', 'attachments', 'prescriptions', 'prescriptions__medication')


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



In this implementation, I added the prefetch_related() method to the queryset to fetch all the related objects for each appointment. I also added depth = 1 to the AppointmentSerializer class to include the related objects in the serialized output. Finally, I added the viewsets for each related model so that they can be accessed separately if needed.


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
router.register(r'prescriptions', PrescriptionViewSet, basename='prescriptions')
router.register(r'medications', MedicationViewSet, basename='medications')
router.register(r'examinations', ClinicalExaminationViewSet, basename='examinations')

urlpatterns = [
    path('', include(router.urls)),
]


/timeline/
/timeline/<pk>/
/clients/
/clients/<pk>/
/treatments/
/treatments/<pk>/
/attachments/
/attachments/<pk>/
/prescriptions/
/prescriptions/<pk>/
/medications/
/medications/<pk>/
/examinations/
/examinations/<pk>/


import { ref } from 'vue'
import axios from 'axios'

interface Appointment {
  id: number
  title: string
  date: string
  date_to: string
  treatments: Treatment[]
  attachments: Attachment[]
  prescriptions: Prescription[]
}

interface Treatment {
  id: number
  note: string
}

interface Attachment {
  id: number
  file: string
}

interface Prescription {
  id: number
  medication: Medication
}

interface Medication {
  id: number
  medicine_name: string
  dosage: string
  duration: number
}

interface TimelineState {
  appointments: Appointment[]
  isLoading: boolean
  error: any
}

export default function useTimeline() {
  const state = ref<TimelineState>({
    appointments: [],
    isLoading: false,
    error: null
  })

  const loadAppointments = async (clientId?: number, startDate?: string, endDate?: string, page?: number, pageSize?: number) => {
    state.value.isLoading = true

    try {
      const params = {
        client_id: clientId,
        start_date: startDate,
        end_date: endDate,
        page: page,
        page_size: pageSize
      }

      const response = await axios.get('/api/timeline/', { params })

      state.value.appointments = response.data.results
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.isLoading = false
    }
  }

  return {
    state,
    loadAppointments
  }
}



import { defineComponent } from 'vue'
import useTimeline from '@/composables/useTimeline'

export default defineComponent({
  setup() {
    const { state, loadAppointments } = useTimeline()

    // Load the appointments data when the component is mounted
    loadAppointments()

    return {
      state
    }
  }
})



<script lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import axios from 'axios'

interface Appointment {
  id: number
  client: number
  title: string | null
  date: string
  date_to: string | null
  treatments: any[]
  attachments: any[]
  prescriptions: any[]
}

export default {
  props: {
    clientId: {
      type: Number,
      default: null
    },
    dateRange: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const appointments = ref<Appointment[]>([])
    const nextPageUrl = ref<string | null>(null)
    const isLoading = ref(false)

    const loadAppointments = async () => {
      isLoading.value = true
      try {
        let url = '/api/timeline/'
        if (props.clientId) {
          url += `?client=${props.clientId}`
        }
        if (props.dateRange) {
          url += `&start=${props.dateRange.start}&end=${props.dateRange.end}`
        }
        const response = await axios.get(url)
        appointments.value = response.data.results
        nextPageUrl.value = response.data.next
      } catch (error) {
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }

    watchEffect(() => {
      loadAppointments()
    })

    const loadMore = async () => {
      if (nextPageUrl.value) {
        isLoading.value = true
        try {
          const response = await axios.get(nextPageUrl.value)
          appointments.value.push(...response.data.results)
          nextPageUrl.value = response.data.next
        } catch (error) {
          console.error(error)
        } finally {
          isLoading.value = false
        }
      }
    }

    return {
      appointments,
      isLoading,
      loadMore
    }
  }
}
</script>
In this modified version of the script section, I added two props to the component: clientId and dateRange. The clientId prop is used to filter the appointments for a specific client, and the dateRange prop is used to filter the appointments based on a specific date range. Both props have default values of null.

I then added a watchEffect hook that watches for changes in the clientId and dateRange props, and calls the loadAppointments function whenever either prop changes. This way, the component will automatically load the appropriate appointments when the clientId or dateRange props change.

I also added a loadMore function that is called when the user scrolls to the bottom of the timeline and wants to load more appointments. This function checks if there is a nextPageUrl value, and if so, makes a request to that URL to load more appointments. The loaded appointments are then appended to the appointments array.