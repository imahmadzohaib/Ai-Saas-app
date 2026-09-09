<template>
  <div>
    <!-- sidebar -->
    <dashboard-sidebar/>
    <div class="p-2 h-screen transition-all duration-300 overflow-hidden flex flex-col ml-0 sm:ml-72">
    <!-- navbar -->
     <dashboard-navbar/>
     <div class="p-2 pt-16 flex-1 overflow-auto">

        <slot />
     </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>