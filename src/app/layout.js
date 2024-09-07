import "./globals.css";
import { DecisionProvider } from "../context/DecisionContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Decision Tracker",
  description: "Get your decisions in order",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <DecisionProvider>
        <body>{children}</body>
        <Toaster />
      </DecisionProvider>
    </html>
  );
}
