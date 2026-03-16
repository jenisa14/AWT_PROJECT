import React from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function AppLayout({ 
  children, 
  role 
}: { 
  children: React.ReactNode;
  role: "admin" | "staff" | "student";
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
     
      <Sidebar role={role} />

     
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <TopNavbar role={role} />
        
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
