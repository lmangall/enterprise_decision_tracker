import Image from "next/image";
import { Button } from "@/components/ui/button"
 
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow">
        <Button>Click me</Button>
      </main>
      <footer className="flex items-center justify-center">
        Footer        
      </footer>
    </div>
  );
}
