"use client";

import {
  HomeIcon,
  BriefcaseIcon,
  MegaphoneIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import ISOCLogoBlack from "../public/isoc-logo.svg";

const links = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Events", href: "/admin/events", icon: BriefcaseIcon },
  { name: "Announcements", href: "/admin/announcements", icon: MegaphoneIcon },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-gray-50 border-r border-gray-200">
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-center px-4 border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center justify-center">
          <div className="w-20">
            <Image
              src={ISOCLogoBlack}
              alt="ISOC Logo"
              width={80}
              height={80}
              className="w-full h-auto"
            />
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {links.map((link) => {
            const LinkIcon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  {
                    "bg-blue-100 text-blue-700": isActive,
                    "text-gray-700 hover:bg-gray-100 hover:text-gray-900":
                      !isActive,
                  },
                )}
              >
                <LinkIcon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <div className="pt-4 border-t border-gray-200">
            <SignOutButton redirectUrl="/home">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                <PowerIcon className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
