<template>
  <div>
    <UContainer class="h-[calc(100vh-88px)] flex flex-col py-4">
        <PageHeading 
        title="Conversation"
        description="Engage in a natural, intelligent conversation with AI for brainstorming"/>
    </UContainer>

    <UCard variant="subtle" class="flex-1 overflow-y-auto space-y-4 px-4 py-2">
        <div class="flex flex-col gap-y-4">
            <div v-for="(msg,index) in messages"
                 :key="index"
                 class="flex items-start space-x-2"
                 :class="[msg.role==='user'?'justify-end':'justify-start']">
                 <div>
                    <UButton  size="sm"
                              variant="soft"
                              class="rounded-full"
                              :icon="msg.role === 'user'? 'i-lucide-user':'i-lucide-cpu'"
                              :color="msg.role === 'user'?'primary':'success'"/>
                 </div>
            </div>
        </div>

    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "dashboard"
})

type Message={
    role:"user" | "system",
    content: string
}

const messages = ref<Message[]>([
    {
        role: "user",
        content: "Difference between circle and square"
    },
    {
        role: "system",
        content: "Difference between circle and square is about being one of them is called yes"
    }
]);

</script>

<style>

</style>