import "./globals.css";
import { ContextProvider } from "../context/DecisionContext";

export const metadata = {
  title: "Decision Tracker",
  description: "Get your decisions in order",
};

export default function RootLayout({ children }) {
  return (
    <ContextProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ContextProvider>
  );
}
