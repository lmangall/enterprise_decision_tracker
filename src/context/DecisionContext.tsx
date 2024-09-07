"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { Decision } from "../types/decision";

interface DecisionContextProps {
  decisions: Decision[];
  addDecision: (decision: Decision) => void;
  removeDecision: (id: number) => void;
  updateDecision: (decision: Decision) => void;
}

export const DecisionContext = createContext<DecisionContextProps | undefined>(
  undefined
);

export const DecisionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  const addDecision = (decision: Decision) => {
    //TODO: add validation: check for existing name or description
    //TODO: add validation: check for existing measurable goal
    //TODO: it should assign a unique id to the decision
    setDecisions((prevDecisions) => {
      const updatedDecisions = [...prevDecisions, decision];
      console.log("Added decision:", decision);
      console.log("Current context decisions:", updatedDecisions);
      return updatedDecisions;
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
      value={{ decisions, addDecision, removeDecision, updateDecision }}
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
