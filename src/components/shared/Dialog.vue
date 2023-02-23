<template>
    <div>
        <q-btn color="red" icon="schedule" icon-right="add" label="Add an appointment" class="full-width"
            @click="open = true" />
        <q-dialog ref="dialogRef" v-model="open" @hide="onDialogHide" class="min-w-[80rem]">
            <q-card class="q-dialog-plugin" style="width: 700px; max-width: 80vw;">

                <q-card-section>
                    <div class="text-h6">Your address</div>
                    <!-- <input dense v-model="input" autofocus @keyup.enter="onOKClick" /> -->

                    <div class="q-pa-md  ">


                        <div class="q-gutter-md row items-start flex-1">
                            <div>
                                <q-input filled v-model="startTime">
                                    <template v-slot:prepend>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="startTime" mask="YYYY-MM-DD HH:mm">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                                <q-date v-model="start" mask="YYYY-MM-DD HH:mm" color="purple" format24h range />
                                <vue-cal active-view="day" :disable-views="['years', 'year', 'month', 'week']"
                                    style="max-width: 450px;height: 350px" :hideTitleBar="true" small :time-from="10 * 60"
                                    :time-to="16 * 60" hide-view-selector editable-events
                                    @event-drag-create="showEventCreationDialog = true" />

                            </div>

                        </div>
                        {{ start }}
                    </div>
                </q-card-section>


                <q-card-actions align="right">
                    <q-btn color="primary" label="OK" @click="onOKClick" />
                    <q-btn color="primary" label="Cancel" @click="onCancelClick" />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>
</template>

<script setup lang="ts">
import { computed, ref, } from "vue"
import { useDialogPluginComponent } from 'quasar'


const props = defineProps<{
    start: string,
    end: string,
}>()

// const { onDialogOK, emits } = useDialogPluginComponent()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

//const emit = defineEmits<{
// ...emits,
// 'update:modalInput': (value: string) => void
//   ...emits
//}>()
const emit = defineEmits([
    "update:modalInput",
    "update:start",
    "update:end",
    ...useDialogPluginComponent.emits
])

const showEventCreationDialog = ref(false)

const startTime = computed({
    get() {
        return props.start
    },
    set(newValue) {
        emit("update:start", newValue)
    },
})

const start = ref([])
const endTime = computed({
    get() {
        return props.end
    },
    set(newValue) {
        emit("update:end", newValue)
    },
})

const open = ref(false)

// REQUIRED; need to specify some events that your
// component will emit through useDialogPluginComponent()


// REQUIRED; must be called inside of setup()
const address = ref('')
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*.../* }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome
const onOKClick = () => {
    // on OK, it is REQUIRED to
    // call onDialogOK (with optional payload)
    console.log("Address= ", useDialogPluginComponent.emits);
    // emit("ok")
    onDialogOK()
    // or with payload: onDialogOK({ ... })
    // ...and it will also hide the dialog automatically
}
const onCancelClick = onDialogCancel

</script>