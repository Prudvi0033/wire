import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI ({
    apiKey: process.env.GEMINI_API_KEY
})
export async function runGemini(prompt: string) {
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: `${prompt}`
    })
    return response.text
  } catch (error) {
    console.error("Error in runGemini:", error);
    return "Something went wrong!";
  }
}