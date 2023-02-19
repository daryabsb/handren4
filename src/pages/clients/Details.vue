<template><!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
<body class="h-full">
    ```
  -->
    <div class="min-h-full bg-zinc-100 pt-6">
      <Breadcrumbs :breadcrumbs="[
        { name: 'Clients', route: '/clients' },
        { name: client && client.name ? client.name : '', route: '#' }
      ]" />

      <main v-if="client && details" class="py-4">
        <!-- Page header -->
        <div class="mx-auto mt-3 grid max-w-3xl grid-cols-1 gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div class="space-y-4 lg:col-span-2 lg:col-start-1">
            <!-- Description list-->
            <section aria-labelledby="applicant-information-title">
              <div class="bg-white shadow sm:rounded-lg">

                <div class="border-t border-gray-200 px-4 py-3 sm:px-6">
                  <dl class="grid grid-cols-1 gap-x-4 gap-y-8 divide-y sm:grid-cols-4">
                    <div class="sm:col-span-4">
                      <div class=" max-w-7xl mx-auto overflow-hidden bg-white ">
                        <q-card flat padding class="my-card" bordered>


                          <q-card-section horizontal>

                            <q-img class="col  aspect-1  object-cover object-center" :src="client.image">
                              <q-page-sticky position="top-right" :offset="[0, -70]">
                                <q-btn size="xs" icon="add" color="primary" @click="toggleImageUpdate" />
                              </q-page-sticky>
                            </q-img>



                            <q-card-section class=" overflow-hidden">
                              <div class="text-xl font-bold text-gray-900 sm:text-2xl mb-2">{{ client.name }}</div>
                              <q-item-label caption>Age: <span class="capitalize font-semibold text-zinc-900">{{
                                client.age
                              }}</span></q-item-label>
                              <q-item-label caption>Sex: <span class="capitalize font-semibold text-zinc-900">{{
                                client.gender
                              }}</span>
                              </q-item-label>
                              <q-item-label caption>Height: <span class="capitalize font-semibold text-zinc-900">{{
                                status.height
                              }}</span>
                              </q-item-label>
                              <q-item-label caption>Weight: <span class="capitalize font-semibold text-zinc-900">{{
                                status.weight
                              }}</span>
                              </q-item-label>
                            </q-card-section>
                            <q-card-actions vertical dense class="justify-around">
                              <!-- <q-btn flat round color="red" icon="favorite" />
                                                                          <q-btn flat round color="accent" icon="bookmark" />
                                                                          <q-btn flat round color="primary" icon="share" /> -->
                              <q-list>
                                <q-item dense clickable>
                                  <q-item-section avatar>
                                    <q-icon color="red" name="favorite" />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label>Heart: <q-item-label caption class="text-green-600">{{
                                      status.heart_condition
                                    }}</q-item-label></q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item dense clickable>
                                  <q-item-section avatar>
                                    <q-icon color="primary" name="bookmark" />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label>Bar XYZ: <q-item-label caption>30%</q-item-label></q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item dense clickable>
                                  <q-item-section avatar>
                                    <q-icon color="green" name="share" />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label>Bar XYZ: <q-item-label caption>30%</q-item-label></q-item-label>
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </q-card-actions>
                            <q-card-actions vertical dense class="justify-around">
                              <!-- <q-btn flat round color="red" icon="favorite" />
                                                                          <q-btn flat round color="accent" icon="bookmark" />
                                                                          <q-btn flat round color="primary" icon="share" /> -->
                              <q-list>
                                <q-item dense clickable>
                                  <q-item-section avatar>
                                    <q-icon color="red" name="favorite" />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label>Heart: <q-item-label caption class="text-green-600">{{
                                      status.heart_condition
                                    }}</q-item-label></q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item dense clickable>
                                  <q-item-section avatar>
                                    <q-icon color="primary" name="bookmark" />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label>Bar XYZ: <q-item-label caption>30%</q-item-label></q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item dense clickable>
                                  <q-item-section avatar>
                                    <q-icon color="green" name="share" />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label>Bar XYZ: <q-item-label caption>30%</q-item-label></q-item-label>
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </q-card-actions>
                          </q-card-section>
                        </q-card>
                      </div>
                      <Examination :examinations="examination" />
                    </div>

                    <div class="sm:col-span-4">
                      <dt class="text-sm font-medium text-gray-500">Attachments</dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        <ul v-if="attachments" role="list"
                          class="divide-y divide-gray-200 rounded-md border border-gray-200">
                          <li v-for="attachment in attachments" :key="attachment.filename"
                            class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div class="flex w-0 flex-1 items-center">
                              <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              <span class="ml-2 w-0 flex-1 truncate">{{
                                attachment.filename
                              }}</span>
                            </div>

                            <div class="ml-4 flex-shrink-0">
                              <a :href="attachment.file" class="font-medium text-blue-600 hover:text-blue-500">Download</a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <a href="#"
                    class="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg">Read
                    full application</a>
                </div>
              </div>
            </section>
          </div>

          <section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
            <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Timeline</h2>

              <!-- Activity Feed -->
              <div class="mt-6 flow-root">
                <q-btn color="red" icon="schedule" icon-right="add" label="Add an appointment" class="full-width"
                  @click="open = true" />
                <Dialog v-model:start="startTime" v-model:end="endTime" @ok="addAppointment" v-model="open">

                </Dialog>
                <!-- <TimePicker /> -->
                <ul role="list" class="-mb-8">
                  <pre>
                                                                                      {{ details.nextAppointment }}
                                                                                    </pre>
                  <li v-for="(item, itemIdx) in details.pastAppointments" :key="item.id">
                    <div class="relative pb-8">
                      <span v-if="itemIdx !== details.pastAppointments - 1"
                        class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      <div class="relative flex space-x-3">
                        <div>
                          <!-- item.type.bgColorClass, -->
                          <span :class="['h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white']">
                            <component :is="HandThumbUpIcon" class="h-5 w-5 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p class="text-sm text-gray-500">
                              {{ item.client }} <a href="#" class="font-medium text-gray-900">-{{ item.client }}</a>
                            </p>
                          </div>
                          <div class="whitespace-nowrap text-right text-sm text-gray-500">
                            <time :datetime="item.date">{{ item.date }}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="justify-stretch mt-6 flex flex-col">
                <button type="button"
                  class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Advance
                  to offer</button>
              </div>
            </div>
          </section>
        </div>
        <ImageUpload :url="`/clients/${client.id}/image/`" @update-image="updateClient" v-model:open="openImageUpdate" />
      </main>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, inject, defineAsyncComponent } from "vue"
import Examinations from "../../components/Examinations.vue"
import Examination from "../../components/Examination.vue"
import Dialog from "../../components/shared/Dialog.vue"
import fetchClientAppointmentsData from "../../composables/useFetchAppointmentDetail"
import fetchClientData from "../../composables/useFetchClientDetails"

import {
  HandThumbUpIcon,
  PaperClipIcon,
} from '@heroicons/vue/20/solid'
import Breadcrumbs from "../../components/Navbar/BreadCrumbs.vue"
import { useClientStore } from "../../stores/client"

const ImageUpload = defineAsyncComponent(() => import("../../components/shared/ImageUpload.vue"))
function updateClient(jsonData) {
  // console.log("success call", jsonData)
  client.value.image = jsonData.image;
}
const store = useClientStore()

const props = defineProps({
  id: { type: String, required: true }
})

const client = ref(null)
const status = ref(null)
const examination = ref(null)
const attachments = ref([])
const details = ref(null)

const filters = inject("filters")
const open = ref(false)
const openImageUpdate = ref(false)
const toggleImageUpdate = () => openImageUpdate.value = !openImageUpdate.value
const startTime = ref(filters.dateTimeMoment(new Date()))
const endTime = ref(filters.addHours(new Date(), 2))
const addAppointment = async () => {
  console.log("Next appointment starts: ", startTime.value);
  console.log("Next appointment ends: ", endTime.value);
  // NOTE HERE
};

onMounted(async () => {
  const { client: clientData, status: statusData, attachments: attachmentsData, examination: examinationData, details: detailsData } = await fetchClientData(props.id);
  client.value = clientData;
  status.value = statusData;
  examination.value = examinationData;
  attachments.value = attachmentsData;
  details.value = detailsData;
});

</script>

<style scoped>
html {
  @apply h-full bg-gray-100;
}

body {
  @apply h-full
}
</style>
