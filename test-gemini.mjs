import 'dotenv/config'

const key = process.env.NUXT_GEMINI_API

console.log('KEY EXISTS:', !!key)
console.log('KEY LENGTH:', key?.length)

const response = await fetch(
  'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "gemini-3.1-flash-lite",
      messages: [
        {
          role: 'user',
          content: 'Say hello',
        },
      ],
    }),
    signal: AbortSignal.timeout(30000),
  }
)

console.log('STATUS:', response.status)
console.log('RESPONSE:', await response.text())