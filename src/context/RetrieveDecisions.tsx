"use server";

import { db } from "@vercel/postgres";
import { Decision } from "@/types/decision";

// Query the database and return an array of decisions from the DB
export default async function retrieveDecisions(): Promise<Decision[]> {
  const client = await db.connect();
  try {
    const result = await client.sql`SELECT * FROM decisions;`;

    // Map the result rows to the Decision type
    const decisions: Decision[] = result.rows.map((row) => ({
      id: row.id,
      created_at: row.created_at.toISOString(), // Convert to ISO string
      updated_at: row.updated_at.toISOString(), // Convert to ISO string
      golden_ticket: row.golden_ticket,
      title: row.title,
      description: row.description,
      measurable_goal: row.measurable_goal,
      status: row.status,
      goal_met: row.goal_met,
      comments: row.comments,
      goal_date: row.goal_date ? row.goal_date.toISOString() : null, // Convert to ISO string or null
    }));

    // console.log("Loaded decisions from DB:", decisions);
    return decisions;
  } catch (error) {
    console.error("Failed to load decisions from the database", error);
    throw error; // Propagate the error to be handled by the caller
  } finally {
    client.release(); // Ensure the connection is released
  }
}
