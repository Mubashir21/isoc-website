import type { Metadata } from "next";
import UserNav from "@/components/user-nav";
import Footer from "@/components/ui/footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Islamic Society UNM",
  description:
    "Established in 2006, the Islamic Society at the University of Nottingham Malaysia is a welcoming community fostering brotherhood, faith, and knowledge through engaging events and activities.",
  keywords: [
    "Islamic Society",
    "University of Nottingham Malaysia",
    "ISOC",
    "Muslim students",
    "Faith and academics",
    "Islamic events",
    "Brotherhood and sisterhood",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full px-5 pt-5">
        <UserNav />
      </div>
      <div className="flex-grow p-5">
        {children} <Analytics />
      </div>
    </div>
  );
}
