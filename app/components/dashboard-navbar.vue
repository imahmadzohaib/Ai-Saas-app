<template>
  <div
    class="fixed top-0 h-16 right-0 left-0 sm:left-72 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
  >
    <UContainer class="flex gap-2 h-full items-center justify-between sm:justify-end">
      <UDrawer
        v-model:open="open"
        direction="left"
        :handle="false"
        :ui="{
          header: 'flex items-center justify-between h-16 px-5',
          container: 'p-0 w-72 gap-0',
        }"
      >
        <UButton
          class="hidden"
          color="neutral"
          variant="subtle"
          icon="i-lucide-menu"
        />

        <template #header>
          <ProjectLogo />
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            @click="open = false"
          />
        </template>
        <template #body>
          <div class="flex flex-col">
            <div class="flex-1 overflow-y-auto">
              <u-separator />
              <div class="px-3 py-4">
                <u-navigation-menu
                  :items="sidebarRoutes"
                  orientation="vertical"
                  class="date-[orientation=verical]:w-full"
                  ui="{label: 'py-2.5', link'py-3}"
                />
              </div>
            </div>
          </div>
        </template>
      </UDrawer>
      <UDropdownMenu
        :items="items"
        :content="{
          align: 'start',
          side: 'bottom',
          sideOffset: 8,
        }"
        :ui="{
          content: 'w-48',
        }"
      >
        <UButton
          label="Open"
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
        />
      </UDropdownMenu>
      <UColorModeButton />
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from "@nuxt/ui";
import { sidebarRoutes } from "~~/constants/tools";

const { logOut } = useAuth();
const open = ref(false);

const items = ref<DropdownMenuItem[]>([
  {
    label: "Profile",
    icon: "i-lucide-user",
  },
  {
    label: "Billing",
    icon: "i-lucide-credit-card",
  },
  {
    label: "Logout",
    icon: "i-lucide-log-out",
    onSelect: async () => {
      await logOut({
        redirectTo: "/auth/login",
      });
    },
  },
]);
</script>

<style></style>
