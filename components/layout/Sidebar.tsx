"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarDays, 
  ClipboardList,
  FileText,
  Settings,
  LogOut
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const adminNav: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { title: "Project Types", href: "/admin/projecttype", icon: <BookOpen size={20} /> },
  { title: "Project Groups", href: "/admin/projectgroup", icon: <ClipboardList size={20} /> },
  { title: "Staff", href: "/admin/staff", icon: <Users size={20} /> },
  { title: "Students", href: "/admin/student", icon: <Users size={20} /> },
  { title: "Meetings", href: "/admin/projectmeeting", icon: <CalendarDays size={20} /> },
  { title: "Reports", href: "/admin/reports", icon: <FileText size={20} /> },
];

const staffNav: NavItem[] = [
  { title: "Dashboard", href: "/staff/dashboard", icon: <LayoutDashboard size={20} /> },
  { title: "My Groups", href: "/staff/projectgroup", icon: <ClipboardList size={20} /> },
  { title: "Meetings", href: "/staff/meeting", icon: <CalendarDays size={20} /> },
];

const studentNav: NavItem[] = [
  { title: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard size={20} /> },
  { title: "My Project", href: "/student/myproject", icon: <ClipboardList size={20} /> },
  { title: "Meeting", href: "/student/meeting", icon: <CalendarDays size={20} /> },
  { title: "Documents", href: "/student/documents", icon: <FileText size={20} /> },
];

export default function Sidebar({ role }: { role: "admin" | "staff" | "student" }) {
  const pathname = usePathname();
  
  let navItems = studentNav;
  if (role === "admin") navItems = adminNav;
  if (role === "staff") navItems = staffNav;

  const handleLogout = async () => {
    
    window.location.href = "/auth/login?logout=1";
  };

  return (
    <div className="flex flex-col w-64 bg-slate-900 text-white min-h-screen border-r border-slate-800 shadow-xl z-20 transition-all duration-300">
      <div className="flex items-center px-6 h-20 border-b border-slate-800">
        <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/20">
          <span className="text-xl font-bold text-white italic">S</span>
        </div>
        <div>
          <span className="text-xl font-extrabold tracking-tight text-white uppercase">SPMS</span>
          <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase -mt-1">Portal</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        <nav className="px-3 space-y-1.5">
          <div className="px-3 mb-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</p>
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200
                  ${isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <div className={`mr-3 transition-colors ${isActive ? "text-white" : "text-slate-500 group-hover:text-indigo-400"}`}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 18 })}
                </div>
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 text-sm font-bold text-slate-400 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
        >
          <div className="mr-3 text-slate-500 group-hover:text-red-400 transition-colors">
            <LogOut size={18} />
          </div>
          Logout
        </button>
      </div>
    </div>
  );
}

