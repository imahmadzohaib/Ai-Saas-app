import { incrementApiLimit } from "~~/server/services/user-api-limit"



export default defineEventHandler(async(event) =>{
    const { articleTopic, articleLength }  = await readBody(event)

    if(!articleTopic){
        throw createError({
            statusCode: 400,
            statusMessage: "Article topic is required"
        })
    }    

    if(!articleLength){
        throw createError({
            statusCode: 400,
            statusMessage: "Article topic length is required"
        })
    }

    const prompt = `Write an article about ${articleTopic} in ${articleLength? articleLength:500} words. don't use dashes`
    const response = await openai.chat.completions.create({
      model: "gemini-3.1-flash-lite",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_completion_tokens: articleLength? articleLength: 500,

    })

    await incrementApiLimit(event.context.user.id);
    return response.choices[0]?.message?.content ?? "";

})