import { Decision } from "@/types/decision";

// Validate if a decision is a duplicate

export const isDuplicateDecision = (
  newDecision: Decision,
  existingDecisions: Decision[]
): boolean => {
  return existingDecisions.some(
    (existingDecision) =>
      existingDecision.title.toLowerCase() ===
        newDecision.title.toLowerCase() ||
      existingDecision.description.toLowerCase() ===
        newDecision.description.toLowerCase() ||
      existingDecision.measurable_goal.toLowerCase() ===
        newDecision.measurable_goal.toLowerCase()
  );
};
