import { useDecisionContext } from "@/context/DecisionContext";
import { Decision } from "@/types/decision";
import { editDecision } from "@/hooks/EditDecision";
import { toast } from "@/hooks/use-toast";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Pencil } from "lucide-react";
import { isDuplicateDecision } from "@/components/utils/validation";

type EditDecisionPops = {
  decision: Decision;
};

export default function EditDecision({ decision }: EditDecisionPops) {
  const { decisions, updateDecision } = useDecisionContext();

  const handleEdit = async (decision: Decision) => {
    try {
      if (isDuplicateDecision(decision, decisions)) {
        throw new Error("A decision with similar details already exists.");
      }

      await editDecision(decision);
      updateDecision(decision); // Update the context here if needed

      toast({
        title: "Success",
        description: "Decision edited successfully",
      });
    } catch (error) {
      console.error("Failed to edit decision", error);
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "error",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to edit decision",
          variant: "error",
        });
      }
    }
  };

  return (
    <>
      {/* Edit button */}
      <DropdownMenuItem onClick={() => handleEdit(decision)}>
        <Pencil className="mr-2 h-4 w-4" />
        <span>Edit</span>
      </DropdownMenuItem>
    </>
  );
}
