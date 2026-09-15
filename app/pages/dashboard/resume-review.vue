<template>
  <div>
    <UContainer class="h-[calc(100vh-88px)] flex flex-col py-4 gap-8">
      <PageHeading
        title="Resume Reviewer"
        description="Remove any object from the image instantly"
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
        <div class="flex flex-col space-y-5">
          <div>
            <UCard>
              <UForm
                :schema="schema"
                :state="state"
                class="space-y-4 "
                @submit="reviewResume"
              >
                <UFormField
                  name="resume"
                  label="Resume File"
                  description="PDF (max. 5MB)"
                >
                  <UFileUpload
                    v-model="state.resume"
                    accept=".pdf"
                    label="Drop your pdf here"
                    class="min-h-48"
                  />
                </UFormField>

                <UButton type="submit" label="submit" />
              </UForm>
            </UCard>
          </div>

          <UCard
            :ui="{ body: 'h-[calc(100dvh-600px)]' }"
            class="flex-1 overflow-y-auto"
          >
            <div v-if="content" class="h-full">
              <MDC :value="content" />
            </div>
            <div
              v-else-if="isLoading && !content"
              class="flex flex-col justify-center items-center"
            >
              Reviewing resume...
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["application/pdf"];

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  );
};

const isLoading = ref(false);
const error = ref<AppError | null>();

const schema = z.object({
  resume: z
    .instanceof(File, {
      message: "Please select a resume file.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The resume file is too large. Please choose a resume smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please upload a valid image file (PDF).",
    }),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  resume: undefined,
});

const content = ref();

const reviewResume = async (event: FormSubmitEvent<Schema>) => {
  try {
    isLoading.value = true;
    const formData = new FormData();
    if (event.data.resume instanceof File) {
      formData.append("resume", event.data.resume);
    }

    const data = await $fetch("/api/ai-tools/review-resume", {
      method: "POST",
      body: formData,
    });

    if (data) {
      content.value = data;
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
