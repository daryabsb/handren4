<template>

    <div class="q-pt-sm full-width">
        <q-input v-model="formattedDate">
            <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formattedDate" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                        </q-date>
                    </q-popup-proxy>
                </q-icon>
            </template>

            <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="formattedDate" mask="YYYY-MM-DD HH:mm" format24h>
                            <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                        </q-time>
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
        <q-btn label="Change Date" color="primary" @click="open = true" />
        <Dialog v-model="open" />

    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue'
import { useQuasar, useDialogPluginComponent } from "quasar"
import Dialog from "./Dialog.vue"
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const datePrompt = ref(false)
const open = ref(false)
const filters = inject("filters")
const date = ref(new Date())

const formattedDate = computed({
    get() {
        return filters.dateTimeMoment(date.value)
    },
    set(newDate) {
        date.value = newDate

    }
});
const onCancelClick = () => console.log(dialogRef.value.hide())
const onOKClick = () => onDialogOK()




</script>
