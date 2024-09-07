import { useEffect, useState } from "react";
import retrieveDecisions from "@/context/RetrieveDecisions";
import { useDecisionContext } from "@/context/DecisionContext";
import { Decision } from "@/types/decision";

// Component that loads decisions into the context when the app starts, only if not already loaded
const LoadContext: React.FC = () => {
  const { decisions, addDecision } = useDecisionContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if decisions are already loaded in the context
    if (decisions.length === 0) {
      const fetchDecisions = async () => {
        try {
          const fetchedDecisions: Decision[] = await retrieveDecisions();
          fetchedDecisions.forEach((decision) => addDecision(decision));
          setLoading(false);
        } catch (err) {
          console.error("Failed to load decisions", err);
          setError("Failed to load decisions");
          setLoading(false);
        }
      };

      fetchDecisions();
    } else {
      setLoading(false); // no need to load if decisions are already in context
    }
  }, [decisions, addDecision]);

  if (loading) {
    return <div>Loading decisions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
};

export default LoadContext;
