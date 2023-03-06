<template>
  <div class="">
    <Breadcrumbs :breadcrumbs="[
      { name: 'Clients', route: '/clients' },
      { name: client && client.name ? client.name : '', route: '#' }
    ]" />

    <main v-if="client && details" class="">
      <!-- <div class=" grid  grid-cols-1 gap-6  lg:grid-flow-col-dense lg:grid-cols-3"> -->
      <section class="q-pa-lg">
        <div class="content-wrapper-header">
          <q-img class="content-wrapper-img relative" :src="client.image" alt="">
            <image-upload :url="`/clients/${client.id}/image/`" @update-image="updateClient" />
          </q-img>

          <div class="content-wrapper-context">

            <q-list flat separator>
              <q-item clickable v-ripple :active="true">
                <q-item-section avatar>
                  <q-icon name="signal_wifi_off" />
                </q-item-section>
                <q-item-section>
                  <h3 class="text-lg">

                    {{ client.name }}
                  </h3>
                </q-item-section>
                <!-- <q-item-section side>Side</q-item-section> -->
              </q-item>

              <q-item clickable v-ripple :active="true" active-class="text-[var(--theme-color)]">
                <q-item-section avatar>
                  <q-icon name="signal_wifi_off" />
                </q-item-section>
                <q-item-section>Active, Active class</q-item-section>
                <q-item-section side>Side</q-item-section>
              </q-item>

              <q-item clickable v-ripple :active="false" active-class="bg-teal-1 text-grey-8">
                <q-item-section avatar>
                  <q-icon name="signal_wifi_off" />
                </q-item-section>
                <q-item-section>Active, Active class</q-item-section>
                <q-item-section side>Side</q-item-section>
              </q-item>
              <q-item clickable v-ripple :active="false" active-class="bg-teal-1 text-grey-8">
                <q-item-section avatar>
                  <q-icon name="signal_wifi_off" />
                </q-item-section>
                <q-item-section>Active, Active class</q-item-section>
                <q-item-section side>Side</q-item-section>
              </q-item>
            </q-list>
            <!-- <div class="content-text">
              Grab yourself 10 free images from Adobe Stock in a 30-day free trial plan and find
              perfect image, that will help you with your new project.</div> -->
            <!-- <button class="content-button">Start free trial</button> -->
          </div>
        </div>
      </section>
      <section class="q-pa-lg">
        <div class="col mt-6">
          <div class="text-[var(--content-title-color)] text-xl">Installed</div>
          <ul class="col w-full h-full  bg-[var(--content-bg)] rounded-sm border border-[var(--border-color)]">
            <li
              class=" list-none py-2.5 px-5 row justify-between items-center text-sm w-full h-full whitespace-nowrap transition-all hover:bg-[var(--theme-bg-color)]">
              <div class="products row items-center w-40">
                <svg viewBox="0 0 52 52" style="border:1px solid #3291b8">
                  <g xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z"
                      fill="#061e26" data-original="#393687" />
                    <path
                      d="M12.16 39H9.28V11h9.64c2.613 0 4.553.813 5.82 2.44 1.266 1.626 1.9 3.76 1.9 6.399 0 .934-.027 1.74-.08 2.42-.054.681-.22 1.534-.5 2.561-.28 1.026-.66 1.866-1.14 2.52-.48.654-1.213 1.227-2.2 1.72-.987.494-2.16.74-3.52.74h-7.04V39zm0-12h6.68c.96 0 1.773-.187 2.44-.56.666-.374 1.153-.773 1.46-1.2.306-.427.546-1.04.72-1.84.173-.801.267-1.4.28-1.801.013-.399.02-.973.02-1.72 0-4.053-1.694-6.08-5.08-6.08h-6.52V27zM29.48 33.92l2.8-.12c.106.987.6 1.754 1.48 2.3.88.547 1.893.82 3.04.82s2.14-.26 2.98-.78c.84-.52 1.26-1.266 1.26-2.239s-.36-1.747-1.08-2.32c-.72-.573-1.6-1.026-2.64-1.36-1.04-.333-2.086-.686-3.14-1.06a7.36 7.36 0 01-2.78-1.76c-.987-.934-1.48-2.073-1.48-3.42s.54-2.601 1.62-3.761 2.833-1.739 5.26-1.739c.854 0 1.653.1 2.4.3.746.2 1.28.394 1.6.58l.48.279-.92 2.521c-.854-.666-1.974-1-3.36-1-1.387 0-2.42.26-3.1.78-.68.52-1.02 1.18-1.02 1.979 0 .88.426 1.574 1.28 2.08.853.507 1.813.934 2.88 1.28 1.066.347 2.126.733 3.18 1.16 1.053.427 1.946 1.094 2.68 2s1.1 2.106 1.1 3.6c0 1.494-.6 2.794-1.8 3.9-1.2 1.106-2.954 1.66-5.26 1.66-2.307 0-4.114-.547-5.42-1.64-1.307-1.093-1.987-2.44-2.04-4.04z"
                      fill="#c1dbe6" data-original="#89d3ff" />
                  </g>
                </svg>
                <h4>Photoshop</h4>

              </div>
              <span class="status">
                <span class="status-circle green"></span>
                Updated</span>
              <div class="button-wrapper">
                <button class="content-button status-button open">Open</button>
                <div class="menu">
                  <button class="dropdown">
                    <ul>
                      <li><a href="#">Go to Discover</a></li>
                      <li><a href="#">Learn more</a></li>
                      <li><a href="#">Uninstall</a></li>
                    </ul>
                  </button>
                </div>
              </div>
            </li>
            <!--   <li class="adobe-product">
              <div class="products">
                <svg viewBox="0 0 52 52" style="border:1px solid #b65a0b">
                  <g xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z"
                      fill="#261400" data-original="#6d4c13" />
                    <path
                      d="M30.68 39h-3.24l-2.76-9.04h-8.32L13.72 39H10.6l8.24-28h3.32l8.52 28zm-6.72-12l-3.48-11.36L17.12 27h6.84zM37.479 12.24c0 .453-.16.84-.48 1.16-.32.319-.7.479-1.14.479-.44 0-.827-.166-1.16-.5-.334-.333-.5-.713-.5-1.14s.166-.807.5-1.141c.333-.333.72-.5 1.16-.5.44 0 .82.16 1.14.48.321.322.48.709.48 1.162zM37.24 39h-2.88V18.96h2.88V39z"
                      fill="#e6d2c0" data-original="#ffbd2e" />
                  </g>
                </svg>
                Illustrator
              </div>

              <span class="status">
                <span class="status-circle"></span>
                Update Available</span>
              <div class="button-wrapper">
                <button class="content-button status-button">Update this app</button>
                <div class="pop-up">
                  <div class="pop-up__title">Update This App
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" class="close feather feather-x-circle">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                  </div>
                  <div class="pop-up__subtitle">Adjust your selections for advanced options as desired before continuing.
                    <a href="#">Learn more</a></div>
                  <div class="checkbox-wrapper">
                    <input type="checkbox" id="check1" class="checkbox">
                    <label for="check1">Import previous settings and preferences</label>
                  </div>
                  <div class="checkbox-wrapper">
                    <input type="checkbox" id="check2" class="checkbox">
                    <label for="check2">Remove old versions</label>
                  </div>
                  <div class="content-button-wrapper">
                    <button class="content-button status-button open close">Cancel</button>
                    <button class="content-button status-button">Continue</button>
                  </div>
                </div>
                <div class="menu">
                  <button class="dropdown">
                    <ul>
                      <li><a href="#">Go to Discover</a></li>
                      <li><a href="#">Learn more</a></li>
                      <li><a href="#">Uninstall</a></li>
                    </ul>
                  </button>
                </div>
              </div>
            </li>
            <li class="adobe-product">
              <div class="products">
                <svg viewBox="0 0 52 52" style="border: 1px solid #C75DEB">
                  <g xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z"
                      fill="#3a3375" data-original="#3a3375" />
                    <path
                      d="M27.44 39H24.2l-2.76-9.04h-8.32L10.48 39H7.36l8.24-28h3.32l8.52 28zm-6.72-12l-3.48-11.36L13.88 27h6.84zM31.48 33.48c0 2.267 1.333 3.399 4 3.399 1.653 0 3.466-.546 5.44-1.64L42 37.6c-2.054 1.254-4.2 1.881-6.44 1.881-4.64 0-6.96-1.946-6.96-5.841v-8.2c0-2.16.673-3.841 2.02-5.04 1.346-1.2 3.126-1.801 5.34-1.801s3.94.594 5.18 1.78c1.24 1.187 1.86 2.834 1.86 4.94V30.8l-11.52.6v2.08zm8.6-5.24v-3.08c0-1.413-.44-2.42-1.32-3.021-.88-.6-1.907-.899-3.08-.899-1.174 0-2.167.359-2.98 1.08-.814.72-1.22 1.773-1.22 3.16v3.199l8.6-.439z"
                      fill="#e4d1eb" data-original="#e7adfb" />
                  </g>
                </svg>
                After Effects
              </div>
              <span class="status">
                <span class="status-circle green"></span>
                Updated</span>
              <div class="button-wrapper">
                <button class="content-button status-button open">Open</button>
                <div class="menu">
                  <button class="dropdown">
                    <ul>
                      <li><a href="#">Go to Discover</a></li>
                      <li><a href="#">Learn more</a></li>
                      <li><a href="#">Uninstall</a></li>
                    </ul>
                  </button>
                </div>
              </div>
            </li>-->
          </ul>
        </div>
      </section>
      <!-- <section aria-labelledby="applicant-information-title">
        <div class=" shadow sm:rounded-lg">
          <div class="border-t border-gray-200 px-4 py-3 sm:px-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 divide-y sm:grid-cols-4">
              <div class="sm:col-span-4">
                <div class="overflow-hidden bg-white ">
                  <q-card flat padding class="my-card h-32" bordered>
                    <q-card-section horizontal style="">
                      <q-img class="col" img-class="h-32 w-32 aspect-1 object-cover object-center" :src="client.image">

                        <ImageUpload :url="`/clients/${client.id}/image/`" @update-image="updateClient" />
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
                        <q-btn flat round color="accent" icon="bookmark" />
                        <q-btn flat round color="primary" icon="share" />
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
                  <ul v-if="attachments" role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
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
      </section> -->


      <!-- <section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Timeline</h2>

       
          <div class="mt-6 flow-root">
           
            <Dialog v-model:start="startTime" v-model:end="endTime" @ok="addAppointment" v-model="open">
              <template #button>
                <q-btn color="red" icon="schedule" icon-right="add" label="Add an appointment" class="full-width"
                  @click="open = true" />
              </template>

            </Dialog>
          <ul role="list" class="-mb-8">
              <pre>                                                                                                                                 </pre>
              <li v-for="(item, itemIdx) in details.pastAppointments" :key="item.id">
                <div class="relative pb-8">
                  <span v-if="itemIdx !== details.pastAppointments - 1"
                    class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  <div class="relative flex space-x-3">
                    <div>
                   
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
      </section> -->
      <!-- </div> -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, inject, defineAsyncComponent } from "vue"
// import Examinations from "@/components/client/Examinations.vue"
import Examination from "@/components/client/Examination.vue"
import Dialog from "@/components/shared/Dialog.vue"
import fetchClientAppointmentsData from "@/composables/useFetchAppointmentDetail"
import fetchClientData from "@/composables/useFetchClientDetails"

import {
  HandThumbUpIcon,
  PaperClipIcon,
} from '@heroicons/vue/20/solid'
import Breadcrumbs from "@/components/navigations/BreadCrumbs.vue"
import { useClientStore } from "@/stores/client"

const ImageUpload = defineAsyncComponent(() => import("@/components/shared/ImageUpload.vue"))
const DateTimePicker = defineAsyncComponent(() => import('@/components/shared/DateTimePicker.vue'))
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
const range = ref('')
const min = ref(0)
const max = ref(0)
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

.content-wrapper-header {
  @apply flex items-center w-full rounded-md py-5 px-6 space-x-8
}

.content-wrapper-header {
  background-image: url("https://www.transparenttextures.com/patterns/cubes.png"), linear-gradient(to right top, #cf4af3, #e73bd7, #f631bc, #fd31a2, #ff3a8b, #ff4b78, #ff5e68, #ff705c, #ff8c51, #ffaa49, #ffc848, #ffe652);

}

@media screen and (max-width: 415px) {
  .content-wrapper-header {
    @apply p-6
  }
}

.content-wrapper.overlay {
  @apply pointer-events-none transition-all bg-[var(--overlay-bg)]
}

.content-wrapper-context {
  @apply max-w-[350px]
}

.img-content {
  @apply font-semibold text-xl flex items-center pt-8
}

.img-content svg {
  @apply w-7 mr-4
}

.content-text {
  @apply text-sm font-thin mt-4 leading-5 text-[#ebecec] line-clamp-4 text-ellipsis
}

.content-button {
  @apply bg-[#3a6df0] border-0 py-2 px-6 text-white rounded-2xl mt-4 cursor-pointer transition-all whitespace-nowrap
}

.content-wrapper-img {
  @apply w-44 h-44 object-cover object-center
}

@media screen and (max-width: 570px) {
  .content-wrapper-img {
    @apply w-28
  }
}
</style>
