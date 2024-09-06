import { useContext } from "react";
import { DecisionContext } from "@/context/DecisionContext";

interface NewGoal {
  id: number;
  golden_ticket: boolean;
  title: string;
  description: string;
  measurable_goal: string;
  status: "Pending" | "Completed";
  goal_met: boolean;
  comments?: string;
  goal_date?: string;
  created_at: string;
  updated_at: string;
}

// put on db
export async function createGoal(newGoal: NewGoal): Promise<NewGoal> {
  try {
    console.log(newGoal);
    // simulate returning the goal
    return newGoal;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function usePostGoal() {
  const context = useContext(DecisionContext);

  if (!context) {
    throw new Error("usePostGoal must be used within a DecisionProvider");
  }

  //destructuring assignment:extracts addGoal function from  context
  const { addGoal } = context;

  const postGoal = async (newGoal: NewGoal) => {
    try {
      const goal = await createGoal(newGoal);
      addGoal(goal);
    } catch (error) {
      console.error("Failed to post goal", error);
    }
  };

  return { postGoal };
}
