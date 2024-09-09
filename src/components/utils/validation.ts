import { Decision } from "@/types/decision";

// Validate if a decision is a duplicate
// unless it's an edit of an existing decision (i.e., same ID).
export const isDuplicateDecision = (
  newDecision: Decision,
  existingDecisions: Decision[]
): boolean => {
  if (!Array.isArray(existingDecisions)) {
    console.error("existingDecisions is not an array");
    return false; // or throw an error if needed
  }

  return existingDecisions.some(
    (existingDecision) =>
      existingDecision.id !== newDecision.id && // Check to ensure we don't compare the same decision
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
