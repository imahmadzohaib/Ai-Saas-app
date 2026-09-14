import  { requireAuth } from  "~~/server/services/better-auth"
import { incrementApiLimit } from "~~/server/services/user-api-limit";

export default defineEventHandler(async (event) => {


  await requireAuth(event);

  const { messages } = await readBody(event)

  if (!messages) {
    throw createError({
      statusCode: 400,
      statusMessage: "Messages are required",
    })
  }


    const response = await openai.chat.completions.create({
      model: "gemini-3.1-flash-lite",
      messages: [
        {
          role: "system",
          content:
            "You are a code generator. Answer only in markdown code snippets. Use code comments for explanations.",
        },
        ...messages
      ],
      temperature: 0.5,
    })

    await incrementApiLimit(event.context.user.id);
    return response.choices[0]?.message?.content ?? "";
})