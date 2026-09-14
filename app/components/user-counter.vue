<template>
  <div class="mt-auto">
    <USeparator/>
    <div class="px-3">
        <div class="py-6 px-2">
            <div class="text-sm mb-4 space-y-2">
                <p>4/5 Free Generations</p>
                <UProgress v-model="progress" />
            </div>
            <UButton icon="i-lucide-zap" color="error" class="w-full justify-center" >Upgrade</UButton>

        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>


const progress = ref(90);
</script>

<style>

</style>