"use client";

import { useState } from "react";
import { createDecision } from "@/hooks/PostDecision";
import { NewDecision, Decision } from "@/types/decision";
import DecisionModal from "@/components/ui/DecisionModal";
import { DecisionTable } from "@/components/DecisionTable";
import { useDecisionContext } from "@/context/DecisionContext";
import LoadContext from "@/context/LoadContext";

export default function Home() {
  const [result, setResult] = useState<Decision | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { decisions } = useDecisionContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow">
        {/* load decisions from the context */}
        <LoadContext />
        <DecisionTable decisions={decisions} />
      </main>
      <DecisionModal />
      <footer className="flex items-center justify-center">Footer</footer>
    </div>
  );
}
