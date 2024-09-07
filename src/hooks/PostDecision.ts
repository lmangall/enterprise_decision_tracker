// This component could both add to db and context but it's good practice to separate server-side code and client-side state
// Furthermore, with "use server" React context (useContext) is not accessible

"use server";

import { db } from "@vercel/postgres";
import { NewDecision, Decision } from "@/types/decision";

// Put on db
//TODO: modify createDecision to updateDecision: it should update the db relative to the context, it doesn't need to be passed a prop
export async function createDecision(
  newDecision: NewDecision
): Promise<Decision> {
  const client = await db.connect(); // Connect to the database
  try {
    const result = await client.sql`
      INSERT INTO decisions (
        golden_ticket, title, description, measurable_goal, status, goal_met, comments, goal_date
      ) VALUES (
        ${newDecision.golden_ticket}, ${newDecision.title}, ${newDecision.description}, ${newDecision.measurable_goal}, ${newDecision.status}, ${newDecision.goal_met}, ${newDecision.comments}, ${newDecision.goal_date}
      )
      RETURNING *;
    `;

    //convert date fields to strings
    const insertedDecision = {
      ...result.rows[0],
      created_at: result.rows[0].created_at.toISOString(),
      updated_at: result.rows[0].updated_at.toISOString(),
      goal_date: result.rows[0].goal_date
        ? result.rows[0].goal_date.toISOString()
        : null,
    };

    return insertedDecision as Decision;
  } catch (error) {
    console.error("Failed to create decision", error);
    throw error;
  } finally {
    client.release();
  }
}
