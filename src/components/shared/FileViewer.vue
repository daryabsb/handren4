<template>
    <!-- <q-btn label="Carousel" color="primary" @click="imagesDialogue = true" />
        <q-btn label="Card" color="primary" @click="card = true" />
        <q-btn label="Sliders" color="primary" @click="sliders = true" /> -->
    <div class="album-actions">
        <button href="#" class="album-action" @click="toggleImages">
            <q-icon name="images" outline size="18px" />
            {{ images.length }}
        </button>
        <button v-if="pdfs" href="#" class="album-action" @click="togglePdfs">
            <q-icon name="attachments" outline size="18px" />


            {{ pdfs.length }}

        </button>

        <div class="q-pa-md q-gutter-sm">
            <q-dialog v-model="openImages">
                <q-carousel v-if="images.length > 0" transition-prev="slide-right" transition-next="slide-left" swipeable
                    animated v-model="slide" control-color="primary" navigation-icon="radio_button_unchecked" navigation
                    class="bg-white z-50 w-[80vw] h-[450px] shadow-1 rounded-borders">
                    <q-carousel-slide v-for="image in images" :key="image.id" :name="image.id">
                        <q-img class="w-full h-full object-cover" :src="image.file" />

                        <!-- <div class="q-mt-md text-center">
                        {{ lorem }}
                    </div> -->
                    </q-carousel-slide>
                </q-carousel>
                <div class="w-[80vw] h-[450px] shadow-1 rounded-borders" v-else> THERE IS NO IMAGES AMONG THE ATTACHMENTS
                </div>
            </q-dialog>
            <q-dialog v-model="openPdfs">
                <!-- <q-carousel-slide v-for="file in pdfs" :key="file.id" :name="file.id"> -->
                <!-- <iframe src="http://127.0.0.1:8000/media/upload_files/JABAL_BAZYAN_EJARI_1.pdf" height="1200"
                        width="800"></iframe> -->
                <OpenPdf />
                <!-- </q-carousel-slide> -->
                <!-- <vue-pdf-app style="height: 100vh;"
                    pdf="https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf"></vue-pdf-app> -->
            </q-dialog>

            <q-dialog v-model="card">
                <q-card class="my-card">
                    <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

                    <q-card-section>
                        <q-btn fab color="primary" icon="place" class="absolute"
                            style="top: 0; right: 12px; transform: translateY(-50%);" />

                        <div class="row no-wrap items-center">
                            <div class="col text-h6 ellipsis">
                                Cafe Basilico
                            </div>
                            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                                <q-icon name="place" />
                                250 ft
                            </div>
                        </div>

                        <q-rating v-model="stars" :max="5" size="32px" />
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-subtitle1">
                            $・Italian, Cafe
                        </div>
                        <div class="text-caption text-grey">
                            Small plates, salads & sandwiches in an intimate setting.
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions align="right">
                        <q-btn v-close-popup flat color="primary" label="Reserve" />
                        <q-btn v-close-popup flat color="primary" round icon="event" />
                    </q-card-actions>
                </q-card>
            </q-dialog>

            <q-dialog v-model="sliders">
                <q-card style="width: 300px" class="q-px-sm q-pb-md">
                    <q-card-section>
                        <div class="text-h6">Volumes</div>
                    </q-card-section>

                    <q-item-label header>Media volume</q-item-label>
                    <q-item dense>
                        <q-item-section avatar>
                            <q-icon name="volume_up" />
                        </q-item-section>
                        <q-item-section>
                            <q-slider color="teal" v-model="slideVol" :step="0" />
                        </q-item-section>
                    </q-item>

                    <q-item-label header>Alarm volume</q-item-label>
                    <q-item dense>
                        <q-item-section avatar>
                            <q-icon name="alarm" />
                        </q-item-section>
                        <q-item-section>
                            <q-slider color="teal" v-model="slideAlarm" :step="0" />
                        </q-item-section>
                    </q-item>

                    <q-item-label header>Ring volume</q-item-label>
                    <q-item dense>
                        <q-item-section avatar>
                            <q-icon name="vibration" />
                        </q-item-section>
                        <q-item-section>
                            <q-slider color="teal" v-model="slideVibration" :step="0" />
                        </q-item-section>
                    </q-item>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Attachment } from "@/composables/interfaces"
import useAttachments from '@/composables/useAttachments';
import OpenPdf from './OpenPdf.vue';

interface Props {
    files: Attachment[]
}

const props = withDefaults(defineProps<Props>(), {})

// const emit = defineEmits<{
//     (e: 'update:openImages', value: boolean): void,
//     (e: 'update:openPdfs', value: boolean): void
// }>()


const { attachmentLists, uploadAttachment } = useAttachments(props.files);

const images = computed(() => attachmentLists.value.images.attachments)
const pdfs = computed(() => attachmentLists.value.pdfs.attachments)


// const pdfRef = ref()
// const isLoading = ref(true)
// const page = ref()
// const pageCount = ref(1)
// const pdfSource = ref('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf')
// const showAllPages = ref(true)

// watch(showAllPages, () => {

//     page.value = showAllPages.value ? null : 1

// })
// function handleDocumentRender(args: any) {
//     console.log(args)
//     isLoading.value = false
//     pageCount.value = pdfRef.value.pageCount
// }
// function handlePasswordRequest(callback: any, retry: boolean) {
//     callback(prompt(retry ? 'Enter password again' : 'Enter password'))
// }



const openImages = ref(false)
const openPdfs = ref(false)
const openOthers = ref(false)
const toggleImages = () => openImages.value = !openImages.value;
const togglePdfs = () => openPdfs.value = !openPdfs.value;
const toggleOthers = () => openOthers.value = !openOthers.value;


const carousel = ref(false)
const card = ref(false)
const sliders = ref(false)

const slide = ref(1)
const fileSlide = ref(1)
const lorem = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!'

const stars = ref(3)

const slideVol = ref(39)
const slideAlarm = ref(56)
const slideVibration = ref(63)

// COOK THE PDF HERE
function loadPdf(file: string) {
    // const { pdf, pages } = usePDF(file);

    return file
}

</script>