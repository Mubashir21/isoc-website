import Link from "next/link";
import { BriefcaseIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - ISOC Admin",
  description: "Admin dashboard for managing website content",
};

export default function AdminDashboard() {
  return (
    <div className="w-full">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Manage your website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Events Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <BriefcaseIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              Events Management
            </CardTitle>
            <CardDescription className="text-sm">
              Create, edit, and manage events for your community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/events"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Manage Events
            </Link>
          </CardContent>
        </Card>

        {/* Announcements Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <MegaphoneIcon className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              Announcements
            </CardTitle>
            <CardDescription className="text-sm">
              Post and manage important announcements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/announcements"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
            >
              Manage Announcements
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
