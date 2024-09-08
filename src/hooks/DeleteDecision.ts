"use server";

import { db } from "@vercel/postgres";

export async function deleteDecision(id: number): Promise<boolean> {
  const client = await db.connect();
  try {
    const result = await client.sql`
      DELETE FROM decisions
      WHERE id = ${id}
      RETURNING id;
    `;

    if (result.rowCount === 0) {
      console.error(`No decision found with id ${id}`);
      return false;
    }

    // console.log(`Successfully deleted decision with id ${id}`);
    return true;
  } catch (error) {
    console.error("Failed to delete decision", error);
    throw error;
  } finally {
    client.release();
  }
}
