<template>
  <div>
    <!-- sidebar -->
     <aside  class="fixed top-0 left-0 transition-all duration-300 hidden sm:block w-72">
        <div class="h-screen flex flex-col border-r border-gray-200 dark:border-gray-800"></div>
     </aside>
    <div class="p-2 h-screen transition-all duration-300 overflow-hidden flex flex-col ml-0 sm:ml-72">
    <!-- navbar -->
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