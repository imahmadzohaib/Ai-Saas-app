<template>
  <NuxtLink to="/" class="flex items-center gap-2">
    <span class="font-bold text-xl flex items-center">
      <NuxtImg src="/logo.svg" class=" w-6 h-6 mr-1" :class="colorMode.value === 'light'?'':'invert-100'"/>
      NuxtAI
    </span>
  </NuxtLink>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
</script>

<style>

</style>