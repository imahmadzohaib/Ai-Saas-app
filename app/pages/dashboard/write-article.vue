<template>
  <div>
    <UContainer class="h-[calc(100vh-88px)] flex flex-col py-4 gap-8">
      <PageHeading
        title="AI Article Writer"
        description="Craft well-structured and engaging articles on any subject using advanced AI Agents"
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
      <div class="py-4 w-full max-w-full">
        <div class="flex flex-col space-y-2">
            <div>
                <UCard>
                    <UForm :schema="schema" :state="state" class="space-y-2" @submit="generateArticle">
                        <UFormField name="articleTopic" label="Article Topic">
                            <UInput v-model="state.articleTopic" class="w-full" />
                        </UFormField>
                         <UFormField name="articleLength" label="Article Length">
                            <USelect v-model="state.articleLength" :items="articleItems" class="w-full" />
                        </UFormField>
                        <UButton type="submit" label="submit" />

                    </UForm>
                </UCard>
            </div>

            <UCard :ui="{body:'h-[calc(100dvh-450px)]'}" class="flex-1 overflow-y-auto ">
                <div v-if="content" class="h-full">
                    <MDC :value="content"  />
                </div>
                <div v-else-if="isLoading && !content" class="flex flex-col justify-center items-center">
                    Generating Article...
                </div>
            </UCard>
        </div>     
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
  articleTopic: z.string().min(1, "Aticle topic is required"),
  articleLength: z.number(),
});

type Schema = z.output<typeof schema>;
const state = reactive<Schema>({
  articleTopic: "",
  articleLength:1100,
});


const articleItems = ref([
    {
        label: "Short (500-800 words)",
        value:700,
    },
       {
        label: "Medium (800-1200 words)",
        value:1100,
    },
       {
        label: "Large (1200-1600 words)",
        value:1500,
    },
    
])

const content = ref("")

const generateArticle = async (event: FormSubmitEvent<Schema>) => {
  try {
    isLoading.value = true;

    const data = await $fetch("/api/ai-tools/generate-article", {
      method: "POST",
      body: {
        articleTopic: event.data.articleTopic,
        articleLength: event.data.articleLength
      },
    });

    console.log(typeof event.data.articleLength);


    if (data) {
      content.value= data;
      state.articleTopic = ""
      state.articleLength = 1100
    }
  } catch (e) {
    const err = e as FetchError;
    error.value = getError(err);
  } finally {
    isLoading.value = false;
  }
};

</script>

<style></style>
