import { useContext } from "react";
import { DecisionContext } from "@/context/DecisionContext";

interface NewDecision {
  id: number;
  golden_ticket: boolean;
  title: string;
  description: string;
  measurable_Decision: string;
  status: "Pending" | "Completed";
  goal_met: boolean;
  comments?: string;
  goal_date?: string;
  created_at: string;
  updated_at: string;
}

// Put on db
export async function createDecision(
  newDecision: NewDecision
): Promise<NewDecision> {
  try {
    console.log(newDecision);
    // Simulate returning the decision
    return newDecision;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function usePostDecision() {
  const context = useContext(DecisionContext);

  if (!context) {
    throw new Error("usePostDecision must be used within a DecisionProvider");
  }

  // Destructuring assignment: extracts addDecision function from context
  const { addDecision } = context;

  const postDecision = async (newDecision: NewDecision) => {
    try {
      const decision = await createDecision(newDecision); // Call createDecision
      addDecision(decision);
    } catch (error) {
      console.error("Failed to post decision", error);
    }
  };

  return { postDecision };
}
