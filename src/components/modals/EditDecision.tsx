"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDecisionContext } from "@/context/DecisionContext";
import { Decision } from "@/types/decision";
import { editDecision } from "@/hooks/EditDecision";
import { toast } from "@/hooks/use-toast";
import { isDuplicateDecision } from "@/components/utils/validation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Pencil, X } from "lucide-react";
import { format } from "date-fns";

type EditDecisionProps = {
  decision: Decision;
};

export function EditDecision({ decision }: EditDecisionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { decisions, updateDecision } = useDecisionContext();

  const { control, handleSubmit, setValue, watch } = useForm<Decision>({
    defaultValues: {
      ...decision,
      goal_date: decision.goal_date ? new Date(decision.goal_date) : null,
    },
  });

  const goalDate = watch("goal_date");

  const handleEdit = async (updatedDecision: Decision) => {
    try {
      if (isDuplicateDecision(updatedDecision, decisions)) {
        throw new Error("A decision with similar details already exists.");
      }

      await editDecision(updatedDecision);
      updateDecision(updatedDecision);
      setIsModalOpen(false);

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
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to edit decision",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
        <Pencil className="mr-2 h-4 w-4" />
        <span>Edit</span>
      </DropdownMenuItem>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold mb-4">Edit Decision</h2>
            <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <Input
                      id="title"
                      placeholder="Title of the decision"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="description"
                      placeholder="A more detailed explanation of the decision"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="measurable_goal">Measurable Goal</Label>
                <Controller
                  name="measurable_goal"
                  control={control}
                  rules={{ required: "Measurable goal is required" }}
                  render={({ field }) => (
                    <Input
                      id="measurable_goal"
                      placeholder="A single, clear, and quantifiable goal"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal_date">Goal Date</Label>
                <div className="flex items-center">
                  <Input
                    type="text"
                    value={goalDate ? format(goalDate, "PP") : ""}
                    readOnly
                    placeholder="Select a date"
                    className="w-full"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="ml-2"
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  >
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </div>
                {isCalendarOpen && (
                  <div className="absolute z-10 bg-white border rounded-md shadow-md mt-1">
                    <Calendar
                      mode="single"
                      selected={goalDate ?? undefined}
                      onSelect={(date) => {
                        if (date) {
                          setValue("goal_date", date);
                        }
                        setIsCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in process">In Process</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  name="goal_met"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="goal_met"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="goal_met">Goal Met</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Controller
                  name="comments"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="comments"
                      placeholder="Additional comments"
                      {...field}
                    />
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Update Decision
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
