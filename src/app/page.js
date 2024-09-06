"use client";

import { DecisionModal } from "@/components/ui/DecisionModal";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow"></main>
      <DecisionModal />
      <footer className="flex items-center justify-center">Footer</footer>
    </div>
  );
}
