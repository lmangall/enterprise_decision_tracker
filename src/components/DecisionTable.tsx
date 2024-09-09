import React, { useState } from "react";
import { deleteDecision } from "@/hooks/DeleteDecision";
import { toast } from "@/hooks/use-toast";
import { useDecisionContext } from "@/context/DecisionContext";
import { Decision } from "@/types/decision";
import { EditDecisionModal } from "@/components/modals/EditDecisionModal";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle2Icon,
  XCircleIcon,
  CircleIcon,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { DecisionTableSkeleton } from "./decision-table-skeleton";

interface DecisionTableProps {
  decisions: Decision[];
  onSelectDecision: (decision: Decision) => void;
  loading?: boolean;
}

export default function DecisionTable({
  decisions,
  onSelectDecision,
  loading = false,
}: DecisionTableProps) {
  const { removeDecision } = useDecisionContext();
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async (decision: Decision) => {
    if (decision.golden_ticket === true) {
      toast({
        title: "This one is special",
        description: "For obvious reasons, you can't delete this decision",
        variant: "error",
      });
      return;
    }

    try {
      await deleteDecision(decision.id);
      removeDecision(decision.id);
      toast({
        title: "Success",
        description: "Decision deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete decision", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete decision",
        variant: "error",
      });
    }
  };

  const openEditModal = (decision: Decision) => {
    if (decision.golden_ticket === true) {
      toast({
        title: "This one is special",
        description: "It looks pretty good the way it is, don't you think?",
        variant: "error",
      });
      return;
    }
    setSelectedDecision(decision);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedDecision(null);
    setIsEditModalOpen(false);
  };

  if (loading) {
    return <DecisionTableSkeleton />;
  }

  return (
    <>
      <Table className="min-h-[10px]">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Title</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Goal Met</TableHead>
            <TableHead className="font-bold">Goal Date</TableHead>
            <TableHead className="font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {decisions.map((decision) => (
            <TableRow
              key={decision.id}
              className={`cursor-pointer hover:bg-gray-100 ${
                decision.status === "completed" ? "text-gray-500   " : ""
              }`}
              onClick={() => onSelectDecision(decision)}
            >
              <TableCell>{decision.title}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    decision.status === "completed"
                      ? "default"
                      : decision.status === "in process"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {decision.status}
                </Badge>
              </TableCell>
              <TableCell>
                {decision.goal_met === undefined ? (
                  <CircleIcon className="h-5 w-5 text-gray-400" />
                ) : decision.goal_met ? (
                  <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </TableCell>
              <TableCell>
                {decision.goal_date
                  ? typeof decision.goal_date === "string"
                    ? decision.goal_date.substring(0, 10)
                    : format(new Date(decision.goal_date), "PP").substring(
                        0,
                        10
                      )
                  : "N/A"}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-7 w-7 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditModal(decision)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(decision)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isEditModalOpen && selectedDecision && (
        <EditDecisionModal
          decision={selectedDecision}
          onClose={closeEditModal}
        />
      )}
    </>
  );
}
