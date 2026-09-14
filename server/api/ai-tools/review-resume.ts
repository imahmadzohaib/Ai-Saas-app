
import { extractText, getDocumentProxy } from 'unpdf'
import { incrementApiLimit } from '~~/server/services/user-api-limit';


export default defineEventHandler(async (event) => {
const formData = await readFormData(event);
  const file = formData.get("resume") as File;
  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "No resume provided" });
  }

  const arrayBuffer = await file.arrayBuffer()

  const buffer = Buffer.from(arrayBuffer);
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, {mergePages:true});

  const prompt =`Review the following resume and provide constructive feedback on its strengtths, weaknesses and areas for improvment.
  Resume Content: \n\n ${text}`

    const response = await openai.chat.completions.create({
      model: "gemini-3.1-flash-lite",
      messages: [
        {
          role: "user",
          content:prompt
        },
      ],
      temperature: 0.5,
      max_completion_tokens: 1000
    })
    
    await incrementApiLimit(event.context.user.id);
    return response.choices[0]?.message?.content ?? "";
})