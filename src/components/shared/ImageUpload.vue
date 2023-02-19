<template><!-- <vue-image-upload-crop :crop-size="{ width: 500, height: 500 }"></vue-image-upload-crop> -->

    <my-upload field="image" v-model="openUpload" method="put" @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" :width="400" :height="400"
        :url="uploadUrl" :headers="token" langType="en" img-format="jpg" @srcFileSet="handleFile"></my-upload>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useClientStore } from "@/stores/client.js";
import { useUserStore } from "@/stores/user.js"
import MyUpload from "vue-image-crop-upload"
const sizeOf = require("image-size");
// import myUpload from ;

const baseUrl = ref('http://127.0.0.1:8000')
const store = useClientStore()
const userStore = useUserStore()
const config = store.useConfig;
const token = userStore.useAuthHeader.headers


// const MyUpload = defineAsyncComponent(() => import('vue-image-crop-upload'))
const props = defineProps<{
    open: boolean,
    url: string,
}>()


const emit = defineEmits(["update:open", "updateImage"])

const uploadUrl = computed(() => `${baseUrl.value}${props.url}`)

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
const params = ref({
    token: '123456',
    name: 'img'
})
const headers = {
    Authorization: 'Token 2d23bf96d42cbc35673e9831b748ec99088a96bb'
}
const imageType = ref('png')
const imgDataUrl = ref('') // the datebase64 url of created image
function handleFile(fileName: string, fileType: string, fileSize: number) {
    console.log(sizeOf(fileName));

    params.value.name = fileName;
    imageType.value = fileType;
    // console.log("WHAT IS THIS:", fileName, fileType, fileSize);

};
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
    // imgDataUrl.value = imgData;

    // console.log(token);

}
/**
 * upload success
 * 
 *
 * [param] jsonData  server api return data, already json encode
 * [param] field
 */
function cropUploadSuccess(jsonData: any, field: any) {
    console.log('-------- upload success --------');
    // console.log(jsonData);
    // console.log('field: ' + field);
    openUpload.value = false
    emit("updateImage", jsonData)
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