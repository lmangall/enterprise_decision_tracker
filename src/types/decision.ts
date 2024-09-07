export interface NewDecision {
  golden_ticket: boolean;
  title: string;
  description: string;
  measurable_goal: string;
  status: "pending" | "in process" | "completed";
  goal_met?: boolean;
  comments?: string;
  goal_date?: string | Date | null;
}

export interface Decision extends NewDecision {
  id: number;
  created_at: string;
  updated_at: string;
}
