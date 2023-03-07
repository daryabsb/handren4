import { Ref } from "vue";
import { AxiosError } from "axios";
export interface Client {
  id: number;
  user: number;
  name: string;
  dob: string;
  date_bonding: string;
  age: number;
  gender: string;
  address: number;
  phone: string;
  email: string;
  description: string;
  status: string;
  created: string;
  updated: string;
  image: string;
  appointment_count?: number;
  treatment_count?: number;
  next_appointment?: string;
}

export interface Attachment {
  id: number;
  client: number;
  file_type: string;
  filename: string;
  file: string;
  page_count: number;
}

export interface Examination {
  id: number;
  skeletal_class: string;
  nasolabial_angle: string;
  nasolabial_sulcus: string;
  overjet: string;
  oral_hygiene: string;
  lip_competency: string;
  face_form: string;
  habit: string;
  treated_arch: string;
  molar_class_left: string;
  molar_class_right: string;
  tongue_size: string;
  bracket_system: string;
  midline_upper: string;
  midline_lower: string;
  slot: string;
  extraction_upper: string;
  extraction_lower: string;
  anchorage_upper: string;
  treatment_plan: string;
  created: string;
  updated: string;
  user: number;
  client: number;
}

export interface Appointment {
  id: number;
  client: number;
  description: string;
  date: string;
  date_to: string;
  start: string;
  end: string;
  startDate: string;
  endDate: string;
  treatment?: Treatment[];
  prescription?: Prescription[];
}

export interface Treatment {
  id: number;
  appointment: number;
  note: string;
  created: string;
}

export interface Prescription {
  id: number;
  appointment: number;
  medication: number;
  created: string;
  medications?: Medications[];
}

export interface Medications {
  id: number;
  medicine_name: string;
  dosage: string;
  duration: number;
  created: string;
  updated: string;
  user: number;
}

export interface ReturnedData {
  count: number;
  next: string;
  previous: string;
  results: Appointment[];
}

export interface Data {
  count: number;
  next: string;
  previous: string;
  results: Appointment[];
}

export interface UseFetchDataProps {
  viewForFetch: Ref<string | null>;
  viewStartDate: Ref<string | null>;
}

export interface UseFetchDataReturn {
  data: Ref<Data | null>;
  error: Ref<AxiosError<any> | null>;
}

export interface UseFetchSingleAppointmentReturn {
  data: Ref<Appointment | null>;
  error: Ref<AxiosError<any> | null>;
}

export interface ViewChange {
  view: string;
  startDate: string; // View start - JS native Date object.
  endDate: string; // View end - JS native Date object.
  firstCellDate: string; // Month view only, in case cell is out of current month - JS native Date object.
  lastCellDate: string; // Month view only, in case cell is out of current month - JS native Date object.
  outOfScopeEvents: any[]; // Month view only, all the events that are out of the current month.
  events: any[]; // All the events in the current view.
  week: number; // Week number. Only returned if view is 'week'.
}

export interface Appointment {
  id: number;
  title: string;
  date: string;
  date_to: string;
  treatments: Treatment[];
  attachments: Attachment[];
  prescriptions: Prescription[];
}

export interface Treatment {
  id: number;
  note: string;
}

export interface Attachment {
  id: number;
  file: string;
}

export interface Medication {
  id: number;
  medicine_name: string;
  dosage: string;
  duration: number;
}

export interface Prescription {
  id: number;
  medication: Medication;
}
export interface TimelineState {
  appointments: Appointment[];
  isLoading: boolean;
  error: any;
}

export interface TimelineParams {
  clientId?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}
