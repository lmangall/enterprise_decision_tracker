"use server";
import { db } from "@vercel/postgres";
import { Decision } from "@/types/decision";

//Validation is done on the client side (context), in a parent component to prevent unnecessary calls to the backend

export async function editDecision(decision: Decision): Promise<boolean> {
  const client = await db.connect();

  const formattedGoalDate = decision.goal_date
    ? typeof decision.goal_date === "string"
      ? decision.goal_date
      : decision.goal_date.toISOString().split("T")[0] // Format Date as 'YYYY-MM-DD'
    : null;

  try {
    const result = await client.sql`
      UPDATE decisions
      SET
        golden_ticket = ${decision.golden_ticket},
        title = ${decision.title},
        description = ${decision.description},
        measurable_goal = ${decision.measurable_goal},
        status = ${decision.status},
        goal_met = ${decision.goal_met},
        comments = ${decision.comments},
      goal_date = ${formattedGoalDate},
        updated_at = NOW()
      WHERE id = ${decision.id}
      RETURNING id;
    `;

    if (result.rowCount === 0) {
      console.error(`No decision found with id ${decision.id}`);
      return false;
    }

    console.log(`Successfully edited decision with id ${decision.id}`);
    return true;
  } catch (error) {
    console.error("Failed to edit decision", error);
    throw error;
  } finally {
    client.release();
  }
}
