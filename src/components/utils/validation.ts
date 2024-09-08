import { Decision } from "@/types/decision";

// Validate if a decision is a duplicate
// unless it's an edit of an existing decision (i.e., same ID).
export const isDuplicateDecision = (
  newDecision: Decision,
  existingDecisions: Decision[]
): boolean => {
  return existingDecisions.some(
    (existingDecision) =>
      existingDecision.id !== newDecision.id && // if the id is the same, false is returned
      (existingDecision.title.toLowerCase() ===
        newDecision.title.toLowerCase() ||
        existingDecision.description?.toLowerCase() ===
          newDecision.description?.toLowerCase() ||
        (existingDecision.description === null &&
          newDecision.description === null) ||
        (existingDecision.description === "" &&
          newDecision.description === "") ||
        existingDecision.measurable_goal.toLowerCase() ===
          newDecision.measurable_goal.toLowerCase())
  );
};
