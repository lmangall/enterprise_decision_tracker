import { useEffect, useState, useRef } from "react";
import retrieveDecisions from "@/context/RetrieveDecisions";
import { useDecisionContext } from "@/context/DecisionContext";
import { Decision } from "@/types/decision";

// Component that loads decisions into the context when the app starts, only if not already loaded
const LoadContext: React.FC = () => {
  const { decisions, addDecisionFromDB, fetched, setFetched } =
    useDecisionContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(false); // to track component mounting

  useEffect(() => {
    //TODO: see if the setFetched flag is necesseary since tracking mounted state
    if (isMounted.current) {
      // Skip fetching if already mounted
      return;
    }

    const fetchDecisions = async () => {
      try {
        const fetchedDecisions: Decision[] = await retrieveDecisions();
        fetchedDecisions.forEach((decision) => addDecisionFromDB(decision));
        console.log("Decisions loaded:", fetchedDecisions);
        setFetched(true); // Mark as fetched after successful loading
        setLoading(false);
      } catch (err) {
        console.error("Failed to load decisions", err);
        setError("Failed to load decisions");
        setLoading(false);
      }
    };

    if (!fetched) {
      fetchDecisions(); // fetch only if decisions are not already loaded
    } else {
      setLoading(false); // Set loading to false if decisions are in context
    }
    isMounted.current = true;
  }, [fetched, addDecisionFromDB, setFetched]);

  if (loading) {
    return <div>Loading decisions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
};

export default LoadContext;
