// EditDecision.ts
import { useContext } from "react";
import { DecisionContext } from "@/context/DecisionContext";

interface UpdatedGoal {
  id: number;
  title: string;
  description: string;
  measurableGoal: string;
  status: "Pending" | "Completed";
  goalMet: boolean;
  comments?: string;
  targetDate?: string;
  goldenTicket: boolean;
}

export async function editDecision(updatedGoal: UpdatedGoal) {
  const { updateGoal } = useContext(DecisionContext);
  try {
    // Replace with your actual API call
    const response = await fetch(`/api/goals/${updatedGoal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGoal),
    });

    if (!response.ok) throw new Error("Failed to update goal");

    const goal = await response.json();
    updateGoal(goal);
  } catch (error) {
    console.error(error);
  }
}
