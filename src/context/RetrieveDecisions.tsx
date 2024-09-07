"use server";

import { db } from "@vercel/postgres";
import { Decision } from "@/types/decision";

// query the database and return an array of decisions from db
export default async function retrieveDecisions(): Promise<Decision[]> {
  const client = await db.connect();
  try {
    const result = await client.sql`SELECT * FROM decisions;`;
    //needs to be mapped from the db to the Decision type
    const decisions: Decision[] = result.rows.map((row) => ({
      id: row.id,
      created_at: row.created_at.toISOString(), // convert to ISO string
      updated_at: row.updated_at.toISOString(), // Convert to ISO string
      golden_ticket: row.golden_ticket,
      title: row.title,
      description: row.description,
      measurable_goal: row.measurable_goal,
      status: row.status,
      goal_met: row.goal_met,
      comments: row.comments,
      goal_date: row.goal_date ? row.goal_date.toISOString() : null,
    }));
    console.log("Loaded decisions from DB:", decisions);
    return decisions;
  } catch (error) {
    console.error("Failed to load decisions from the database", error);
    throw error;
  } finally {
    client.release();
  }
}

// hardcode the decisions for now
// export default async function retrieveDecisions(): Promise<Decision[]> {
//   const decisions: Decision[] = [
//     {
//       id: 0,
//       created_at: "",
//       updated_at: "",
//       golden_ticket: false,
//       title: "title 1",
//       description: "hardcoded not from db",
//       measurable_goal: "Goal 1",
//       status: "pending",
//       goal_met: false,
//       goal_date: "2022-01-01T00:00:00.000Z",
//     },
//     {
//       id: 1,
//       created_at: "",
//       updated_at: "",
//       golden_ticket: false,
//       title: "Title 2",
//       description: "hardcoded not from db2",
//       measurable_goal: "Goal 2",
//       status: "in process",
//       goal_met: false,
//       goal_date: "2022-02-02T00:00:00.000Z",
//     },
//     {
//       id: 2,
//       created_at: "",
//       updated_at: "",
//       golden_ticket: false,
//       title: "Title 3",
//       description: "hardcoded not from db3",
//       measurable_goal: "Goal 3",
//       status: "completed",
//       goal_met: true,
//       goal_date: "2022-03-03T00:00:00.000Z",
//     },
//   ];
//   console.log("Loaded decisions from hardcoded data:", decisions);
//   return decisions;
// }
