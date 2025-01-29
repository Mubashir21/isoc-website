import type { Metadata } from "next";
import SideNav from "@/components/sidenav";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "ISOC Website",
  description: "Serving the deen of Allah",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav isAdmin={false} />
      </div>
      <div className="flex-grow p-5 md:overflow-y-auto lg:px-4 lg:py-4">
        {children}
      </div>
    </div>
  );
}
