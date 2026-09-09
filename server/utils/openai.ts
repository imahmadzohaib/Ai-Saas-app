import OpenAI from "openai";

const { geminiApi } = useRuntimeConfig()

export    const openai = new OpenAI({
    apiKey: geminiApi,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    timeout: 30000,
  })