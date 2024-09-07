"use client";

import { useState } from "react";
import { NewDecision, Decision } from "@/types/decision";
import DecisionModal from "@/components/ui/DecisionModal";
import DecisionTable from "@/components/DecisionTable";
import { useDecisionContext } from "@/context/DecisionContext";
import LoadContext from "@/context/LoadContext";
import { Button } from "@/components/ui/button";
import DecisionTabs from "@/components/DecisionTabs"; // Import the new component

export default function Home() {
  const [result, setResult] = useState<Decision | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { decisions } = useDecisionContext();
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(
    null
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto max-w-[59rem] gap-4">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-xl font-semibold">Decision Dashboard</h1>
              <div className="flex md:w-1/3">
                <DecisionModal />
                <Button variant="outline" className="w-full">
                  Button
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Track and manage your decisions
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow md:flex-grow-0 md:w-2/3 border bg-background rounded-xl border shadow">
                <LoadContext />
                <DecisionTable
                  decisions={decisions}
                  onSelectDecision={(decision) => setSelectedDecision(decision)}
                />
              </div>
              <div className="flex-grow md:flex-grow-0 md:w-1/3 rounded-xl border shadow">
                <DecisionTabs selectedDecision={selectedDecision} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
