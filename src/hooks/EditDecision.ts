"use server";
import { db } from "@vercel/postgres";
import { Decision } from "@/types/decision";

//TODO: validation
export async function editDecision(decision: Decision): Promise<boolean> {
  const client = await db.connect();
  try {
    const result = await client.sql`
      DELETE FROM decisions
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
