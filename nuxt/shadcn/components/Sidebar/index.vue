<script setup>
const open = ref(true);
</script>

<template>
  <div class="relative">
    <div
      class="z-50 flex items-center justify-between w-full h-full p-4 lg:hidden"
    >
      <Logo />
      <Icon
        class="z-50 cursor-pointer left-2 top-2"
        size="30"
        name="iconamoon:menu-burger-horizontal-fill"
        color="black"
        @click="open = !open"
      />
      <div
        v-if="open"
        class="fixed top-0 left-0 z-50 w-full h-screen bg-white"
      >
        <Icon
          class="absolute z-50 cursor-pointer right-4 top-4"
          size="30"
          name="material-symbols:close"
          color="black"
          @click="open = !open"
        />
        <SidebarMenu />
      </div>
    </div>

    <div
      class="hidden lg:flex w-[250px] h-screen flex-col justify-between border-r"
    >
      <SidebarMenu />
      <div>UserItem</div>
    </div>
  </div>
</template>
