"use client";

import DecisionModal from "@/components/ui/DecisionModal";
import { NewDecision, Decision } from "@/types/decision";

const myDecision: Decision = {
  id: 1,
  golden_ticket: true,
  title: "Sample Decision",
  description: "This is a sample description.",
  measurable_goal: "Achieve X",
  status: "pending",
  goal_met: false,
  comments: "Some comments",
  goal_date: "2024-09-07T00:00:00Z",
  created_at: "2024-09-07T00:00:00Z",
  updated_at: "2024-09-07T00:00:00Z",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow"></main>
      <DecisionModal />
      <footer className="flex items-center justify-center">Footer</footer>
    </div>
  );
}
