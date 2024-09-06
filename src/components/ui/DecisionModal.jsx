"use client";

import { useState } from "react";
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

export function DecisionModal() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    decisionType: "",
    priority: "",
    measurableGoal: "",
    kpis: "",
    targetDate: null,
    status: "",
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, targetDate: date }));
    setIsCalendarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title of the decision"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="A more detailed explanation of the decision"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="decisionType">Decision Type</Label>
                <Select
                  name="decisionType"
                  onValueChange={(value) =>
                    handleSelectChange("decisionType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select decision type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strategic">Strategic</SelectItem>
                    <SelectItem value="tactical">Tactical</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  name="priority"
                  onValueChange={(value) =>
                    handleSelectChange("priority", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="measurableGoal">Measurable Goal</Label>
                <Input
                  id="measurableGoal"
                  name="measurableGoal"
                  value={formData.measurableGoal}
                  onChange={handleInputChange}
                  placeholder="A single, clear, and quantifiable goal"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kpis">Key Performance Indicators (KPIs)</Label>
                <Textarea
                  id="kpis"
                  name="kpis"
                  value={formData.kpis}
                  onChange={handleInputChange}
                  placeholder="Specific metrics to track progress"
                />
              </div>
              <div className="space-y-2">
                <Label>Target Date</Label>
                <div className="flex items-center">
                  <Input
                    type="text"
                    value={
                      formData.targetDate
                        ? format(formData.targetDate, "PP")
                        : ""
                    }
                    readOnly
                    placeholder="Select a date"
                    className="w-full"
                  />
                  <Button
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
                      selected={formData.targetDate}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
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
