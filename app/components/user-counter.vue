<template>
  <div v-if="status != 'pending'" class="mt-auto">
    <USeparator/>
    <div class="px-3">
        <div class="py-6 px-2">
            <div class="text-sm mb-4 space-y-2">
                <p>{{ userData? userData.userApiLimitCount: 0 }} / {{ MAX_COUNT }}   Free Generations</p>
                <UProgress v-model="progress" />
            </div>
            <UButton icon="i-lucide-zap" color="error" class="w-full justify-center" >Upgrade</UButton>

        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MAX_COUNT } from "~~/shared/utils/user-api-limits"

const { data: userData, status }  = await useFetch("/api/user", {
  key: "userData"
})

const progress = computed(()=>{
  if(userData.value){
    return (userData.value.userApiLimitCount / MAX_COUNT ) * 100
  }else{
    return 0
  }
});
</script>

<style>

</style>