import { useContext } from "react";
import { DecisionContext } from "@/context/DecisionContext";

interface NewGoal {
  title: string;
  description: string;
  measurableGoal: string;
  status: "Pending" | "Completed";
  goalMet: boolean;
  comments?: string;
  targetDate?: string;
  goldenTicket: boolean;
}

// put on db
export async function createGoal(newGoal: NewGoal) {
  try {
    console.log(newGoal);
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
