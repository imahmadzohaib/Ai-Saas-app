<template>
  <UContainer class="flex items-center justify-center sm:p-4 sm:min-w-160">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center p-4">
          <h1 class="text-xl font-semibold">Welcome to NuxtAI</h1>
        </div>
      </template>
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <UButton
            color="neutral"
            variant="outline"
            class="justify-center"
            icon="i-simple-icons-google"
            :loading="isLoading"
            :disabled="isLoading"
              @click="signIn.social({
              provider: 'google',
              callbackURL:'/'
            })"
            >Google</UButton
          >

          <UButton
            color="neutral"
            variant="outline"
            class="justify-center"
            icon="i-simple-icons-github"
            :loading="isLoading"
            :disabled="isLoading"
            @click="signIn.social({
              provider: 'github',
              callbackURL:'/'
            })"

          >
            Github</UButton
          >
        </div>
        <USeparator label="or" />
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >

          
          <UFormField label="Email" name="email" required>
            <UInput v-model="state.email" type="email" placeholder="Email Address" class="w-full" />
          </UFormField>


          <UFormField label="Password" name="password" required>
            <UInput v-model="state.password"  type="password" class="w-full" placeholder="Password"/>
          </UFormField>

         

          <UButton type="submit" block> Sign In </UButton>
        </UForm>

        <div class="text-center text-sm">
            Don't have an account?
            <UButton variant="link" :disabled="false"  color="primary" to="/auth/register">Create Now</UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const isLoading = ref();

const { signIn } = useAuth();

const schema = z
  .object({
    email: z.email("Invalid email"),
    password: z
      .string("Password is required")
      .min(8, "Must be at least 8 characters"),
  })

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {

  const { error } = await signIn.email({
    email: event.data.email,
    password: event.data.password,
    callbackURL:"/"
  })
  console.log(error)
}
</script>

<style></style>
