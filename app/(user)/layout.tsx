import type { Metadata } from "next";
import SideNav from "@/components/sidenav";
import Footer from "@/components/ui/footer";

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

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
//       <div className="w-full flex-none md:w-64">
//         <SideNav isAdmin={false} />
//       </div>
//       <div className="flex-grow p-5 md:overflow-y-auto lg:px-4 lg:py-4">
//         {children}
//       </div>
//     </div>
//   );
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col ">
      <div className="w-full px-5 pt-5">
        <SideNav isAdmin={false} />
      </div>
      <div className="flex-grow p-5">{children}</div>
    </div>
  );
}
