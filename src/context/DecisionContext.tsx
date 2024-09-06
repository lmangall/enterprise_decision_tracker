"use client";

import React, { createContext, useState, ReactNode } from "react";

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

interface DecisionContextProps {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  removeGoal: (id: number) => void;
  updateGoal: (goal: Goal) => void;
}

export const DecisionContext = createContext<DecisionContextProps | undefined>(
  undefined
);

export const DecisionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = (goal: Goal) => {
    setGoals((prevGoals) => [...prevGoals, goal]);
  };

  const removeGoal = (id: number) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  };

  return (
    <DecisionContext.Provider
      value={{ goals, addGoal, removeGoal, updateGoal }}
    >
      {children}
    </DecisionContext.Provider>
  );
};
