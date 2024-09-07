import { useEffect, useState } from "react";
import retrieveDecisions from "@/context/RetrieveDecisions";
import { useDecisionContext } from "@/context/DecisionContext";
import { Decision } from "@/types/decision";

// Component that loads decisions into the context when the app starts
const LoadContext: React.FC = () => {
  const { addDecision } = useDecisionContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        // Retrieve decisions (hardcoded for now)
        const decisions: Decision[] = retrieveDecisions();
        // Load decisions into the context
        decisions.forEach((decision) => addDecision(decision));
        setLoading(false);
      } catch (err) {
        console.error("Failed to load decisions", err);
        setError("Failed to load decisions");
        setLoading(false);
      }
    };

    fetchDecisions(); // Call the function when the component mounts
  }, [addDecision]);

  if (loading) {
    return <div>Loading decisions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null; // You can return nothing since this component only loads data
};

export default LoadContext;
