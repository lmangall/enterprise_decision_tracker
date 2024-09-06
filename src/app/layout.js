import "./globals.css";

export const metadata = {
  title: 'Decision Tracker',
  description: 'Get your decisions in order',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
