<template>
    <div class="absolute p-0 top-1 left-1 m-4 h-12 w-12 bg-transparent" style="margin: 0;">

        <q-fab class="z-0 opacity-80" v-model="fab1" color="primary" icon="camera" direction="right" padding="xs">
            <q-fab-action padding="xs" style="width:25px;height: 25px; margin: 0; margin-left: -10px; line-height: 1;"
                labelClass="px-2" type="button" color="green" @click="toggleImageXl" label="Xl" />
            <q-fab-action padding="xs" style="width:25px;height: 25px; margin: 0; line-height: 1;" labelClass="px-2"
                color="purple" @click="toggleImageLg" label="Lg" />
            <q-fab-action padding="xs" style="width:25px;height: 25px; margin: 0; line-height: 1;" labelClass="px-2"
                color="orange" @click="toggleImageMd" label="Md" />
            <q-fab-action padding="xs" style="width:25px;height: 25px; margin: 0; line-height: 1;" labelClass="px-2"
                color="red" @click="toggleImageSm" label="Sm" />
        </q-fab>
        <div>

            <my-upload class="fixed z-50" field="image" v-model="show" method="put" @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail" :width="width" :height="height" :url="uploadUrl" :headers="token"
                langType="en" img-format="jpg"></my-upload>

        </div>



    </div>
</template>
      
<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useUserStore } from "@/stores/user.js"

const baseUrl = ref('http://127.0.0.1:8000')
const userStore = useUserStore()
const token = userStore.useAuthHeader.headers


const MyUpload = defineAsyncComponent(() => import('vue-image-crop-upload'))
const props = defineProps<{
    url: string,
}>()
const emit = defineEmits(["updateImage"])

const uploadUrl = computed(() => `${baseUrl.value}${props.url}`)

const fab1 = ref(false)

// IMAGE UPLOAD PROPS
const show = ref(false)
const height = ref(200)
const width = ref(200)
const toggleImageUpdate = () => show.value = !show.value

const toggleImageXl = async () => {
    height.value = 800;
    width.value = 800;
    show.value = !show.value
}
const toggleImageLg = async () => {
    height.value = 700;
    width.value = 700;
    show.value = !show.value
}
const toggleImageMd = () => {
    height.value = 500;
    width.value = 500;
    show.value = !show.value
}
const toggleImageSm = () => {
    height.value = 300;
    width.value = 300;
    show.value = !show.value
}

const imgDataUrl = ref('') // the datebase64 url of created image

function toggleShow() {
    show.value = !show.value;
}
function cropUploadSuccess(jsonData: any, field: any) {
    console.log('-------- upload success --------');
    emit("updateImage", jsonData)
}
function cropUploadFail(status: string, field: any) {
    console.log('-------- upload fail --------');
    console.log(status);
    console.log('field: ' + field);
}
const langExt = ref({
    hint: 'Click or drag the file here to upload',
    loading: 'Uploading…',
    noSupported: 'Browser is not supported, please use IE10+ or other browsers',
    success: 'Upload success',
    fail: 'Upload failed',
    preview: 'Preview',
    btn: {
        off: 'Cancel',
        close: 'Close',
        back: 'Back',
        save: 'Save'
    },
    error: {
        onlyImg: 'Image only',
        outOfSize: 'Image exceeds size limit: ',
        lowestPx: 'Image\'s size is too low. Expected at least: '
    }
})
</script>

<style>
.q-fab__actions .q-btn {
    margin: 2px;
}
</style>