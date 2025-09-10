import Link from "next/link";
import { UserNavLinks } from "@/components/ui/user-nav-links";
import { AdminNavLinks } from "./ui/admin-nav-links";
import ISOCLogoBlack from "../public/isoc-logo.svg";
import ISOCLogoWhite from "../public/ISoc-logo-white.png";
import Image from "next/image";
import clsx from "clsx";
import { ResponsiveContainer } from "@/components/responsive-container";

interface SideNavProps {
  isAdmin: boolean;
}

export default function SideNav({ isAdmin }: SideNavProps) {
  return (
    <div className="flex h-full flex-col lg:flex-row  lg:bg-gray-200 lg:rounded-xl lg:px-5">
      <ResponsiveContainer
        maxWidth="6xl"
        className="flex h-full flex-col lg:gap-2 lg:flex-row lg:items-center lg:justify-between"
      >
        <Link
          className={clsx(
            "mb-2 lg:mb-0 flex h-20 items-center justify-center rounded-md p-4",
            "bg-blue-600 lg:bg-transparent", // Background changes on lg
          )}
          href="/"
        >
          <div className="w-28">
            <Image
              src={ISOCLogoWhite} // Default white logo
              alt="ISOC Logo"
              layout="responsive"
              objectFit="contain"
              className="lg:hidden" // Hide white logo on lg+
   
            />
            <Image
              src={ISOCLogoBlack} // Black logo for lg+
              alt="ISOC Logo"
              layout="responsive"
              objectFit="contain"
              className="hidden lg:block" // Show black logo on lg+
            />
          </div>
        </Link>
        <div className="flex grow justify-between lg:grow-0 flex-row space-x-2">
          {isAdmin ? <AdminNavLinks /> : <UserNavLinks />}
        </div>
      </ResponsiveContainer>
    </div>
  );
}
