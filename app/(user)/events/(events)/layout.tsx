import type { Metadata } from "next";
import { EventsToggle } from "@/components/events-toggle";

export const metadata: Metadata = {
  title: "ISOC Website",
  description: "Serving the deen of Allah",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <EventsToggle />
      {children}
    </div>
  );
}
