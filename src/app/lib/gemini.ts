import { GoogleGenerativeAI } from "@google/generative-ai"

const ai = new GoogleGenerativeAI (process.env.GEMINI_API_KEY!)
const model = ai.getGenerativeModel({
  model: "gemini-2.5-pro"
})
export async function runGemini(prompt: string) {
  try {
    const result = await model.generateContentStream(prompt);
    let entireText = ""
    for await (const chunk of result.stream){
      entireText += chunk.text()
    }
    return entireText
  } catch (error) {
    console.error("Error in runGemini:", error);
    return "Something went wrong!";
  }
}