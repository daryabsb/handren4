<template>
    <div class="bg-white">
        <div class="mx-auto max-w-7xl py-12 px-12 text-center lg:px-8 lg:py-16">
            <div class="space-y-6 sm:space-y-8 ">
                <div class="space-y-2 sm:mx-auto sm:max-w-xl sm:space-y-1 lg:max-w-5xl">
                    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Clients</h2>
                    <!-- <p class="text-xl text-gray-500">Risus velit condimentum vitae tincidunt tincidunt. Mauris ridiculus
                                                                                                                                                            fusce amet urna nunc. Ut nisl ornare diam in.</p> -->
                </div>
                <ul role="list"
                    class="mx-auto h-[32rem] overflow-y-auto grid  grid-cols-2 gap-x-1 gap-y-2 sm:grid-cols-5 md:gap-x-2 lg:max-w-6xl lg:gap-x-4 lg:gap-y-2">

                    <q-card v-for="person in people" :key="person.id" class="my-card -z-1" flat bordered>
                        <q-card-section horizontal>

                            <q-img class="col h-40 object-center" :src="person.image">
                                <div class="absolute-bottom text-subtitle2 text-center backdrop-blur-sm cursor-pointer"
                                    style="padding-block: .3em;" @click="navigateToClientDetails(+person.id)">

                                    {{ person.name }}

                                </div>
                            </q-img>

                            <q-card-actions vertical class="justify-around">
                                <q-btn flat round color="red" icon="favorite" />
                                <q-btn flat round color="accent" icon="visibility" @click="toggleQuickView(+person.id)" />
                                <q-btn flat round color="primary" icon="open_in_new"
                                    @click="navigateToClientDetails(+person.id)" />
                            </q-card-actions>
                        </q-card-section>
                        <ImageUpload :url="`/clients/${person.id}/image/`" @update-image="updateClient" />
                    </q-card>
                </ul>
            </div>
            <div class="w-full mt-4 ">
                <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 pt-3 py-1 sm:px-6"
                    aria-label="Pagination">
                    <div class="block">
                        <p class="text-sm text-gray-700">
                            Showing
                            {{ ' ' }}
                            <span class="font-medium">{{ startIndex + 1 }}</span>
                            {{ ' ' }}
                            to
                            {{ ' ' }}
                            <span class="font-medium">{{ endIndex }}</span>
                            {{ ' ' }}
                            of
                            {{ ' ' }}
                            <span class="font-medium">{{ peopleCount }}</span>
                            {{ ' ' }}
                            results
                        </p>
                    </div>
                    <div class="flex flex-1 justify-between sm:justify-end">
                        <button
                            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            @click.prevent="changePage('prev')">Previous</button>
                        <button
                            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            @click.prevent="changePage('next')">Next</button>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, Ref, watchEffect, inject, defineAsyncComponent } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import { useClientStore } from "../../stores/client"

const ImageUpload = defineAsyncComponent(() => import('@/components/shared/ImageUpload.vue'))

const store = useClientStore()
const clients = store.useClients
const router = useRouter()

const people = ref([])
const peopleCount = ref(0)
const page = ref(1)
const pageSize = ref(15)

function updateClient(jsonData) {
    const index = people.value.findIndex(person => person.id === jsonData.id)
    // console.log("success call", jsonData)
    people.value[index].image = jsonData.image;
}

const startIndex = computed(() => +(page.value - 1) * pageSize.value);
const endIndex = computed(() => {
    const end = +startIndex.value + +pageSize.value;
    return end > peopleCount.value ? peopleCount.value : end;
});


const totalPages = computed(() => Math.ceil(peopleCount.value / pageSize.value))
const { open, toggleQuickView } = inject("quickview")

const navigateToClientDetails = (id: number) => {
    router.push(`/clients/${id}`)
    // toggleQuickView()
}

const maxPage = computed(() => {
    return peopleCount.value % pageSize.value < people.value.length
})

const fetchPeople = async () => {
    const url = `http://127.0.0.1:8000/clients/clients/?page_size=${pageSize.value}&page=${page.value}`
    const res = await axios.get(url, store.useConfig)
    people.value = res.data.results
    peopleCount.value = res.data.count
}
watchEffect(fetchPeople)

const changePage = (direction: string) => {
    if (direction === 'next' && maxPage.value) {
        page.value++
    } else if (direction === 'prev' && page.value > 1) {
        page.value--
    }
}


</script>