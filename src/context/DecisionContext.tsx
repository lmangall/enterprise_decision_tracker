"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface Goal {
  id: number;
  golden_ticket: boolean;
  title: string;
  description: string;
  measurable_goal: string;
  status: "Pending" | "Completed";
  goal_met: boolean;
  comments?: string;
  goal_date?: string;
  created_at: string;
  updated_at: string;
}

interface MyContextType {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
}

const DecisionContext = createContext<MyContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  return (
    <DecisionContext.Provider value={{ goals, setGoals }}>
      {children}
    </DecisionContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(DecisionContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }
  return context;
};
