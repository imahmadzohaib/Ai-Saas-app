<template>
  <div class="mb-0 space-y-1">
    <h2 class="text-2xl font-bold"> {{ title }}</h2>
    <p class="text-muted font-light text-sm md:text-lg">{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
interface HeadingProps{
    title: string;
    description: string;
}

defineProps<HeadingProps>();

</script>

<style>

</style>