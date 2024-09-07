import React from "react";
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
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

interface Decision {
  id: number;
  golden_ticket: boolean;
  title: string;
  description: string;
  measurable_goal: string;
  status: "pending" | "in process" | "completed";
  goal_met?: boolean;
  comments?: string;
  goal_date?: string;
  created_at: string;
  updated_at: string;
}

interface DecisionTableProps {
  decisions: Decision[];
  onSelectDecision: (decision: Decision) => void;
  // onEditDecision: (decision: Decision) => void;
  // onDeleteDecision: (decision: Decision) => void;
}

export default function DecisionTable({
  decisions,
  onSelectDecision,
}: // onEditDecision,
// onDeleteDecision,
DecisionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Goal Met</TableHead>
          <TableHead>Goal Date</TableHead>
          <TableHead className="w-[70px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {decisions.map((decision) => (
          <TableRow
            key={decision.id}
            className="cursor-pointer hover:bg-gray-100"
          >
            <TableCell onClick={() => onSelectDecision(decision)}>
              {decision.title}
              {decision.golden_ticket && (
                <Badge variant="secondary" className="ml-2">
                  Golden Ticket
                </Badge>
              )}
            </TableCell>
            <TableCell onClick={() => onSelectDecision(decision)}>
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
            <TableCell onClick={() => onSelectDecision(decision)}>
              {decision.goal_met === undefined ? (
                <CircleIcon className="h-5 w-5 text-gray-400" />
              ) : decision.goal_met ? (
                <CheckCircle2Icon className="h-5 w-5 text-green-500" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-500" />
              )}
            </TableCell>
            <TableCell onClick={() => onSelectDecision(decision)}>
              {decision.goal_date || "N/A"}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => console.log("Edit")}>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log("Delete")}>
                    {/* 
                      const onDelete = async 
    try {
      

          await deleteDecision(decision.id);

          setToast("Success", "Decision deleted successfully!");
        } catch (error) {
          console.error("Failed to delete decision", error);
          if (error instanceof Error) {
            setToast("Error", error.message);
          } else {
            setToast("Error", "An unknown error occurred");
          }
        }
     */}
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
  );
}
