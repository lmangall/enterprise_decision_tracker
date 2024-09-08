import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Decision } from "@/types/decision";

interface DecisionTabsProps {
  selectedDecision: Decision | null;
}

const DecisionTabs: React.FC<DecisionTabsProps> = ({ selectedDecision }) => {
  return (
    <Tabs defaultValue="details" className="relative z-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Detail</TabsTrigger>
        <TabsTrigger value="about">AI Help</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="max-h-96 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Decision Details</CardTitle>
            <CardDescription>
              Select a decision from the table to view details
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
                  <strong>Goal:</strong> {selectedDecision.measurable_goal}
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
      <TabsContent value="about" className="max-h-96 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>AI Help</CardTitle>
            <CardDescription>
              Get help from AI to achieve your goals and crush those KPIs!{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Something here</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DecisionTabs;
