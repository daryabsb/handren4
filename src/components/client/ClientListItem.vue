<template>
    <q-item :active="active" flat clickable v-ripple active-class="bg-teal" draggable="true"
        class="q-pa-none p-2 bg-[var(--theme-bg-color)] border border-[var(--border-color)]">
        <q-item-section avatar>
            <q-avatar class="rounded-sm">
                <img class="object-cover" :src="client.image" alt="" />
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <q-item-label class="text-[var(--theme-color)] text-sm  tracking-tight font-thin">{{ client.name
            }}</q-item-label>
        </q-item-section>
        <q-item-section side>
            <div class="col-auto ">
                <q-btn padding="xs" color="grey-7" round flat icon="more_vert" style="padding-inline: 0;">
                    <q-menu cover auto-close>
                        <q-list>
                            <q-item clickable>
                                <q-item-section>Remove Card</q-item-section>
                            </q-item>
                            <q-item clickable>
                                <q-item-section>Send Feedback</q-item-section>
                            </q-item>
                            <q-item clickable>
                                <q-item-section>Share</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </div>
        </q-item-section>
    </q-item>
</template>

<script setup lang="ts">
import { Client } from "../../composables/interfaces.ts"
interface Props {
    active: boolean;
    client: Client;
}

withDefaults(defineProps<Props>(), {
    active: false,
    client: {}
})
</script>