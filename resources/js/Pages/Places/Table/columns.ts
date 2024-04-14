import { h } from 'vue'
import {ColumnDef} from "@tanstack/vue-table";
import { Checkbox } from '@/Components/ui/checkbox'
import {Button} from "@/Components/ui/button";
import { ArrowUpDown } from 'lucide-vue-next'

export const columns: ColumnDef<unknown>[] = [

    {
        id: 'select',
        header: ({ table }) => h(Checkbox, {
            'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
            'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
            'ariaLabel': 'Select all',
        }),
        cell: ({ row }) => h(Checkbox, {
            'checked': row.getIsSelected(),
            'onUpdate:checked': value => row.toggleSelected(!!value),
            'ariaLabel': 'Select row',
        }),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('name')),
    },
    {
        accessorKey: 'location',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Location', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'uppercase' }, row.getValue('location')),
    },
    {
        accessorKey: 'min_price',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Min Price', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => {
            const min_price = Number.parseFloat(row.getValue('min_price'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(min_price)

            return h('div', { class: 'text-right font-medium' }, formatted)
        },
    },
    {
        accessorKey: 'max_price',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Max. Price', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => {
            const max_price = Number.parseFloat(row.getValue('max_price'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(max_price)

            return h('div', { class: 'text-right font-medium' }, formatted)
        },
    },
    {
        accessorKey: 'open_at',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Opening Time', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('open_at')),
    },
    {
        accessorKey: 'close_at',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Closing Time', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('close_at')),
    },
    {
        accessorKey: 'parking_fee',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Parking Fee', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('parking_fee') === 1 ? 'Yes' : 'No' ),
    },
]
