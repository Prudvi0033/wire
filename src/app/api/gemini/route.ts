import { runGemini } from "@/app/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    const response = await runGemini(prompt);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in /api/gemini:", error);
    return NextResponse.json({ error: "Failed to get Gemini response" }, { status: 500 });
  }
}
