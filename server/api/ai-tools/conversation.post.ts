


export default defineEventHandler(async(event) =>{
    const { messages}  = await readBody(event)

    if(!messages){
        throw createError({
            statusCode: 400,
            statusMessage: "Messages are required"
        })
    }    

    const response = await openai.chat.completions.create({
      model: "gemini-3.1-flash-lite",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant",
        },
        {
          role: "user",
          content: messages,
        },
      ],
      temperature: 0.5,
      max_completion_tokens: 500,

    });

    return response.choices[0]?.message?.content ?? "";

})