import { Decision } from "@/types/Decision";
import { editDecision } from "@/hooks/EditDecision";
import { toast, useToast } from "@/hooks/use-toast";
import { DropdownMenuItem } from "../ui/dropdown-menu";

type EditDecisionPops = {
  decision: Decision;
};

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
  <DropdownMenuItem onClick={() => handleDelete(decision)}>
    <Trash2 className="mr-2 h-4 w-4" />
    <span>Delete</span>
  </DropdownMenuItem>
);
