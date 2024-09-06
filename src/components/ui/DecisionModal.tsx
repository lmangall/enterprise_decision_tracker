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

type FormData = {
  title: string;
  description: string;
  priority: string;
  measurableGoal: string;
  targetDate: Date | null;
  status: string;
};

export default function DecisionModal() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      measurableGoal: "",
      targetDate: null,
      status: "",
    },
  });

  const targetDate = watch("targetDate");

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // update context and send to db
    setIsFormVisible(false);
  };

  return (
    <div className="relative">
      {!isFormVisible && (
        <Button variant="outline" onClick={() => setIsFormVisible(true)}>
          New Decision
        </Button>
      )}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
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
                <Label htmlFor="priority">Priority</Label>
                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: "Priority is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="measurableGoal">Measurable Goal</Label>
                <Controller
                  name="measurableGoal"
                  control={control}
                  rules={{ required: "Measurable goal is required" }}
                  render={({ field }) => (
                    <Input
                      id="measurableGoal"
                      placeholder="A single, clear, and quantifiable goal"
                      {...field}
                    />
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
                        <SelectItem value="in-progress">In Progress</SelectItem>
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
          </div>
        </div>
      )}
    </div>
  );
}
