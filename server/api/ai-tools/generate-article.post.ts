


export default defineEventHandler(async(event) =>{
    const { articleTopic, articleTopicLength }  = await readBody(event)

    if(!articleTopic){
        throw createError({
            statusCode: 400,
            statusMessage: "Article topic is required"
        })
    }    

    if(!articleTopicLength){
        throw createError({
            statusCode: 400,
            statusMessage: "Article topic length is required"
        })
    }

    const prompt = `Write an article about ${articleTopic} in ${articleTopicLength? articleTopicLength:500} words`
    const response = await openai.chat.completions.create({
      model: "gemini-3.1-flash-lite",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_completion_tokens: articleTopicLength? articleTopicLength: 500,

    });

    return response.choices[0]?.message?.content ?? "";

})