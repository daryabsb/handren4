<template>
    <div>
        <q-splitter v-model="splitterModel" style="height: 450px">

            <template v-slot:before>
                <div class="q-pa-md">
                    <q-date v-model="date" flat dark :events="events" text-color="white" color="accent"
                        event-color="orange" />
                </div>
            </template>

            <template v-slot:after>
                <q-tab-panels v-model="date" animated transition-prev="jump-up" transition-next="jump-up">
                    <q-tab-panel name="2019/02/01">
                        <div class="text-h4 q-mb-md">2019/02/01</div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa
                            fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa
                            fuga nulla ullam. In, libero.</p>
                    </q-tab-panel>

                    <q-tab-panel name="2019/02/05">
                        <div class="text-h4 q-mb-md">2019/02/05</div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa
                            fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa
                            fuga nulla ullam. In, libero.</p>
                    </q-tab-panel>

                    <q-tab-panel name="2019/02/06">
                        <div class="text-h4 q-mb-md">2019/02/06</div>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa
                            fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa
                            fuga nulla ullam. In, libero.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio
                            iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa
                            fuga nulla ullam. In, libero.</p>
                    </q-tab-panel>
                </q-tab-panels>
            </template>
        </q-splitter>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useFetchAppointments from '@/composables/useFetchAppointments'


const { data, error, fetchData } = useFetchAppointments({ viewForFetch, viewStartDate })
const events = computed(() => data.value)
const splitterModel = ref(50)
const date = ref('2019/02/01')
// const  = ['2019/02/01', '2019/02/05', '2019/02/06']

</script>
