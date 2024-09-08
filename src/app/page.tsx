"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DecisionModal from "@/components/modals/DecisionModal";
import DecisionTable from "@/components/DecisionTable";
import { useDecisionContext } from "@/context/DecisionContext";
import LoadContext from "@/context/LoadContext";
import { Button } from "@/components/ui/button";
import DecisionTabs from "@/components/DecisionTabs";
import { Decision } from "@/types/decision";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { decisions } = useDecisionContext();
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(
    null
  );
  const { toast } = useToast();

  // Define showToast to handle both title and message
  const showToast = (title: string, message: string) => {
    const variant = title === "Error" ? "error" : "default";

    toast({
      title: title,
      description: message,
      variant: variant,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen sm:gap-4">
      <div className="flex flex-col sm:gap-4">
        <main className="grid flex-1">
          <div className="max-w-[59rem] gap-4">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-xl font-semibold">Decision Dashboard</h1>
              <div className="flex md:w-1/3">
                <DecisionModal
                  setToast={(title, message) => showToast(title, message)}
                />
                <Button
                  onClick={() => {
                    console.log("Button clicked");
                    showToast("Button Clicked", "The button has been clicked");
                  }}
                >
                  Button
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Track and manage your decisions
            </p>
            <div className="sticky flex flex-col md:flex-row gap-4">
              <div className="sticky md:w-2/3 border rounded-xl border shadow">
                <LoadContext />
                <DecisionTable
                  decisions={decisions}
                  onSelectDecision={(decision) => setSelectedDecision(decision)}
                />
              </div>
              <div className="sticky md:w-1/3 bg-background rounded-xl border shadow">
                <DecisionTabs selectedDecision={selectedDecision} />
              </div>
            </div>
          </div>
        </main>
        <div className="flex w-full items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Subscribe</Button>
        </div>
      </div>
    </div>
  );
}
