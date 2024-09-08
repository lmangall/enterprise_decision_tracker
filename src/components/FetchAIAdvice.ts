"use server";

import { Decision } from "@/types/decision";

export async function FetchAIAdvice(decision: Decision) {
  const prompt = `I want to ${decision.title}, exactly: ${decision.description} my goal: ${decision.measurable_goal} answer with a question and its answer/advice`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from OpenAI");
    }

    const data = await response.json();
    const AIAdvice = data.choices[0].message.content;

    return { success: true, advice: AIAdvice };
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : "An unknown error occurred"
    );
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
