<script setup lang="ts">
import { useCounterStore } from '~/stores/myStore'

definePageMeta({
  middleware: "auth",
});
const { $sayHello } = useNuxtApp();
$sayHello();

const { locale, setLocale } = useI18n()
const store = useCounterStore()

const response = await $fetch('/api/hello')

const { data: products, pending } = await useLazyFetch('/api/products', {
  transform: (_products) => _products.data.products 
})
console.log(toRaw(products.value))
</script>

<template>
  <div>
    <Alert />
    <Profile />
    <img
      src="~/assets/kutubun-logo.png"
      alt="Kutubun Logo"
      width="80"
      height="80"
    />
    <div>
      <button @click="setLocale('en')">en</button>
      <button @click="setLocale('fr')">fr</button>
      <p>{{ $t('title-landing-page') }}</p>
    </div>

    <div>Current Count: {{ store.count }}</div>
    <button @click="store.increment()">Add</button>
    <p>{{ pending ? "Loading" : products }}</p>
  </div>
</template>
