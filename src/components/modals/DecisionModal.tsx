"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { useDecisionContext } from "@/context/DecisionContext";
import { createDecision } from "@/hooks/PostDecision";
import { Modal } from "./Modal";

type FormData = {
  title: string;
  description: string;
  measurableGoal: string;
  targetDate: Date | null;
  status: "pending" | "in process" | "completed";
};

type DecisionModalProps = {
  setToast: (title: string, message: string) => void;
};

export default function DecisionModal({ setToast }: DecisionModalProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { addDecision } = useDecisionContext();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      measurableGoal: "",
      targetDate: null,
      status: "pending",
    },
  });

  const targetDate = watch("targetDate");

  //TODO: import type from type.ts
  const onSubmit = async (data: FormData) => {
    try {
      const newDecision = {
        id: 0,
        created_at: "",
        updated_at: "",
        golden_ticket: false,
        title: data.title,
        description: data.description,
        measurable_goal: data.measurableGoal,
        status: data.status,
        goal_met: false,
        goal_date: data.targetDate?.toISOString(),
      };

      await addDecision(newDecision);
      await createDecision(newDecision);

      setIsFormVisible(false);
      setToast("Success", "Decision created successfully!");
    } catch (error) {
      console.error("Failed to create decision", error);
      if (error instanceof Error) {
        setToast("Error", error.message);
      } else {
        setToast("Error", "An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setIsFormVisible(true)}
      >
        New Decision
      </Button>

      {isFormVisible && (
        <Modal onClose={() => setIsFormVisible(false)}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => setIsFormVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold mb-4">Create New Decision</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Title is required",
                  minLength: {
                    value: 4,
                    message: "Title must be at least 5 characters long",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <Input
                      id="title"
                      placeholder="Title of the decision"
                      {...field}
                      className={`border ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
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
              <Label htmlFor="measurableGoal">Measurable Goal</Label>
              <Controller
                name="measurableGoal"
                control={control}
                rules={{
                  required: "Measurable goal is required",
                  minLength: {
                    value: 10,
                    message:
                      "Measurable goal must be at least 10 characters long",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <Input
                      id="measurableGoal"
                      placeholder="A single, clear, and quantifiable goal"
                      {...field}
                      className={`border ${
                        errors.measurableGoal
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.measurableGoal && (
                      <p className="text-red-500 text-sm">
                        {errors.measurableGoal.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <div className="flex items-center">
                <Input
                  type="text"
                  value={targetDate ? format(targetDate, "PP") : ""}
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
                    selected={targetDate ?? undefined}
                    onSelect={(date) => {
                      if (date) {
                        setValue("targetDate", date);
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
            <Button type="submit" className="w-full">
              Submit Decision
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
