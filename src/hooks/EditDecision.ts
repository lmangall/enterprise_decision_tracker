"use server";
import { db } from "@vercel/postgres";
import { Decision } from "@/types/decision";

//TODO: validation has to be client side (context), in a parent component
// import { isDuplicateDecision } from "@/components/utils/validation";

export async function editDecision(decision: Decision): Promise<boolean> {
  const client = await db.connect();
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
        goal_date = ${decision.goal_date},
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
