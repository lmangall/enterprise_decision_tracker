import "./globals.css";
import { DecisionProvider } from "../context/DecisionContext";
import { Toaster } from "@/components/ui/toast";

export const metadata = {
  title: "Decision Tracker",
  description: "Get your decisions in order",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <DecisionProvider>
        <body>{children}</body>
      </DecisionProvider>
    </html>
  );
}
