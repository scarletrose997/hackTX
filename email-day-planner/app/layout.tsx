// app/layout.tsx
// Minimal TypeScript: we use basic 'any' or raw objects to keep TS very minimal.

export const metadata = {
  title: "AI Email-to-Day Planner",
  description: "Connect your Gmail and plan your day automatically.",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
