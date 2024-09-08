"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import DecisionModal from "@/components/modals/DecisionModal";
import DecisionTable from "@/components/DecisionTable";
import { useDecisionContext } from "@/context/DecisionContext";
import LoadContext from "@/context/LoadContext";
import { Button } from "@/components/ui/button";
import DecisionTabs from "@/components/DecisionTabs";
import { Decision } from "@/types/decision";
import { fetchAndCreateDecision } from "@/components/FetchAIDecision";
import { Input } from "@/components/ui/input";
import { CircleHelp } from "lucide-react";

import {
  RocketIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FormValues {
  userInput: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { decisions, addDecision } = useDecisionContext();
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(
    null
  );
  const { toast } = useToast();
  const { control, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    setLoading(false); // LoadContext handles the fetching
  }, []);

  const showToast = (title: string, message: string) => {
    const variant = title === "Error" ? "error" : "default";
    toast({
      title: title,
      description: message,
      variant: variant,
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const userInput = data.userInput;
    const {
      success,
      data: decision,
      error,
    } = await fetchAndCreateDecision(userInput);

    if (success && decision) {
      try {
        await addDecision(decision);
        showToast("Success", "Decision created successfully!");
      } catch (error) {
        showToast("Error", "Failed to add decision to context.");
      }
    } else {
      showToast("Error", error || "An unknown error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen sm:gap-4">
      <div className="flex flex-col sm:gap-4 w-full max-w-[59rem]">
        <main className="grid flex-1 w-full">
          <div className="w-full gap-4">
            <div className="pb-2 flex items-center justify-between gap-4 w-full">
              <div className="flex flex-col w-full">
                <div className="flex items-center space-x-2">
                  <RocketIcon className="h-7 w-7" />
                  <h1 className="text-xl font-semibold">Decision Dashboard</h1>
                </div>
                <p className="text-gray-600 mb-3">
                  Track and manage your decisions
                </p>
              </div>
              <div className="md:w-1/2">
                <DecisionModal setToast={showToast} />
              </div>
            </div>
            <div className="sticky flex flex-col md:flex-row gap-4 w-full">
              <div className="sticky md:w-2/3 border rounded-xl border shadow w-full">
                <LoadContext />
                <DecisionTable
                  decisions={decisions}
                  onSelectDecision={(decision) => setSelectedDecision(decision)}
                  loading={loading}
                />
              </div>
              <div className="sticky md:w-1/3 bg-background rounded-xl border shadow w-full min-h-[500px]">
                <DecisionTabs selectedDecision={selectedDecision} />
              </div>
            </div>
          </div>
        </main>
        <div className="flex w-full items-center space-x-2 pt-1">
          <div className="flex items-center flex-1 space-x-2">
            <Popover>
              <PopoverTrigger className="text-muted-foreground hover:text-foreground disabled:opacity-50 flex items-center space-x-2">
                <CircleHelp className="h-5 w-5" />
                <span className="sr-only">Block description</span>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                sideOffset={20}
                className="space-y-3 rounded-[0.5rem] text-sm"
              >
                <p className="font-medium">
                  This AI feature allows you to type a decision in plain text,
                  behind the scenes it will be formatted and enhanced before
                  being added to the list
                </p>
                <p className="font-medium">Try it for yourself!</p>
              </PopoverContent>
            </Popover>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 space-x-2"
            >
              <Controller
                name="userInput"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Plain text decision creation"
                    {...field}
                    className="flex-1"
                  />
                )}
              />
              <Button type="submit">Add</Button>
            </form>
          </div>
        </div>
        <footer className="w-full mt-10 py-4 px-4">
          <div className="flex flex-col items-center justify-center space-y-2 text-grey-600">
            <a
              href="mailto:l.mangallon@gmail.com?subject=RE:frontend junior position application"
              className="font-bold text-xs text-gray-600 hover:text-black"
            >
              RE:frontend junior position application
            </a>
            <p className="flex space-x-4 ">
              <a
                href="https://www.linkedin.com/in/l-mangallon/"
                className="font-bold text-xs text-gray-600 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInLogoIcon className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/lmangall/"
                className="font-bold text-xs text-gray-600 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubLogoIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran"
                className="font-bold text-xs text-gray-600 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagicWandIcon className="h-4 w-4" />
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
