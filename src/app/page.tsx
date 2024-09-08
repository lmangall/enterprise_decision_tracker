"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller } from "react-hook-form";
import DecisionModal from "@/components/modals/DecisionModal";
import DecisionTable from "@/components/DecisionTable";
import { useDecisionContext } from "@/context/DecisionContext";
import LoadContext from "@/context/LoadContext";
import { Button } from "@/components/ui/button";
import DecisionTabs from "@/components/DecisionTabs";
import { Decision } from "@/types/decision";
import { fetchAIDecision } from "@/components/FetchAIDecision";
import { Input } from "@/components/ui/input";
import { CircleHelp, Send } from "lucide-react";
import {
  RocketIcon,
  CrumpledPaperIcon,
  GlobeIcon,
  LinkedInLogoIcon,
  ArchiveIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Home() {
  const { decisions } = useDecisionContext();
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(
    null
  );
  const { toast } = useToast();

  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    fetchAIDecision(data.userInput);
  };

  const showToast = (title: string, message: string) => {
    const variant = title === "Error" ? "error" : "default";

    toast({
      title: title,
      description: message,
      variant: variant,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen sm:gap-4">
      <div className="flex flex-col sm:gap-4 w-full max-w-[59rem]">
        <main className="grid flex-1 w-full">
          <div className="w-full gap-4">
            <div className="pb-2 flex items-center justify-between gap-4 w-full">
              <div className="flex flex-col w-full">
                {/* Flex container for h1 and RocketIcon */}
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-semibold">Decision Dashboard</h1>
                  <RocketIcon className="h-6 w-6" />
                </div>
                <p className="text-gray-600 mb-3">
                  Track and manage your decisions
                </p>
              </div>
              <div className="md:w-1/3 w-full">
                {/* Apply w-full inside DecisionModal */}
                <DecisionModal
                  setToast={(title, message) => showToast(title, message)}
                />
              </div>
            </div>
            <div className="sticky flex flex-col md:flex-row gap-4 w-full">
              <div className="sticky md:w-2/3 border rounded-xl border shadow w-full">
                <LoadContext />
                <DecisionTable
                  decisions={decisions}
                  onSelectDecision={(decision) => setSelectedDecision(decision)}
                />
              </div>
              <div className="sticky md:w-1/3 bg-background rounded-xl border shadow w-full">
                <DecisionTabs selectedDecision={selectedDecision} />
              </div>
            </div>
          </div>
        </main>
        <div className="flex w-full items-center space-x-2 pt-1">
          <Popover>
            <PopoverTrigger className="hidden text-muted-foreground hover:text-foreground disabled:opacity-50 sm:flex">
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
                behind the scenes it will be formatted and enhanced before being
                added to the list
              </p>
              <p className="font-medium">Try it for yourself!</p>
            </PopoverContent>
          </Popover>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="userInput"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Plain text decision creation"
                  {...field}
                />
              )}
            />
            <Button type="submit">Add</Button>
          </form>
        </div>
        <footer className="w-full mt-10 py-4 px-4">
          <div className="flex flex-col items-center justify-center space-y-2 text-grey-600">
            <p>
              <a
                href="mailto:l.mangallon@gmail.com?subject=RE:frontend junior position application"
                className="font-bold text-xs text-gray-600 hover:text-black"
              >
                RE:frontend junior position application
              </a>
            </p>
            <p className="flex space-x-4 ">
              <CrumpledPaperIcon className="h-4 w-4" />
              <GlobeIcon className="h-4 w-4" />
              <RocketIcon className="h-4 w-4" />
              <LinkedInLogoIcon className="h-4 w-4" />
              <ArchiveIcon className="h-4 w-4" />
              <Send className="h-4 w-4" />
              <GitHubLogoIcon className="h-4 w-4" />
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
