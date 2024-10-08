import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Decision } from "@/types/decision";
import AIAdviceCard from "@/components/AIAdviceCard";

interface DecisionTabsProps {
  selectedDecision: Decision | null;
}

const DecisionTabs: React.FC<DecisionTabsProps> = ({ selectedDecision }) => {
  return (
    <Tabs defaultValue="details" className="relative z-10 ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Detail</TabsTrigger>
        <TabsTrigger value="about">AI Help</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDecision ? selectedDecision.title : "Decision Details"}
            </CardTitle>
            <CardDescription className="text-sm text-gray-700 mb-5">
              {selectedDecision
                ? selectedDecision.description
                : "Select a decision from the table to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDecision ? (
              <div>
                <div className="mt-2">
                  <span className="text-sm font-semibold leading-none">
                    Goal:
                  </span>{" "}
                  <span className="text-sm text-gray-700">
                    {selectedDecision.measurable_goal}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold leading-none">
                    Status:
                  </span>{" "}
                  <Badge
                    variant={
                      selectedDecision.status === "completed"
                        ? "default"
                        : selectedDecision.status === "in process"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {selectedDecision.status}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm font-semibold leading-none">
                    Goal Met:
                  </span>{" "}
                  <span className="text-sm text-gray-700">
                    {selectedDecision.goal_met ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            ) : (
              <p>.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="about" className=" overflow-y-auto">
        <AIAdviceCard selectedDecision={selectedDecision} />
      </TabsContent>
    </Tabs>
  );
};

export default DecisionTabs;
