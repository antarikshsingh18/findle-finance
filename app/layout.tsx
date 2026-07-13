import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Findle Finance | Transparent Mortgage Insights",
  description: "Advanced pre-construction financing tools for global investors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030305] text-slate-200 antialiased selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}