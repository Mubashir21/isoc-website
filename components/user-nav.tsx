"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { UserNavLinks } from "@/components/ui/user-nav-links";
import Image from "next/image";
import ISOCLogoBlack from "../public/isoc-logo.svg";
import ISOCLogoWhite from "../public/isoc-logo-white.png"; // Add white logo import

export default function UserNav() {
  return (
    <div className="flex h-full flex-col lg:flex-row lg:items-center lg:justify-between lg:bg-gray-200 lg:rounded-xl lg:px-5 lg:gap-2">
      <Link
        className="mb-2 lg:mb-0 flex h-20 items-center justify-center rounded-md p-4 bg-blue-600 lg:bg-transparent"
        href="/"
      >
        <div className="w-28">
          {/* White logo for small screens, hidden on lg+ */}
          <Image
            src={ISOCLogoWhite}
            alt="ISOC Logo"
            width={112}
            height={112}
            className="w-full h-auto lg:hidden"
          />
          {/* Black logo for lg+ screens, hidden on smaller */}
          <Image
            src={ISOCLogoBlack}
            alt="ISOC Logo"
            width={112}
            height={112}
            className="w-full h-auto hidden lg:block"
          />
        </div>
      </Link>
      <div className="flex flex-row space-x-2">
        <UserNavLinks />
      </div>
    </div>
  );
}
