"use client";

import {
  UserGroupIcon,
  // HomeIcon,
  DocumentDuplicateIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

import CampaignIcon from "@mui/icons-material/Campaign";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import MosqueIcon from "@mui/icons-material/Mosque";
import MosqueOutlinedIcon from "@mui/icons-material/MosqueOutlined";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventIcon from "@mui/icons-material/Event";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
// import MosqueIcon from "@/components/icons/mosque";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: "Home",
    href: ["/home"],
    icon: HomeIcon,
    selectedIcon: HomeOutlinedIcon,
  },
  {
    name: "Prayer Times",
    href: ["/prayertimes"],
    icon: MosqueIcon,
    selectedIcon: MosqueOutlinedIcon,
  },
  {
    name: "Events",
    href: ["/events/future", "/events/past"],
    icon: EventIcon,
    selectedIcon: EventOutlinedIcon,
  },
  {
    name: "Announcements",
    href: ["/announcements"],
    icon: CampaignIcon,
    selectedIcon: CampaignOutlinedIcon,
  },
];

export function UserNavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const isActive = link.href.some((href) => pathname.startsWith(href));
        const LinkIcon = isActive ? link.icon : link.selectedIcon;
        return (
          <Link
            key={link.name}
            href={link.href[0]} // Use the first href as the main link
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": isActive,
              },
            )}
          >
            <LinkIcon className="w-6 text-black" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
