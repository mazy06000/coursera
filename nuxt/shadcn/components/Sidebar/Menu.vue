<script setup>
const items = ref([
  {
    title: "Home",
    icon: "material-symbols-light:experiment-sharp",
    to: "/",
  },
  {
    title: "About",
    icon: "material-symbols-light:roller-skating-rounded",
    to: "/about",
  },
  {
    title: "Contact",
    icon: "material-symbols-light:school-rounded",
    to: "/contact",
  },
  {
    title: "Blog",
    icon: "material-symbols-light:switch-account-sharp",
    to: "/blog",
  },
]);
</script>

<template>
  <div>
    <header
      class="flex items-center gap-2 p-4 hover:scale-[101%] transition cursor-pointer"
    >
      <Logo />
      <p class="text-lg font-bold">Kutubun</p>
    </header>
    <div class="px-4 grow">
      <div class="grid gap-2">
        <NuxtLink
          :href="item.to"
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center gap-2 px-2 transition rounded cursor-pointer hover:bg-gray-100"
        >
          <Icon size="20" :name="item.icon" color="black" />
          <span>
            {{ item.title }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
