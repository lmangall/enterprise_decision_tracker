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
