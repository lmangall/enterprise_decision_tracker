"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FetchAIAdvice } from "@/components/FetchAIAdvice";
import { Decision } from "@/types/decision";

interface DecisionTabsProps {
  selectedDecision: Decision | null;
}

export default function AIHelpCard({ selectedDecision }: DecisionTabsProps) {
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  const handleGetAdvice = async () => {
    if (!selectedDecision) {
      setSelectionError("Select a decision before requesting advice.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectionError(null);

    const result = await FetchAIAdvice(selectedDecision);

    if (result.success) {
      setAiAdvice(result.advice);
    } else {
      // Handle `error` as a string
      console.error("Failed to get AI advice:", result.error);
      setError(result.error || "Failed to get AI advice");
    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Help</CardTitle>
        <CardDescription>
          Get help from AI to achieve your goals and crush those KPIs!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {aiAdvice ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AI Advice:</h3>
            <p className="text-sm">{aiAdvice}</p>
            <Button onClick={() => setAiAdvice(null)}>Get New Advice</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground ">
              Click the button below to get AI-generated advice for your
              selected decision.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGetAdvice}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Advice...
                </>
              ) : (
                "Get AI Advice"
              )}
            </Button>
            {selectionError && (
              <p className="text-sm text-red-500 mt-2">{selectionError}</p>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
