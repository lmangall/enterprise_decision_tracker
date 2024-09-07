"use client";

import { useState } from "react";
import { createDecision } from "@/hooks/PostDecision";
import { NewDecision, Decision } from "@/types/decision";
import DecisionModal from "@/components/ui/DecisionModal";
import DecisionTable from "@/components/DecisionTable";
import { useDecisionContext } from "@/context/DecisionContext";
import LoadContext from "@/context/LoadContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, AtSignIcon, UserIcon } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState<Decision | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { decisions } = useDecisionContext();
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(
    null
  );

  return (
    <div className="flex min-h-screen">
      <nav className="w-16 bg-gray-100 flex flex-col items-center py-4 space-y-4">
        <Button variant="ghost" size="icon">
          <PlusIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <AtSignIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <UserIcon className="h-6 w-6" />
        </Button>
      </nav>
      <main className="flex-grow flex">
        <div className="w-2/3 p-6">
          <h1 className="text-3xl font-bold mb-2">Decision Dashboard</h1>
          <p className="text-gray-600 mb-6">Track and manage your decisions</p>
          <LoadContext />
          <DecisionTable
            decisions={decisions}
            onSelectDecision={(decision) => setSelectedDecision(decision)}
          />
        </div>
        <div className="w-1/3 bg-gray-50 p-6">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Decision Details</CardTitle>
                  <CardDescription>
                    View the selected decision s details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDecision ? (
                    <div>
                      <h3 className="font-bold">{selectedDecision.title}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedDecision.description}
                      </p>
                      <p className="mt-2">
                        <strong>Goal:</strong>{" "}
                        {selectedDecision.measurable_goal}
                      </p>
                      <p>
                        <strong>Status:</strong> {selectedDecision.status}
                      </p>
                      <p>
                        <strong>Goal Met:</strong>{" "}
                        {selectedDecision.goal_met ? "Yes" : "No"}
                      </p>
                    </div>
                  ) : (
                    <p>Select a decision to view details</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                  <CardDescription>
                    Information about the Decision Dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    The Decision Dashboard helps you track and manage important
                    decisions. Use this tool to set goals, monitor progress, and
                    evaluate outcomes.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <DecisionModal />
    </div>
  );
}
