<!--
This example requires some changes to your config:

```
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
  ],
}
```
-->
<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="toggleQuickView">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                    <!-- This element is to trick the browser into centering the modal contents. -->
                    <span class="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">&#8203;</span>
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 md:scale-100"
                        leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
                        <DialogPanel
                            class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                            <div
                                class="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                <button type="button"
                                    class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                    @click="toggleQuickView">
                                    <span class="sr-only">Close</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                                <Suspense>
                                    <div v-if="client"
                                        class="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                                        <div
                                            class="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                            <img :src="client.image" :alt="client.name"
                                                class="object-cover object-center" />
                                        </div>
                                        <div class="sm:col-span-8 lg:col-span-7">
                                            <h2 class="text-xl font-medium text-gray-900 sm:pr-12">
                                                {{ client.name }}
                                            </h2>

                                            <section aria-labelledby="information-heading" class="mt-1">
                                                <h3 id="information-heading" class="sr-only">
                                                    Product information
                                                </h3>

                                                <p class="font-medium text-gray-900 capitalize">
                                                    {{ client.age }} - {{ client.gender }}
                                                </p>

                                                <!-- Reviews -->
                                                <div class="mt-4">
                                                    <h4 class="sr-only">Reviews</h4>
                                                    <div class="flex items-center">
                                                        <p class="text-sm text-gray-700">
                                                            {{ product.rating }}
                                                            <span class="sr-only"> out of 5 stars</span>
                                                        </p>
                                                        <div class="ml-1 flex items-center">
                                                            <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                                                :class="[
                                                                    product.rating > rating
                                                                        ? 'text-yellow-400'
                                                                        : 'text-gray-200',
                                                                    'h-5 w-5 flex-shrink-0',
                                                                ]" aria-hidden="true" />
                                                        </div>
                                                        <div class="ml-4 hidden lg:flex lg:items-center">
                                                            <span class="text-gray-300" aria-hidden="true">&middot;</span>
                                                            <a href="#"
                                                                class="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">See
                                                                all {{ product.reviewCount }} reviews</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section aria-labelledby="options-heading" class="mt-8">
                                                <h3 id="options-heading" class="sr-only">
                                                    Product options
                                                </h3>

                                                <form>
                                                    <!-- Color picker -->
                                                    <div>
                                                        <h4 class="text-sm font-medium text-gray-900">
                                                            Color
                                                        </h4>

                                                        <RadioGroup v-model="selectedColor" class="mt-2">
                                                            <RadioGroupLabel class="sr-only">
                                                                Choose a color
                                                            </RadioGroupLabel>
                                                            <div class="flex items-center space-x-3">
                                                                <RadioGroupOption as="template"
                                                                    v-for="color in product.colors" :key="color.name"
                                                                    :value="color" v-slot="{ active, checked }">
                                                                    <div :class="[
                                                                        color.selectedColor,
                                                                        active && checked
                                                                            ? 'ring ring-offset-1'
                                                                            : '',
                                                                        !active && checked ? 'ring-2' : '',
                                                                        '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none',
                                                                    ]">
                                                                        <RadioGroupLabel as="span" class="sr-only">
                                                                            {{ color.name }}
                                                                        </RadioGroupLabel>
                                                                        <span aria-hidden="true" :class="[
                                                                            color.bgColor,
                                                                            'h-8 w-8 border border-black border-opacity-10 rounded-full',
                                                                        ]" />
                                                                    </div>
                                                                </RadioGroupOption>
                                                            </div>
                                                        </RadioGroup>
                                                    </div>

                                                    <!-- Size picker -->
                                                    <div class="mt-8">
                                                        <div class="flex items-center justify-between">
                                                            <h4 class="text-sm font-medium text-gray-900">
                                                                Size
                                                            </h4>
                                                            <a href="#"
                                                                class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size
                                                                guide</a>
                                                        </div>

                                                        <RadioGroup v-model="selectedSize" class="mt-2">
                                                            <RadioGroupLabel class="sr-only">
                                                                Choose a size
                                                            </RadioGroupLabel>
                                                            <div class="grid grid-cols-7 gap-2">
                                                                <RadioGroupOption as="template"
                                                                    v-for="size in product.sizes" :key="size.name"
                                                                    :value="size" :disabled="!size.inStock"
                                                                    v-slot="{ active, checked }">
                                                                    <div :class="[
                                                                        size.inStock
                                                                            ? 'cursor-pointer focus:outline-none'
                                                                            : 'opacity-25 cursor-not-allowed',
                                                                        active
                                                                            ? 'ring-2 ring-offset-2 ring-indigo-500'
                                                                            : '',
                                                                        checked
                                                                            ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                                                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                                        'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
                                                                    ]">
                                                                        <RadioGroupLabel as="span">{{ size.name }}
                                                                        </RadioGroupLabel>
                                                                    </div>
                                                                </RadioGroupOption>
                                                            </div>
                                                        </RadioGroup>
                                                    </div>

                                                    <button type="submit"
                                                        class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        Add to your schedule
                                                    </button>

                                                    <p class="absolute top-4 left-4 text-center sm:static sm:mt-8">
                                                        <button class="font-medium text-indigo-600 hover:text-indigo-500"
                                                            @click="navigateToClientDetails(client.id)">View
                                                            full details of the client</button>
                                                    </p>
                                                </form>
                                            </section>
                                        </div>
                                    </div>
                                    <template #fallback>
                                        Loading ................
                                    </template>
                                </Suspense>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router"
import axios from "axios"
import {
    Dialog,
    DialogPanel,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { StarIcon } from "@heroicons/vue/20/solid";

import { useClientStore } from "@/stores/client"
const store = useClientStore()
const router = useRouter()
const client = ref(null)
const { open, clientID, toggleQuickView } = inject("quickview");
const fetchPerson = async () => {
    console.log(clientID.value);
    const url = `http://127.0.0.1:8000/clients/clients/${+clientID.value}`
    const res = await axios.get(url, store.useConfig)
    client.value = res.data
    console.log(client.value)
}
onMounted(fetchPerson)

const navigateToClientDetails = (id) => {
    router.push(`/clients/${id}`)
    toggleQuickView()
}


// const data = {
//     id: 130,
//     name: "Cristine Jemmett",
//     dob: "1996-11-30",
//     age: 26,
//     gender: "female",
//     description:
//         "imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue",
//     phone: "115 241 5463",
//     email: "cjemmett43@qq.com",
//     image:
//         "http://127.0.0.1:8000/media/uploads/profile/834b7f48-743f-4d00-9a6e-7b17ac4494d6.jfif",
//     status: true,
// };

const product = {
    name: "Women's Basic Tee",
    price: "$32",
    rating: 3.9,
    reviewCount: 512,
    href: "#",
    imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
    imageAlt: "Back of women's Basic Tee in black.",
    colors: [
        { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
        {
            name: "Heather Grey",
            bgColor: "bg-gray-400",
            selectedColor: "ring-gray-400",
        },
    ],
    sizes: [
        { name: "XXS", inStock: true },
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: true },
        { name: "XXL", inStock: false },
    ],
};


// const open = ref(false)
const selectedColor = ref(product.colors[0]);
const selectedSize = ref(product.sizes[2]);
</script>
