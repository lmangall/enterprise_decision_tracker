import "./globals.css";
import { DecisionProvider } from "../context/DecisionContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Decision Tracker",
  description: "Get your decisions in order",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <DecisionProvider>
          {children}
          <Toaster />
        </DecisionProvider>
      </body>
    </html>
  );
}
