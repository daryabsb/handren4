<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';
import { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'; // Prop type definitions can also be imported
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

const stars = ref(3)
const slide = ref(1)
const pdfSrc = ref<VuePdfPropsType['src']>('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf')
const numOfPages = ref(0)

// onMounted(() => {
//     const loadingTask = createLoadingTask(pdfSrc.value)
//     loadingTask.promise.then((pdf: PDFDocumentProxy) => {
//         numOfPages.value = pdf.numPages
//     })
// })


</script>

<template>
    <q-carousel transition-prev="slide-right" transition-next="slide-left" swipeable animated v-model="slide"
        control-color="primary" navigation-icon="radio_button_unchecked" navigation class=" w-[80vw] h-[80vh] ">
        <q-carousel-slide :name="1">
            <!-- <VuePdf :src="pdfSrc" :page="page" /> -->
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
        </q-carousel-slide>

    </q-carousel>
</template>