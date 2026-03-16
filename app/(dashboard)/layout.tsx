"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<"admin" | "staff" | "student">("student");

  useEffect(() => {
    if (pathname.startsWith("/admin")) setRole("admin");
    else if (pathname.startsWith("/staff")) setRole("staff");
    else if (pathname.startsWith("/student")) setRole("student");
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Fixed on desktop, can be hidden on mobile if we add toggle later */}
      <Sidebar role={role} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Header */}
        <TopNavbar role={role} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
          Student Project Management System © 2024
        </footer>
      </div>
    </div>
  );
}
