import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import SideNav from "@/components/sidenav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ISOC Website",
  description: "Serving the deen of Allah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex h-screen flex-col md:flex-row md:overflow-hidden bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </body>
    </html>
  );
}
