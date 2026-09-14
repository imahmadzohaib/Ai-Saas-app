<template>
  <div>
    <UContainer class="h-[calc(100vh-88px)] flex flex-col py-4 gap-8">
      <PageHeading
        title="Code Generation"
        description="Generate code using descriptive text."
      />

      <UAlert
        v-if="error"
        color="error"
        variant="subtle"
        :title="error?.statusCode + ''"
        :description="error?.statusMessage"
        icon="i-lucide-triangle-alert"
        class="mb-2"
      />

      <UCard
        variant="subtle"
        class="flex-1 overflow-y-auto space-y-4 px-4 py-2"
      >
        <div class="flex flex-col gap-y-4">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="flex items-start space-x-2"
            :class="[msg.role === 'user' ? 'justify-end' : 'justify-start']"
          >
            <div>
              <UButton
                size="sm"
                variant="soft"
                class="rounded-full"
                :icon="msg.role === 'user' ? 'i-lucide-user' : 'i-lucide-cpu'"
                :color="msg.role === 'user' ? 'primary' : 'success'"
              />
            </div>
            <UCard :ui="{ body: 'p-3 sm:p-3' }">
              <div class="text-sm max-w-prose">
                <MDC :value="msg.content"/>
              </div>
            </UCard>
          </div>
        </div>
      </UCard>
      <div class="pt-4">
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="sendMessage"
        >
          <div class="flex space-x-2 w-full">
            <UFormField class="flex-1" name="userPrompt">
              <UTextarea
                v-model="state.userPrompt"
                :rows="1"
                class="w-full"
              />
            </UFormField>
            <UButton type="submit" icon="i-lucide-arrow-up" color="primary" />
          </div>
        </UForm>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { FetchError } from "ofetch";

definePageMeta({
  layout: "dashboard",
});

const isLoading = ref(false);
const error = ref<AppError | null>();

const schema = z.object({
  userPrompt: z.string().min(1, "Prompt is required"),
});

type Schema = z.output<typeof schema>;
const state = reactive<Schema>({
  userPrompt: "",
});
type Message = {
  role: "user" | "system";
  content: string;
};

const messages = ref<Message[]>([
 
]);

const sendMessage = async (event: FormSubmitEvent<Schema>) => {
  try {
    isLoading.value = true;
    messages.value.push({
      role: "user",
      content: event.data.userPrompt.trim(),
    });

    const data = await $fetch("/api/ai-tools/code", {
      method: "POST",
      body: {
        messages: messages.value,
      },
    });

    if (data) {
      messages.value.push({
        role: "system",
        content: data,
      });
    }
    state.userPrompt = "";
  } catch (e) {
      const err = e as FetchError;
      if(err.statusCode == 401){
        navigateTo("/auth/login")
      }
      error.value = getError(err);
  } finally {
     isLoading.value = false;
  }
};
</script>

<style></style>
