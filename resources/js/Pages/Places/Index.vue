<script setup lang="ts">
import {Head, useForm} from '@inertiajs/vue3';
import {Button} from '@/Components/ui/button';
import {computed, ref} from "vue";
import {columns} from "@/Pages/Places/Table/columns";
import DataTable from "@/Pages/Places/Table/DataTable.vue";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/Components/ui/drawer'
import { Clock } from 'lucide-vue-next';
import { DollarSign } from 'lucide-vue-next';
import { CircleParking } from 'lucide-vue-next';
import { Dices } from 'lucide-vue-next';

const form = useForm({
    name: '',
    location: '',
    open_at: '',
    close_at: '',
    min_price: '',
    max_price: '',
    parking_fee: false,
    verified: false,
});

const props: any = defineProps({ places: Array });
const count = ref(0);
const data = ref(props.places);
let randomNum = 0;

const randomizedPlace = computed(() => {
    if (count.value > 0) {
        return props.places[randomNum];
    }
});

const name = computed(() => {
        return randomizedPlace.value.name;
});

const location = computed(() => {
        return randomizedPlace.value.location;
});

const minPrice = computed(() => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(randomizedPlace.value.min_price);
});

const maxPrice = computed(() => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(randomizedPlace.value.max_price);
});

const open_at = computed(() => {
        return randomizedPlace.value.open_at;
});

const close_at = computed(() => {
        return randomizedPlace.value.close_at;
});

const parking_fee = computed(() => {
        return randomizedPlace.value.parking_fee;
});

const link = computed(() => {
        return `https://www.google.com/maps/embed/v1/place?key=AIzaSyD_oGZ_g_glYlKf0cx0s-ozRt-cLiP38V0&q=${randomizedPlace.value.name}+${randomizedPlace.value.location}&maptype=satellite&language=id`;
});

const triggerClick = () => {
    count.value++;
    randomNum = Math.floor(Math.random() * props.places.length);
};
</script>

<template>
    <Head title="Places" />
    <Head>
        <title>Places</title>
    </Head>

    <div class="h-full flex items-center justify-center mt-9 container">
        <div class="flex flex-col">
            <p class="text-sm md:text-xl text-muted-foreground">
                Discover curated places to hang out in
            </p>
            <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-12 text-center">
                NongSiniAja
            </h1>
            <p class="text-md md:text-lg text-muted-foreground mb-1 text-center">
                Want us to decide it for you?
            </p>

            <Drawer @update:open="count = 0">
                <DrawerTrigger as-child>
                    <Button>Pick a Place for Me</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div class="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Pick a Place for Me</DrawerTitle>
                            <DrawerDescription>Click on button below to see where you'll go today!</DrawerDescription>
                        </DrawerHeader>
                        <div class="p-4 pb-0" v-if="count > 0">
                            <iframe
                                width="100%"
                                height="100%"
                                style="border: 0"
                                loading="lazy"
                                allowfullscreen
                                referrerpolicy="no-referrer-when-downgrade"
                                :src="link"
                            >
                            </iframe>
                            <h1 class="text-2xl font-bold mt-3">{{ name }}</h1>
                            <p class="text-md text-muted-foreground uppercase mb-4">{{ location }}</p>

                            <div class="flex flex-row space-x-2 items-center">
                                <DollarSign :size="20" color="#727279" :stroke-width="1.25" />
                                <p class="text-md text-muted-foreground">{{ minPrice }} - {{ maxPrice }}</p>
                            </div>
                            <div class="flex flex-row space-x-2 items-center">
                                <Clock :size="20" color="#727279" :stroke-width="1.25" />
                                <p class="text-md text-muted-foreground">{{ open_at }} - {{ close_at }}</p>
                            </div>

                            <div class="flex flex-row space-x-2 mb-2 items-center">
                                <CircleParking :size="20" color="#727279" :stroke-width="1.25" />
                                <p class="text-md text-muted-foreground" v-if="parking_fee === true ">This place has parking fee :(</p>
                                <p class="text-md text-muted-foreground" v-if="parking_fee === false ">This place has free parking :)</p>
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button @click="triggerClick" v-if="count === 0" class="space-x-2">
                                <Dices color="#fafafa" />
                                <div>
                                    Randomize
                                </div>
                            </Button>
                            <Button @click="triggerClick" v-else-if="count > 0" >Randomize Again</Button>
                            <DrawerClose as-child>
                                <Button variant="outline">
                                    Close
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    </div>

    <div class="container py-10 mx-auto">
        <DataTable :data="data" :columns="columns" />
    </div>
</template>
