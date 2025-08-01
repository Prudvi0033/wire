'use server'

import { runGemini } from "../lib/gemini"

export async function askGemini(prompt: string){
    const result = await runGemini(`${prompt}`)
    return result
}