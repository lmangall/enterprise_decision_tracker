// This component could both add to db and context but it's good practice to separate server-side code and client-side state
// Furthermore, with "use server" React context (useContext) is not accessible

"use server";

import { db } from "@vercel/postgres";
import { NewDecision, Decision } from "@/types/decision";

// Put on db
export async function createDecision(
  newDecision: NewDecision
): Promise<Decision> {
  const client = await db.connect(); // Connect to the database
  try {
    // Insert the new decision into the database
    const result = await client.sql`
      INSERT INTO decisions (
        golden_ticket, title, description, measurable_goal, status, goal_met, comments, goal_date
      ) VALUES (
        ${newDecision.golden_ticket}, ${newDecision.title}, ${newDecision.description}, ${newDecision.measurable_goal}, ${newDecision.status}, ${newDecision.goal_met}, ${newDecision.comments}, ${newDecision.goal_date}
      )
      RETURNING *;
    `;

    // Return the inserted decision, mapping it to the Decision type
    return result.rows[0] as Decision;
  } catch (error) {
    console.error("Failed to create decision", error);
    throw error;
  } finally {
    client.release(); // Release the database connection
  }
}
