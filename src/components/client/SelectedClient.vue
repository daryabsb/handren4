<template>
    <div class="container  overflow-auto" x-data="{ rightSide: false, leftSide: false }">


        <div class="main">
            <!-- <div class="search-bar">
                <input type="text" placeholder="Search" />
                <button class="right-side-button" @click="rightSide = !rightSide">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                        stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
            </div> -->
            <div class="main-container">
                <div v-if="client" class="profile">
                    <div class="profile-avatar absolute flex items-center z-[1] bottom-4 left-8">
                        <img :src="client.image" alt=""
                            class="profile-image z-[3] w-32 h-32 rounded-full object-cover border border-[var(--bg-color)]">
                        <div class="profile-name">{{ client.name }}</div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                        alt="" class="profile-cover">
                    <div
                        class="profile-menu z-[2] row absolute bottom-0 pl-52 bg-[var(--theme-bg-color)] w-full rounded-t-sm">
                        <q-tabs dense v-model="profileTab">
                            <q-tab name="timeline" label="TimeLine" />
                            <q-tab name="about" label="About" />
                            <q-tab name="friends" label="Friends" />
                            <q-tab name="photos" label="Photos" />
                            <q-tab name="more" label="More" />
                        </q-tabs>

                    </div>
                </div>
                <div class="timeline">
                    <!--  <div class="timeline-left">
                       <div class="box p-4">
                            <div class="row justify-between items-center pb-2">
                                <h2 class="text-xl font-thin">Introduction</h2>

                                <button class="bg-[var(--button)]"></button>
                            </div>
                            <div class="text-sm space-y-2">
                                <div class="row items-center text-[var(--theme-color)]">
                                    <svg class="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 503.889 503.889" fill="currentColor">
                                        <path
                                            d="M453.727 114.266H345.151V70.515c0-20.832-16.948-37.779-37.78-37.779H196.517c-20.832 0-37.78 16.947-37.78 37.779v43.751H50.162C22.502 114.266 0 136.769 0 164.428v256.563c0 27.659 22.502 50.161 50.162 50.161h403.565c27.659 0 50.162-22.502 50.162-50.161V164.428c0-27.659-22.503-50.162-50.162-50.162zm-262.99-43.751a5.786 5.786 0 015.78-5.779h110.854a5.786 5.786 0 015.78 5.779v43.751H190.737zM32 164.428c0-10.015 8.147-18.162 18.162-18.162h403.565c10.014 0 18.162 8.147 18.162 18.162v23.681c0 22.212-14.894 42.061-36.22 48.27l-167.345 48.723a58.482 58.482 0 01-32.76 0L68.22 236.378C46.894 230.169 32 210.321 32 188.109zm421.727 274.725H50.162c-10.014 0-18.162-8.147-18.162-18.161V253.258c8.063 6.232 17.254 10.927 27.274 13.845 184.859 53.822 175.358 52.341 192.67 52.341 17.541 0 7.595 1.544 192.67-52.341 10.021-2.918 19.212-7.613 27.274-13.845v167.733c.001 10.014-8.147 18.162-18.161 18.162z" />
                                    </svg>
                                    <span>Product Designer at <a href="#">Bravebist</a></span>
                                </div>
                                <div class="row items-center text-[var(--theme-color)]">
                                    <svg class="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" viewBox="0 0 24 24">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                        <path d="M9 22V12h6v10" />
                                    </svg>
                                    Live in <a href="#">Hanoi, Vietnam</a>
                                </div>
                                <div class="row items-center text-[var(--theme-color)]">
                                    <svg class="w-4 h-4 mr-3" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor">
                                        <path
                                            d="M437 75C388.7 26.6 324.4 0 256 0S123.3 26.6 75 75C26.6 123.3 0 187.6 0 256s26.6 132.7 75 181c48.3 48.4 112.6 75 181 75s132.7-26.6 181-75c48.4-48.3 75-112.6 75-181s-26.6-132.7-75-181zM252.4 481.9c-52-.9-103.7-19.5-145.2-55.8L256 277.2l21.7 21.8a165.9 165.9 0 00-35.7 87c-3.5 30.5 0 63.3 10.4 95.9zM299 320.3l105.7 105.8a224.8 224.8 0 01-121.3 54.1C262 419.5 268 360.3 299 320.3zm21.2-21.2c40-31 99.2-37 160-15.6A224.8 224.8 0 01426 404.8zM482 252.4a231.7 231.7 0 00-96-10.4 165.9 165.9 0 00-87 35.7L277.3 256l148.9-148.8c36.3 41.5 55 93.2 55.8 145.2zm-290.2-39.5c-40 31-99.2 37-160 15.6A224.8 224.8 0 0186 107.2zm-84.5-127a224.8 224.8 0 01121.3-54.1C250 92.5 244 151.7 213 191.7zM270 126c3.5-30.5 0-63.3-10.4-95.9 52 .9 103.7 19.5 145.2 55.8L256 234.8 234.3 213a165.9 165.9 0 0035.7-87zM30 259.6a242 242 0 0072.7 11.7c7.8 0 15.6-.5 23.2-1.3a165.9 165.9 0 0087-35.7l21.8 21.7L85.9 404.8a225.3 225.3 0 01-55.8-145.2z" />
                                    </svg>
                                    Player name <a href="#">Quan Ha</a>
                                </div>
                            </div>
                        </div> 
                        <div class="event box">
                            <div class="event-wrapper">
                                <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                                    class="event-img" />
                                <div class="event-date">
                                    <div class="event-month">Jan</div>
                                    <div class="event-day">01</div>
                                </div>
                                <div class="event-title">Winter Wonderland</div>
                                <div class="event-subtitle">01st Jan, 2019 07:00AM</div>
                            </div>
                        </div>
                         <div class="pages box">
                            <div class="intro-title">
                                Your pages
                                <button class="intro-menu"></button>
                            </div>
                            <div class="user">
                                <img src="https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0f"
                                    alt="" class="user-img">
                                <div class="username">Chandelio</div>
                            </div>
                            <div class="user">
                                <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=d5849d81af587a09dbcf3f11f6fa122f"
                                    alt="" class="user-img">
                                <div class="username">Janet Jolie</div>
                            </div>
                            <div class="user">
                                <img src="https://images.unsplash.com/photo-1546539782-6fc531453083?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                    alt="" class="user-img">
                                <div class="username">Patrick Watsons</div>
                            </div>
                        </div>
                    </div> -->
                    <div class="timeline-right h-[30rem]  overflow-auto">
                        <div class="box">
                            <div class="status-menu">
                                <a class="status-menu-item active" href="#">Status</a>
                                <a class="status-menu-item" href="#">Photos</a>
                                <a class="status-menu-item" href="#">Videos</a>
                            </div>
                            <div class="status-main">
                                <img src="https://images.genius.com/2326b69829d58232a2521f09333da1b3.1000x1000x1.jpg"
                                    class="status-img">
                                <textarea class="status-textarea" placeholder="Write something to Quan Ha.."></textarea>
                            </div>
                            <div class="status-actions">
                                <a href="#" class="status-action">
                                    <svg viewBox="-42 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M333.7 123.3c0 33.9-12.2 63.2-36.2 87.2-24 24-53.3 36.1-87.1 36.1h-.1c-33.9 0-63.2-12.1-87.1-36.1-24-24-36.2-53.3-36.2-87.2 0-33.9 12.2-63.2 36.2-87.2 24-24 53.2-36 87-36.1h.2c33.8 0 63.2 12.2 87.1 36.1 24 24 36.2 53.3 36.2 87.2zm0 0"
                                            fill="#ffbb85" />
                                        <path
                                            d="M427.2 424c0 26.7-8.5 48.3-25.3 64.3-16.5 15.7-38.4 23.7-65 23.7H90.2c-26.6 0-48.5-8-65-23.7C8.5 472.3 0 450.7 0 423.9c0-10.2.3-20.4 1-30.2a302.7 302.7 0 0112.1-64.9c3.3-10.3 7.8-20.5 13.4-30.3 5.8-10.2 12.5-19 20.1-26.3a89 89 0 0129-18.2c11.2-4.4 23.7-6.7 37-6.7 5.2 0 10.3 2.2 20 8.5l21 13.5c6.6 4.3 15.7 8.3 27 11.9a107.7 107.7 0 0033 5.3c11 0 22-1.8 33-5.3 11.2-3.6 20.3-7.6 27-12l21-13.4c9.7-6.3 14.7-8.5 20-8.5 13.3 0 25.7 2.3 37 6.7a89 89 0 0128.9 18.2c7.6 7.3 14.4 16.1 20.2 26.3 5.5 9.8 10 20 13.3 30.3a305.5 305.5 0 0112.1 64.9c.7 9.8 1 20 1 30.2zm0 0"
                                            fill="#6aa9ff" />
                                        <path
                                            d="M210.4 246.6h-.1V0c34 0 63.3 12.2 87.2 36.1 24 24 36.2 53.3 36.2 87.2 0 33.9-12.2 63.2-36.2 87.2-24 24-53.3 36.1-87.1 36.1zm0 0"
                                            fill="#f5a86c" />
                                        <path
                                            d="M427.2 424c0 26.7-8.5 48.3-25.3 64.3-16.5 15.7-38.4 23.7-65 23.7H210.2V286.5h3.3c11 0 22-1.8 33-5.3 11.2-3.6 20.3-7.6 27-12l21-13.4c9.7-6.3 14.7-8.5 20-8.5 13.3 0 25.7 2.3 37 6.7a89 89 0 0128.9 18.2c7.6 7.3 14.4 16.1 20.2 26.3 5.5 9.8 10 20 13.3 30.3a305.5 305.5 0 0112.1 64.9c.7 9.8 1 20 1 30.2zm0 0"
                                            fill="#2682ff" />
                                    </svg>
                                    People
                                </a>
                                <a href="#" class="status-action">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path
                                            d="M87.084 192c-.456-5.272-.688-10.6-.688-16C86.404 78.8 162.34 0 256.004 0s169.6 78.8 169.6 176c0 5.392-.232 10.728-.688 16h.688c0 96.184-169.6 320-169.6 320s-169.6-223.288-169.6-320h.68zm168.92 32c36.392 1.024 66.744-27.608 67.84-64-1.096-36.392-31.448-65.024-67.84-64-36.392-1.024-66.744 27.608-67.84 64 1.096 36.392 31.448 65.024 67.84 64z"
                                            fill="#e21b1b" />
                                    </svg>
                                    Check in
                                </a>
                                <a href="#" class="status-action">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <circle cx="256" cy="256" r="256" fill="#ffca28" />
                                        <g fill="#6d4c41">
                                            <path
                                                d="M399.68 208.32c-8.832 0-16-7.168-16-16 0-17.632-14.336-32-32-32s-32 14.368-32 32c0 8.832-7.168 16-16 16s-16-7.168-16-16c0-35.296 28.704-64 64-64s64 28.704 64 64c0 8.864-7.168 16-16 16zM207.68 208.32c-8.832 0-16-7.168-16-16 0-17.632-14.368-32-32-32s-32 14.368-32 32c0 8.832-7.168 16-16 16s-16-7.168-16-16c0-35.296 28.704-64 64-64s64 28.704 64 64c0 8.864-7.168 16-16 16z" />
                                        </g>
                                        <path
                                            d="M437.696 294.688c-3.04-4-7.744-6.368-12.736-6.368H86.4c-5.024 0-9.728 2.336-12.736 6.336-3.072 4.032-4.032 9.184-2.688 14.016C94.112 390.88 170.08 448.32 255.648 448.32s161.536-57.44 184.672-139.648c1.376-4.832.416-9.984-2.624-13.984z"
                                            fill="#fafafa" />
                                    </svg>
                                    Mood
                                </a>
                                <button class="status-share">Share</button>
                            </div>
                        </div>
                        <div class="album box">
                            <div class="status-main">
                                <img src="https://images.genius.com/2326b69829d58232a2521f09333da1b3.1000x1000x1.jpg"
                                    class="status-img" />
                                <div class="album-detail">
                                    <div class="album-title"><strong>Quan Ha</strong> create new <span>album</span></div>
                                    <div class="album-date">6 hours ago</div>
                                </div>
                                <button class="intro-menu"></button>
                            </div>
                            <div class="album-content">When the bass drops, so do my problems.
                                <div class="album-photos">
                                    <img src="https://images.unsplash.com/photo-1508179719682-dbc62681c355?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80"
                                        alt="" class="album-photo" />
                                    <div class="album-right">
                                        <img src="https://images.unsplash.com/photo-1502872364588-894d7d6ddfab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                                            alt="" class="album-photo" />
                                        <img src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                                            alt="" class="album-photo" />
                                    </div>
                                </div>
                            </div>
                            <div class="album-actions">
                                <a href="#" class="album-action">
                                    <svg stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round" viewBox="0 0 24 24">
                                        <path
                                            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                    </svg>
                                    87
                                </a>
                                <a href="#" class="album-action">
                                    <svg stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round" class="css-i6dzq1" viewBox="0 0 24 24">
                                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                    </svg>
                                    20
                                </a>
                                <a href="#" class="album-action">
                                    <svg stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round" class="css-i6dzq1" viewBox="0 0 24 24">
                                        <path d="M17 1l4 4-4 4" />
                                        <path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" />
                                        <path d="M21 13v2a4 4 0 01-4 4H3" />
                                    </svg>
                                    13
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="overlay" @click="rightSide = false; leftSide = false" :class="{ 'active': rightSide || leftSide }">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted, watch } from "vue"

import { Client } from "@/composables/interfaces";

import fetchClientAppointmentsData from "../../composables/useFetchAppointmentDetail"
import fetchClientData from "../../composables/useFetchClientDetails"

const props = defineProps<{
    clientId: number
}>()

const rightSide = ref(true)
const leftSide = ref(true)
const profileTab = ref('timeline')

const client = ref<Client | null>(null)
const status = ref<any | null>(null)
const examination = ref(null)
const attachments = ref([])
const details = ref(null)

onMounted(fetchClient);
const id = computed(() => props.clientId)
async function fetchClient() {
    const { client: clientData, status: statusData, attachments: attachmentsData, examination: examinationData, details: detailsData } = await fetchClientData(id.value);
    client.value = clientData;
    status.value = statusData;
    examination.value = examinationData;
    attachments.value = attachmentsData;
    details.value = detailsData;
}
watch(id, fetchClient)
















</script>

<style lang="scss">
.main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #181d2f;
}

.search-bar {
    height: 40px;
    background-color: var(--bg-color);
    z-index: 3;
    position: relative;

    input {
        height: 100%;
        width: 100%;
        display: block;
        background-color: transparent;
        border: none;
        padding: 0 54px;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3e%3cpath d='M508.9 478.7L360 330a201.6 201.6 0 0045.2-127.3C405.3 90.9 314.4 0 202.7 0S0 91 0 202.7s91 202.6 202.7 202.6c48.2 0 92.4-17 127.3-45.2L478.7 509c4.2 4.1 11 4.1 15 0l15.2-15.1c4.1-4.2 4.1-11 0-15zm-306.2-116c-88.3 0-160-71.8-160-160s71.7-160 160-160 160 71.7 160 160-71.8 160-160 160z' data-original='%23000000' class='active-path' data-old_color='%23000000' fill='%235C5D71'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-size: 16px;
        background-position: 25px 50%;
        color: #fff;
        font-family: var(--body-font);
        font-weight: 600;

        &::placeholder {
            color: #5c5d71;
        }
    }
}

.main-container {
    @apply p-2 flex-1 overflow-auto bg-[#24273b]
}



.profile {
    // position: relative;
    // height: 5vh;
    // min-height: 150px;
    // max-height: 350px;
    // z-index: 1;

    &-cover {}

    .profile:before {}
}

.profile {
    @apply relative h-32 min-h-[150px] max-h-[350px] z-[1]
}

.profile-cover {
    @apply absolute top-0 left-0 w-full h-full object-cover object-center rounded-sm
}

.profile:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    background-image: url("https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(50px);
    opacity: 0.7;
}




.profile-name {
    @apply ml-6 pb-6 text-xl text-white font-semibold
}



.timeline {
    @apply flex pt-2 relative z-[2]
}

.timeline-left {
    @apply w-72 flex-shrink-0
}

.timeline-right {
    @apply flex-1 pl-2
}

// @media screen and (max-width: 768px) {
//     .timeline {
//         @apply flex-wrap flex-col-reverse
//     }

//     .timeline-right {
//         @apply pl-0 mb-4 padding-left: 0;

//     }

//     .timeline-left {
//         @apply w-full
//     }
// }

.album-content {
    padding: 0 20px 20px;
}

.album {
    padding-top: 20px;
    margin-top: 20px;

    .status-main {
        border: none;
        display: flex;
    }

    .intro-menu {
        margin-bottom: auto;
        margin-top: 5px;
    }
}

.album-detail {
    width: calc(100% - 110px);
}

.album-title span {
    color: #1771d6;
    cursor: pointer;
}

.album-date {
    font-size: 15px;
    color: #595c6c;
    margin-top: 4px;
}

.album-content {
    padding: 0 20px 20px;
}

.album-photo {
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
    margin-top: 10px;
}

.album-photos {
    display: flex;
    margin-top: 20px;
    max-height: 30vh;
}

.album-photos>.album-photo {
    width: 50%;
}

.album-right {
    width: 50%;
    margin-left: 10px;
    line-height: 0;
    display: flex;
    flex-direction: column;

    .album-photo {
        height: calc(50% - 10px);
    }
}

.album-actions {
    padding: 0 20px 20px;
}

.album-action {
    margin-right: 20px;
    text-decoration: none;
    color: #a2a4b4;
    display: inline-flex;
    align-items: center;
    font-weight: 600;

    &:hover {
        color: #fff;
    }

    svg {
        width: 16px;
        margin-right: 6px;
    }
}

.box {
    @apply bg-[var(--bg-color)] rounded-sm
}




.event {
    position: relative;
    margin-top: 20px;
    padding: 10px;
}

.event-wrapper {
    position: relative;
}

.event-img {
    max-width: 100%;
    display: block;
    padding-bottom: 12px;
}

.event-date {
    position: absolute;
    left: 20px;
    top: 15px;
}

.event-month {
    background-color: #1687fa;
    padding: 7px 20px;
    font-weight: 600;
    font-family: var(--title-font);
    color: #fff;
    text-align: center;
    border-radius: 4px 4px 0 0;
}

.event-day {
    width: 100%;
    backdrop-filter: blur(4px);
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    font-family: var(--title-font);
    background-color: rgba(0, 0, 0, 0.4);
    padding: 6px 0;
    text-align: center;
}

.event-title {
    color: #c3c5d5;
    margin-bottom: 5px;
    font-family: var(--title-font);
    font-weight: 600;
    padding: 0 14px;
}

.event-subtitle {
    color: var(--side-title);
    font-family: var(--title-font);
    font-size: 13px;
    font-weight: 500;
    padding: 0 14px;
}

.pages {
    margin-top: 20px;
    padding: 20px;
}

.user {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.user+.user {
    margin-top: 18px;
}

.user-img {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    margin-right: 15px;
    object-fit: cover;
    object-position: center;
}

.username {
    font-size: 15px;
    font-family: var(--title-font);
}


.status-menu {
    @apply p-3 flex items-center
}

.status-menu-item {
    @apply decoration-transparent text-[#ccc8db] py-2 px-3 leading-3 font-semibold rounded-md
}

.status-menu-item.active,
.status-menu-item:hover {
    @apply bg-[#2e2e40] text-white
}

.status-menu-item+.status-menu-item {
    @apply ml-3
}

@media screen and (max-width: 500px) {
    .status-menu {
        font-size: 14px;
    }

    .status-menu-item+.status-menu-item {
        margin-left: 0;
    }
}

.status-img {
    @apply w-10 h-10 object-cover rounded-full mr-4
}

.status-main {
    @apply px-4 flex items-center border-b border-[var(--border-color)] flex-wrap
}

.status-textarea {
    @apply flex-1 bg-transparent mt-3 text-white border-0 resize-none max-w-[calc(100%-70px)]
}

.status-textarea::placeholder {
    @apply text-[#5c5d71]
}

.status-actions {
    @apply flex py-1 px-4
}

.status-action {
    @apply decoration-transparent text-[#ccc8db] mr-5 flex items-center
}

.status-action svg {
    width: 16px;
    flex-shrink: 0;
    margin-right: 8px;
}

@media screen and (max-width: 1320px) {
    .status-action {
        width: 16px;
        overflow: hidden;
        color: transparent;
        white-space: nowrap;
    }
}

.status-share {
    background-color: #1b86f9;
    border: none;
    color: #fff;
    border-radius: 4px;
    padding: 10px 20px;
    margin-left: auto;
    box-shadow: 0 0 20px #1b86f9;
    cursor: pointer;
}
</style>