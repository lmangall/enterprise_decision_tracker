import "./globals.css";
import { DecisionProvider } from "../context/DecisionContext"; // Adjust the path if needed

export const metadata = {
  title: "Decision Tracker",
  description: "Get your decisions in order",
};

export default function RootLayout({ children }) {
  return (
    <DecisionProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </DecisionProvider>
  );
}
