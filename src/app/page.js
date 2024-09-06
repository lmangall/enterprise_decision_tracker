"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CardComponent } from "@/components/ui/card";

export default function Home() {
  const [showCard, setShowCard] = useState(false);

  const handleClick = () => {
    setShowCard(!showCard);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow">
        <Button onClick={handleClick}>Click me</Button>
        {showCard && <CardComponent />}
      </main>
      <footer className="flex items-center justify-center">Footer</footer>
    </div>
  );
}
