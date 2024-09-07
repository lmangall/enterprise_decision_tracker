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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <Button variant="ghost" size="icon">
          <PlusIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <AtSignIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <UserIcon className="h-5 w-5" />
        </Button>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto max-w-[59rem]  gap-4">
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
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-2 p-2">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="details"
                    className="max-h-96 overflow-y-auto"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Decision Details</CardTitle>
                        <CardDescription>
                          View the selected decision's details
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {selectedDecision ? (
                          <div>
                            <h3 className="font-bold">
                              {selectedDecision.title}
                            </h3>
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
                  <TabsContent
                    value="about"
                    className="max-h-96 overflow-y-auto"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>About</CardTitle>
                        <CardDescription>
                          Information about the Decision Dashboard
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>
                          The Decision Dashboard helps you track and manage
                          important decisions. Use this tool to set goals,
                          monitor progress, and evaluate outcomes.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
