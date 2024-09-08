"use server";

import { db } from "@vercel/postgres";
import { NewDecision, Decision } from "@/types/decision";

export async function createDecision(
  newDecision: NewDecision
): Promise<Decision> {
  const client = await db.connect(); // Connect to the database

  try {
    // Format goal_date to 'YYYY-MM-DD' if it's a Date object, otherwise use the string directly
    const formattedGoalDate = newDecision.goal_date
      ? typeof newDecision.goal_date === "string"
        ? newDecision.goal_date
        : newDecision.goal_date.toISOString().split("T")[0]
      : null;

    const result = await client.sql`
      INSERT INTO decisions (
        golden_ticket, title, description, measurable_goal, status, goal_met, comments, goal_date
      ) VALUES (
        ${newDecision.golden_ticket}, ${newDecision.title}, ${newDecision.description}, ${newDecision.measurable_goal}, ${newDecision.status}, ${newDecision.goal_met}, ${newDecision.comments}, ${formattedGoalDate}
      )
      RETURNING *;
    `;

    // Convert date fields to strings
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
    throw error; // Re-throw the error to be handled by the caller
  } finally {
    client.release(); // Release the database connection
  }
}
