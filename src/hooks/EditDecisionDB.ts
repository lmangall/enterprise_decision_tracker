"use server";
import { db } from "@vercel/postgres";
import { Decision } from "@/types/decision";

// Validation is done on the client side (context), in a parent component to prevent unnecessary calls to the backend

export async function editDecisionDB(decision: Decision): Promise<boolean> {
  console.log("editDecisionDB called with:", decision);

  try {
    const client = await db.connect();
    const formattedGoalDate = decision.goal_date
      ? typeof decision.goal_date === "string"
        ? decision.goal_date
        : decision.goal_date.toISOString().split("T")[0]
      : null;

    const result = await client.sql`
      UPDATE decisions
      SET
        golden_ticket = ${decision.golden_ticket},
        title = ${decision.title},
        description = ${decision.description},
        status = ${decision.status},
        goal_met = ${decision.goal_met},
        goal_date = ${formattedGoalDate},
        updated_at = NOW()
      WHERE id = ${decision.id}
      RETURNING id;
    `;

    console.log("SQL query result:", result); // Check this output

    if (result.rowCount === 0) {
      console.error(`No decision found with id ${decision.id}`);
      return false;
    }

    console.log(`Successfully edited decision with id ${decision.id}`);
    return true;
  } catch (error) {
    console.error("Failed to edit decision:", error);
    throw error;
  }
}
