"use server";

import { Decision } from "@/types/decision";
import { createDecision } from "@/hooks/PostDecision";

// map API response to Decision type
function mapToDecision(parsedData: any): Decision {
  // check goal_date
  let goalDate: string | null = null;
  if (parsedData.goal_date) {
    const date = new Date(parsedData.goal_date);
    if (!isNaN(date.getTime())) {
      goalDate = date.toISOString();
    }
  }

  return {
    id: 0, // hardcoded, modified when added to context
    created_at: "", // hardcoded, modified later
    updated_at: "", // hardcoded, modified later
    golden_ticket: false,
    title: parsedData.title || "Untitled",
    description: parsedData.description || "No description provided",
    measurable_goal:
      parsedData.measurable_goal || "No measurable goal provided",
    status: "pending", // hardcoded
    goal_met: false, // hardcoded
    comments: "", // hardcoded empty, define when goal reached
    goal_date: goalDate,
  };
}

// fetch and create decision on server
export async function fetchAndCreateDecision(userInput: string) {
  const prompt = `Transform my user input into a JSON formatted goal:
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
    const content = data.choices[0].message.content;

    if (data.choices && data.choices.length > 0) {
      const parsedDecision = JSON.parse(content);
      const decision = mapToDecision(parsedDecision);

      // Save decision to the database
      await createDecision(decision);
      return { success: true, data: decision };
    } else {
      throw new Error("No decision found from OpenAI");
    }
  } catch (error) {
    if (error instanceof Error) {
      // Handle known Error type (due to ts)
      console.error("Error:", error.message || "An unknown error occurred");
      return {
        success: false,
        error: error.message || "An unknown error occurred",
      };
    } else {
      // Handle unknown error type (due to ts)
      console.error("Error:", "An unknown error occurred");
      return {
        success: false,
        error: "An unknown error occurred",
      };
    }
  }
}
