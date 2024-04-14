<script setup lang="ts">
import { useForm, Head } from '@inertiajs/vue3';
import { directive } from '@coders-tm/vue-number-format'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table'

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

defineProps(['places']);


</script>

<template>
    <Head title="Add a place" />

    <div class="h-screen flex items-center justify-center">
        <Card class="w-full max-w-lg">
            <form @submit.prevent="form.post(route('places.store'), { onSuccess: () => form.reset() })">
                <CardHeader>
                    <CardTitle class="text-2xl">
                        Add a Place
                    </CardTitle>
                    <CardDescription>
                        Add your favorite nongkrong place here
                    </CardDescription>
                </CardHeader>
                <CardContent class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" type="text" placeholder="Warunk Upnormal" v-model="form.name" required />
                    </div>
                    <div class="grid gap-2">
                        <Select v-model="form.location">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Location</SelectLabel>
                                    <SelectItem value="bsd">
                                        BSD
                                    </SelectItem>
                                    <SelectItem value="bintaro">
                                        Bintaro
                                    </SelectItem>
                                    <SelectItem value="jakarta">
                                        Jakarta
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="grid gap-2">
                        <Label for="open_at">Open At</Label>
                        <Input id="open_at" type="time" v-model="form.open_at" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="close_at">Close At</Label>
                        <Input id="close_at" type="time" v-model="form.close_at" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="min_price">Min Price</Label>
                        <Input id="min_price" v-model="form.min_price" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="max_price">Max Price</Label>
                        <Input id="max_price" v-model="form.max_price" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="parking_fee">Parking Fee</Label>
                        <RadioGroup default-value="0" v-model="form.parking_fee">
                            <div class="flex items-center space-x-2">
                                <RadioGroupItem id="option-one" value="1" />
                                <Label for="option-one">Yes</Label>
                            </div>
                            <div class="flex items-center space-x-2">
                                <RadioGroupItem id="option-two" value="0" />
                                <Label for="option-two">No</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button class="w-full" type="submit">
                        Submit
                    </Button>
                </CardFooter>
            </form>
        </Card>


    </div>

    <div class="border rounded-md">
        <Table>
            <TableBody>
                <TableRow v-for="place in places" :key="place.id">
                    <TableCell>
                        {{ place.name }}
                    </TableCell>
                    <TableCell>
                        {{ place.location }}
                    </TableCell>
                    <TableCell>
                        {{ place.open_at }}
                    </TableCell>
                    <TableCell>
                        {{ place.close_at }}
                    </TableCell>
                    <TableCell>
                        {{ place.min_price }}
                    </TableCell>
                    <TableCell>
                        {{ place.max_price }}
                    </TableCell>
                    <TableCell>
                        {{ place.parking_fee }}
                    </TableCell>
                    <TableCell>
                        {{ place.verified }}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>
