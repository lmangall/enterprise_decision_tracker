"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { Decision } from "../types/decision";
import { isDuplicateDecision } from "../components/utils/validation";

interface DecisionContextProps {
  decisions: Decision[];
  addDecisionFromDB: (decision: Decision) => void;
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

  const addDecisionFromDB = (decision: Decision) => {
    // Check for duplicates based on the id to avoid adding the same decision
    if (decisions.some((d) => d.id === decision.id)) {
      console.error("A decision with this ID already exists.");
      return; // Do not update the state
    }

    setDecisions((prevDecisions) => {
      //console.log("Added decision from DB:", decision);
      //console.log("Current context decisions:", [...prevDecisions, decision]);
      return [...prevDecisions, decision];
    });
  };

  const addDecision = (decision: Decision) => {
    // Check for duplicates first
    if (isDuplicateDecision(decision, decisions)) {
      // Throw an error instead of just logging it
      throw new Error("A decision with similar details already exists.");
    }

    // Proceed to add the decision
    setDecisions((prevDecisions) => {
      const lastId =
        prevDecisions.length > 0
          ? Math.max(...prevDecisions.map((d) => d.id))
          : 0;
      const newDecision = { ...decision, id: lastId + 1 };

      //console.log("Added decision:", newDecision);
      console.log("Current context decisions:", [
        ...prevDecisions,
        newDecision,
      ]);
      return [...prevDecisions, newDecision];
    });
  };

  const removeDecision = (id: number) => {
    setDecisions((prevDecisions) => {
      const updatedDecisions = prevDecisions.filter(
        (decision) => decision.id !== id
      );
      //console.log("Removed decision with id:", id);
      //console.log("Current context decisions:", updatedDecisions);
      return updatedDecisions;
    });
  };

  const updateDecision = (updatedDecision: Decision) => {
    setDecisions((prevDecisions) => {
      const updatedDecisions = prevDecisions.map((decision) =>
        decision.id === updatedDecision.id ? updatedDecision : decision
      );
      //console.log("Updated decision:", updatedDecision);
      //console.log("Current context decisions:", updatedDecisions);
      return updatedDecisions;
    });
  };

  return (
    <DecisionContext.Provider
      value={{
        decisions,
        addDecision,
        addDecisionFromDB,
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
