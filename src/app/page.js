import { Button } from "@/components/ui/button";
import { CardComponent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow">
        <Button>Click me</Button>
        <CardComponent />
      </main>
      <footer className="flex items-center justify-center">Footer</footer>
    </div>
  );
}
