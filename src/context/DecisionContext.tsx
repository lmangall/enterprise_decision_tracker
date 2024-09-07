"use client";

import React, { createContext, useState, ReactNode } from "react";
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
    setDecisions((prevDecisions) => [...prevDecisions, decision]);
  };

  const removeDecision = (id: number) => {
    setDecisions((prevDecisions) =>
      prevDecisions.filter((decision) => decision.id !== id)
    );
  };

  const updateDecision = (updatedDecision: Decision) => {
    setDecisions((prevDecisions) =>
      prevDecisions.map((decision) =>
        decision.id === updatedDecision.id ? updatedDecision : decision
      )
    );
  };

  return (
    <DecisionContext.Provider
      value={{ decisions, addDecision, removeDecision, updateDecision }}
    >
      {children}
    </DecisionContext.Provider>
  );
};
