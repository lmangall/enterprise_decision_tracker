"use client";

import { useState } from "react";
import { createDecision } from "@/hooks/PostDecision";
import { NewDecision, Decision } from "@/types/decision";
import DecisionModal from "@/components/ui/DecisionModal";

// Create a NewDecision object
const newDecision: NewDecision = {
  golden_ticket: true,
  title: "Sample Decision",
  description: "This is a sample description.",
  measurable_goal: "Achieve X",
  status: "pending",
  goal_met: false,
  comments: "Some comments",
  goal_date: "2024-09-07T00:00:00Z",
};

export default function Home() {
  const [result, setResult] = useState<Decision | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateDecision = async () => {
    console.log("Button clicked: Initiating createDecision");
    console.log("Decision to be created:", newDecision);

    try {
      console.log("Calling createDecision function...");
      const createdDecision = await createDecision(newDecision);
      console.log("createDecision result:", createdDecision);

      setResult(createdDecision);
      console.log("Decision successfully created and state updated.");
    } catch (error) {
      console.error("Error creating decision:", error);
      setError("Error creating decision");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow">
        <button
          onClick={handleCreateDecision}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Decision
        </button>
        {result && (
          <div className="mt-4 p-4 border rounded border-gray-300">
            <h3 className="font-bold">Created Decision:</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 border rounded border-red-300 text-red-600">
            {error}
          </div>
        )}
      </main>
      <DecisionModal />
      <footer className="flex items-center justify-center">Footer</footer>
    </div>
  );
}
