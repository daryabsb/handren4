<template>
    <q-dialog v-model="openUpload">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Close icon</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <my-upload v-model="show" field="image_data" @crop-success="cropSuccess"
                    @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" :width="300" :height="300"
                    :url="uploadUrl" method="PUT" :params="params" :value="true" :headers="headers" langType="en"
                    :langExt="langExt" img-format="jpg"></my-upload>
                <img :src="imgDataUrl">
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useClientStore } from "@/stores/client.js";
import { useUserStore } from "@/stores/user.js"
// import myUpload from ;

const baseUrl = ref('http://127.0.0.1:8000')
const store = useClientStore()
const userStore = useUserStore()
const config = store.useConfig;
const token = userStore.useAuthHeader.headers


const MyUpload = defineAsyncComponent(() => import('vue-image-crop-upload'))
const props = defineProps<{
    open: boolean,
    url: string,
}>()


const emit = defineEmits(["update:open"])

const uploadUrl = computed(() => `${baseUrl.value}${props.url}`)
console.log(uploadUrl.value);

const openUpload = computed({
    get() {
        return props.open
    },
    set(newValue) {
        emit("update:open", newValue)
    },
})

// IMAGE UPLOAD PROPS
const show = ref(true)
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
const params = ref({
    token: '123456',
    name: 'img'
})
const headers = {
    Authorization: 'Token 2d23bf96d42cbc35673e9831b748ec99088a96bb',
    'Content-type': "application/x-www-form-urlencoded"

}
const imgDataUrl = ref('') // the datebase64 url of created image

function toggleShow() {
    show.value = !show.value;
}
/**
 * crop success
 *
 * [param] imgDataUrl
 * [param] field
 */
function cropSuccess(imgData: string, field: any) {
    console.log('-------- crop success --------');
    imgDataUrl.value = imgData;
    console.log(imgDataUrl.value);

}
/**
 * upload success
 *
 * [param] jsonData  server api return data, already json encode
 * [param] field
 */
function cropUploadSuccess(jsonData: any, field: any) {
    console.log('-------- upload success --------');
    console.log(jsonData);
    console.log('field: ' + field);
}
/**
 * upload fail
 *
 * [param] status    server api return error status, like 500
 * [param] field
 */
function cropUploadFail(status: string, field: any) {
    console.log('-------- upload fail --------');
    console.log(status);
    console.log('field: ' + field);
}



</script>