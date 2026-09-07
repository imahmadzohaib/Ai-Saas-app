<template>
  <UContainer class="flex items-center justify-center sm:p-4 sm:min-w-160">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center p-4">
          <h1 class="text-xl font-semibold">Create Your Account</h1>
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
        
          <UFormField label="Name" name="name" required>
            <UInput v-model="state.name"  placeholder="Your name" class="w-full"/>
          </UFormField>

          
          <UFormField label="Email" name="email" required>
            <UInput v-model="state.email" placeholder="Email Address" class="w-full" />
          </UFormField>


          <UFormField label="Password" name="password" required>
            <UInput v-model="state.password" type="password" class="w-full" placeholder="Password"/>
          </UFormField>

          <UFormField label="Confirm Password" name="confirm-password" required>
            <UInput v-model="state.confirmPassword" type="password" placeholder="" class="w-full" />
          </UFormField>

          <UButton type="submit" block> Create Account </UButton>
        </UForm>

        <div class="text-center text-sm">
            Already have an account?
            <UButton variant="link" :disabled="false"  color="primary" to="/auth/login">Sign in</UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>

import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const isLoading = ref();
const schema = z
  .object({
    name: z.string().trim().min(5, "Name muxt be at least 5 characters"),
    email: z.email("Invalid email"),
    password: z
      .string("Password is required")
      .min(8, "Must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const { signUp,signIn } = useAuth();
async function onSubmit(event: FormSubmitEvent<Schema>) {

    const { error } = await signUp.email({
    email: event.data.email,
    password: event.data.password,
    name:event.data.name,
    callbackURL:"/"
  })
  console.log(error)
}
</script>

<style></style>
