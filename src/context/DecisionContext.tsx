"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { Decision } from "../types/decision";

interface DecisionContextProps {
  decisions: Decision[];
  addDecision: (decision: Decision) => void;
  removeDecision: (id: number) => void;
  updateDecision: (decision: Decision) => void;
  fetched: boolean;
  setFetched: (fetched: boolean) => void;
}

export const DecisionContext = createContext<DecisionContextProps | undefined>(
  undefined
);

export const DecisionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [fetched, setFetched] = useState(false); //track if decisions are already loaded

  const addDecision = (decision: Decision) => {
    return new Promise<void>((resolve, reject) => {
      setDecisions((prevDecisions) => {
        // Validation: check for existing name or description or measurable goal
        const isDuplicate = prevDecisions.some(
          (existingDecision) =>
            existingDecision.title.toLowerCase() ===
              decision.title.toLowerCase() ||
            existingDecision.description.toLowerCase() ===
              decision.description.toLowerCase() ||
            existingDecision.measurable_goal.toLowerCase() ===
              decision.measurable_goal.toLowerCase()
        );

        if (isDuplicate) {
          reject(new Error("A decision with similar details already exists."));
          return prevDecisions; // Return the previous state without adding the new decision
        }

        // Assign a unique id to the decision: +1 to the last id
        const lastId =
          prevDecisions.length > 0
            ? Math.max(...prevDecisions.map((d) => d.id))
            : 0;
        const newDecision = { ...decision, id: lastId + 1 };

        const updatedDecisions = [...prevDecisions, newDecision];
        console.log("Added decision:", newDecision);
        console.log("Current context decisions:", updatedDecisions);
        resolve();
        return updatedDecisions;
      });
    });
  };

  const removeDecision = (id: number) => {
    setDecisions((prevDecisions) => {
      const updatedDecisions = prevDecisions.filter(
        (decision) => decision.id !== id
      );
      console.log("Removed decision with id:", id);
      console.log("Current context decisions:", updatedDecisions);
      return updatedDecisions;
    });
  };

  const updateDecision = (updatedDecision: Decision) => {
    setDecisions((prevDecisions) => {
      const updatedDecisions = prevDecisions.map((decision) =>
        decision.id === updatedDecision.id ? updatedDecision : decision
      );
      console.log("Updated decision:", updatedDecision);
      console.log("Current context decisions:", updatedDecisions);
      return updatedDecisions;
    });
  };

  return (
    <DecisionContext.Provider
      value={{
        decisions,
        addDecision,
        removeDecision,
        updateDecision,
        fetched,
        setFetched,
      }}
    >
      {children}
    </DecisionContext.Provider>
  );
};

// Custom hook to use the DecisionContext
export const useDecisionContext = () => {
  const context = useContext(DecisionContext);
  if (context === undefined) {
    throw new Error(
      "useDecisionContext must be used within a DecisionProvider"
    );
  }
  return context;
};
