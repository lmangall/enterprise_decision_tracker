"use server";

// import { db } from "@vercel/postgres";
import { Decision } from "@/types/decision";

// query the database and return an array of decisions from db
// export async function retrieveDecisions(): Promise<DecisionX[]> {
//   const client = await db.connect();
//   try {
//     const result = await client.sql`SELECT * FROM decisions;`;
//     const Decision: DecisionX[] = result.rows;
//     console.log("Loaded decisions from DB:", Decision);
//     return Decision;
//   } catch (error) {
//     console.error("Failed to load decisions from the database", error);
//     throw error;
//   } finally {
//     client.release();
//   }
// }

// hardcode the decisions for now
export default async function retrieveDecisions(): Promise<Decision[]> {
  const decisions: Decision[] = [
    {
      id: 0,
      created_at: "",
      updated_at: "",
      golden_ticket: false,
      title: "hardcoded not from db",
      description: "Description 1",
      measurable_goal: "Goal 1",
      status: "pending",
      goal_met: false,
      goal_date: "2022-01-01T00:00:00.000Z",
    },
    {
      id: 1,
      created_at: "",
      updated_at: "",
      golden_ticket: false,
      title: "Title 2",
      description: "hardcoded not from db2",
      measurable_goal: "Goal 2",
      status: "in process",
      goal_met: false,
      goal_date: "2022-02-02T00:00:00.000Z",
    },
    {
      id: 2,
      created_at: "",
      updated_at: "",
      golden_ticket: false,
      title: "Title 3",
      description: "hardcoded not from db3",
      measurable_goal: "Goal 3",
      status: "completed",
      goal_met: true,
      goal_date: "2022-03-03T00:00:00.000Z",
    },
  ];
  console.log("Loaded decisions from hardcoded data:", decisions);
  return decisions;
}
