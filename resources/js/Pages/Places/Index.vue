<script setup lang="ts">
import { useForm, Head } from '@inertiajs/vue3';
import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import {h, ref} from "vue";
import { columns } from "@/Pages/Places/Table/columns";
import DataTable from "@/Pages/Places/Table/DataTable.vue";

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

const props = defineProps({ places: Array });
const count = ref(0);
const data = ref(props.places);
</script>

<template>
    <Head title="Places" />

    <div class="h-full flex items-center justify-center">
        <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">
                Welcome
            </h1>
            <p class="text-sm text-muted-foreground">
                Find your favorite nongkrong place here
            </p>

            <Dialog>
                <DialogTrigger>
                    <Button>Randomize</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Randomize</DialogTitle>
                        <DialogDescription v-if="count > 0" >
                            {{ places[Math.floor(Math.random() * places.length)].name }}
                            {{ places[Math.floor(Math.random() * places.length)].location }}
                            {{ places[Math.floor(Math.random() * places.length)].min_price }}
                            {{ places[Math.floor(Math.random() * places.length)].max_price }}
                        </DialogDescription>
                        <DialogDescription v-else>
                            Click on button below to randomize where you nongkrong today
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button @click="count++" v-if="count === 0" >Randomize</Button>
                        <Button @click="count++" v-else-if="count > 0" >Randomize Again</Button>
                        <Button variant="ghost" @click="count = 0" v-if="count > 0">Reset</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </div>

    <div class="container py-10 mx-auto">
        <DataTable :data="data" :columns="columns" />
    </div>
</template>
