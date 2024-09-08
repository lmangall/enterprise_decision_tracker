"use server";

import { Decision } from "@/types/decision";

export async function fetchAIDecision(userInput: string) {
  const prompt = `Transform my user input into a json formatted goal:
  - title: The title of the decision
  - description: A brief description of the decision
  - measurable_goal: A goal that can be measured
  - goal_date: The date by which the goal should be met (in ISO format)

  Here is the user input:
  ${userInput}

  Respect this format:
  {
    "title": "string",
    "description": "string",
    "measurable_goal": "string",
    "goal_date": "string (ISO format)"
  }

  Please provide a JSON response following this structure.`;

  console.log(prompt);

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
    console.log("API response:", data);
    const content = data.choices[0].message.content;
    console.log("choice0:", content);

    if (data.choices && data.choices.length > 0) {
      const parsedDecision = JSON.parse(content);
      console.log("-Parsed Decision:", parsedDecision);

      // Map to NewDecision
      const decision = mapToNewDecision(parsedDecision);
      return { success: true, data: decision };
    } else {
      throw new Error("No decision found from OpenAI");
    }
  } catch (error) {
    const errorMessage =
      (error as Error).message || "An unknown error occurred";
    console.error("Error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

function mapToNewDecision(parsedData: any): Decision {
  return {
    id: 0, //TODO: verify that both in the context and db this is changed
    created_at: "",
    updated_at: "",
    golden_ticket: false, // Default or derived from parsedData
    title: parsedData.title || "Untitled",
    description: parsedData.description || "No description provided",
    measurable_goal:
      parsedData.measurable_goal || "No measurable goal provided",
    status: "pending", // Default or inferred from parsedData
    goal_met: false, // Default or derived from parsedData
    comments: "", // Default or derived from parsedData
    goal_date: parsedData.goal_date
      ? new Date(parsedData.goal_date).toISOString()
      : null,
  };
}
