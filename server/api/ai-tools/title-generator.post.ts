


export default defineEventHandler(async(event) =>{
    const { blogTopic, blogCatogery }  = await readBody(event)

    if(!blogTopic){
        throw createError({
            statusCode: 400,
            statusMessage: "blog title is required"
        })
    }    

    if(!blogCatogery){
        throw  createError({
            statusCode: 400,
            statusMessage: " Blog catogery is required"
        })
    }

    const prompt = `Generate a blog title for the keyword ${blogTopic} in the category ${blogCatogery}`;
    const response = await openai.chat.completions.create({
      model: "gemini-3.1-flash-lite",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_completion_tokens: 200,

    });

    return response.choices[0]?.message?.content ?? "";

})