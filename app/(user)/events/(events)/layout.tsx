import type { Metadata } from "next";
import { EventsToggle } from "@/components/events-toggle";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "ISOC Website",
  description: "Serving the deen of Allah",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:bg-gray-200 rounded-xl md:p-5">
      <div className="flex flex-col gap-5 lg:px-28 md:px-16 2xl:px-64">
        <EventsToggle />
        {children}
        {/* <div className="bg-gray-200 rounded-xl p-5">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}
