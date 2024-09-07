import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2Icon, XCircleIcon, CircleIcon } from "lucide-react";

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
}

export default function DecisionTable({
  decisions,
  onSelectDecision,
}: DecisionTableProps) {
  return (
    <Table>
      <TableCaption>A list of your decisions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Goal Met</TableHead>
          <TableHead>Goal Date</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {decisions.map((decision) => (
          <TableRow
            key={decision.id}
            onClick={() => onSelectDecision(decision)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <TableCell className="font-medium">{decision.id}</TableCell>
            <TableCell>
              {decision.title}
              {decision.golden_ticket && (
                <Badge variant="secondary" className="ml-2">
                  Golden Ticket
                </Badge>
              )}
            </TableCell>
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
            <TableCell>{decision.goal_date || "N/A"}</TableCell>
            <TableCell>
              {new Date(decision.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(decision.updated_at).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
