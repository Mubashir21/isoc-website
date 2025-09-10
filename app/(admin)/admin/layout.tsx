"use client";

import AdminNav from "@/components/admin-nav";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-gray-50">
            <AdminNav />
          </div>
        </div>
      )}

      {/* Sidebar - Hidden on mobile, shown on md+ */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <AdminNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h1 className="text-lg font-semibold text-gray-900">ISOC Admin</h1>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
