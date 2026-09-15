<template>
  <div>
    <UContainer class="h-[calc(100vh-88px)] flex flex-col py-4 gap-8">
      <PageHeading
        title="Blog Title Generator"
        description="Discover compelling and attention-grabbing  blog title instantly with AI-powered suggestions"
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
                        <UFormField name="blogTopic" label="Blog Keywords">
                            <UInput v-model="state.blogTopic" class="w-full" />
                        </UFormField>
                         <UFormField name="blogCategory" label="Blog Category">
                            <USelect v-model="state.blogCategory" :items="blogCategories" class="w-full" />
                        </UFormField>
                        <UButton type="submit" label="submit" />

                    </UForm>
                </UCard>
            </div>

            <UCard :ui="{body:'max-h-[calc(100dvh-450px)]'}" class="flex-1 overflow-y-auto ">
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
  blogTopic: z.string().min(1, "Aticle topic is required"),
  blogCategory: z.string(),
});

type Schema = z.output<typeof schema>;
const state = reactive<Schema>({
  blogTopic: "",
  blogCategory:"Technology",
});


const blogCategories = ref([
    "General","Technology","Business","Health","Education","Lifestyle", "Education","Travel","Food"
])

const content = ref("")

const generateArticle = async (event: FormSubmitEvent<Schema>) => {
  try {
    isLoading.value = true;

    const data = await $fetch("/api/ai-tools/title-generator", {
      method: "POST",
      body: {
        blogTopic: event.data.blogTopic,
        blogCategory: event.data.blogCategory
      },
    });

    console.log(typeof event.data.blogCategory);


    if (data) {
      content.value= data;
      state.blogTopic = ""
      state.blogCategory = "Technology"
    }
    await refreshNuxtData("userData")

  } catch (e) {
    const err = e as FetchError;
    error.value = getError(err);
  } finally {
    isLoading.value = false;
  }
};

</script>

<style></style>
