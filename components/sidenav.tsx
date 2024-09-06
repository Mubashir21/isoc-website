import Link from "next/link";
import { UserNavLinks } from "@/components/ui/user-nav-links";
import { AdminNavLinks } from "./ui/admin-nav-links";
import ISOCLogo from "../public/ISoc-logo-white.png";
import Image from "next/image";
// import { signOut } from '@/auth';

interface SideNavProps {
  isAdmin: boolean;
}

export default function SideNav({ isAdmin }: SideNavProps) {
  return (
    <div className="flex h-full flex-col px-5 pt-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Image
            src={ISOCLogo}
            alt="ISOC Logo"
            layout="responsive" // Use layout "responsive" for better responsiveness
            objectFit="contain" // Ensure the image fits properly within the container
          />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {isAdmin ? <AdminNavLinks /> : <UserNavLinks />}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
