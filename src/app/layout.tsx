import "./globals.css";
import { DecisionProvider } from "../context/DecisionContext";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Decision Tracker",
  description: "Get your decisions in order",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <DecisionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>

          <Toaster />
        </DecisionProvider>
      </body>
    </html>
  );
}
