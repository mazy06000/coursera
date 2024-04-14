<script setup>
definePageMeta({
    middleware: 'auth',
})

import { useCounterStore } from '~/stores/myStore'
const store = useCounterStore()
</script>

<template>
    <div>
        <h1>Events</h1>
        <nuxt-link to="/">Home</nuxt-link>
        <div>Current Count: {{ store.count }}</div>
    </div>
</template>