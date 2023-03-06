import {defineComponent} from 'vue'
import useTimeline from '@/composables/useTimeline'
from django.db.models import Q
from rest_framework import viewsets, serializers, pagination
from .models import Appointment, Client, Treatment, Prescription, Medication


In this implementation, I added the prefetch_related() method to the queryset to fetch all the related objects for each appointment. I also added depth = 1 to the AppointmentSerializer class to include the related objects in the serialized output. Finally, I added the viewsets for each related model so that they can be accessed separately if needed.


/timeline/
/timeline/<pk > /
/clients/
/clients/<pk > /
/treatments/
/treatments/<pk > /
/attachments/
/attachments/<pk > /
/prescriptions/
/prescriptions/<pk > /
/medications/
/medications/<pk > /
/examinations/
/examinations/<pk > /


export default defineComponent({
    setup() {
        const {state, loadAppointments}=useTimeline()

        // Load the appointments data when the component is mounted
        loadAppointments()

        return {
            state
        }
    }
})


In this modified version of the script section, I added two props to the component: clientId and dateRange. The clientId prop is used to filter the appointments for a specific client, and the dateRange prop is used to filter the appointments based on a specific date range. Both props have default values of null.

I then added a watchEffect hook that watches for changes in the clientId and dateRange props, and calls the loadAppointments function whenever either prop changes. This way, the component will automatically load the appropriate appointments when the clientId or dateRange props change.

I also added a loadMore function that is called when the user scrolls to the bottom of the timeline and wants to load more appointments. This function checks if there is a nextPageUrl value, and if so, makes a request to that URL to load more appointments. The loaded appointments are then appended to the appointments array.
