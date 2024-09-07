"use client";

import { useState } from "react";
import { createDecision } from "@/hooks/PostDecision";
import { NewDecision, Decision } from "@/types/decision";
import DecisionModal from "@/components/ui/DecisionModal";
import { DecisionTable } from "@/components/DecisionTable";
import { DecisionContext } from "@/context/DecisionContext";

const decisions: Decision[] = [
  {
    id: 1,
    golden_ticket: true,
    title: "Sample Decision",
    description: "not from context",
    measurable_goal: "Achieve X",
    status: "pending",
    goal_met: false,
    comments: "Some comments",
    goal_date: "2024-09-07T00:00:00Z",
    created_at: "2024-09-07T00:00:00Z",
    updated_at: "2024-09-07T00:00:00Z",
  },
  {
    id: 2,
    golden_ticket: false,
    title: "Another Decision",
    description: "not from context 2",
    measurable_goal: "Achieve Y",
    status: "in process",
    goal_met: false,
    comments: "Some comments",
    goal_date: "2024-09-07T00:00:00Z",
    created_at: "2024-09-07T00:00:00Z",
    updated_at: "2024-09-07T00:00:00Z",
  },
];

export default function Home() {
  const [result, setResult] = useState<Decision | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow">
        <DecisionTable decisions={decisions} />
      </main>
      <DecisionModal />
      <footer className="flex items-center justify-center">Footer</footer>
    </div>
  );
}
