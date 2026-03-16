import Link from "next/link";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import DashboardLoginToast from "@/components/DashboardLoginToast";
import { 
  Briefcase, 
  Users, 
  Calendar, 
  ArrowUpRight, 
  Clock,
  Plus
} from "lucide-react";

export default async function AdminDashboard() {
  let stats = [
    { label: "Project Types", value: 0, icon: <Briefcase size={20} />, color: "bg-blue-50 text-blue-600" },
    { label: "Total Groups", value: 0, icon: <Users size={20} />, color: "bg-purple-50 text-purple-600" },
    { label: "Faculty Staff", value: 0, icon: <Users size={20} />, color: "bg-indigo-50 text-indigo-600" },
    { label: "Total Students", value: 0, icon: <Users size={20} />, color: "bg-green-50 text-green-600" },
  ];
  let recentGroups: any[] = [];

  try {
    const [typeCount, groupCount, staffCount, studentCount, groups] = await Promise.all([
      prisma.projectType.count(),
      prisma.projectGroup.count(),
      prisma.staff.count(),
      prisma.student.count(),
      prisma.projectGroup.findMany({
        take: 5,
        orderBy: { Created: "desc" },
        select: {
          ProjectGroupID: true,
          ProjectGroupName: true,
          ProjectTitle: true,
          Created: true
        }
      })
    ]);

    stats = [
      { label: "Project Types", value: typeCount, icon: <Briefcase size={20} />, color: "bg-blue-50 text-blue-600" },
      { label: "Total Groups", value: groupCount, icon: <Users size={20} />, color: "bg-purple-50 text-purple-600" },
      { label: "Faculty Staff", value: staffCount, icon: <Users size={20} />, color: "bg-indigo-50 text-indigo-600" },
      { label: "Total Students", value: studentCount, icon: <Users size={20} />, color: "bg-green-50 text-green-600" },
    ];
    recentGroups = groups;
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={null}><DashboardLoginToast /></Suspense>
      
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-3">
          <Link href="/admin/projectgroup/add" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            <Plus size={16} className="mr-2" />
            New Group
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Project Groups</h2>
            <Link href="/admin/projectgroup" className="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center">
              View All <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="p-0">
            {recentGroups.length === 0 ? (
              <div className="p-6 text-center text-gray-500 font-medium">No project groups found.</div>
            ) : (
              <ul className="divide-y divide-gray-50">
                {recentGroups.map((group) => (
                  <li key={group.ProjectGroupID} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{group.ProjectGroupName}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{group.ProjectTitle}</p>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock size={12} className="mr-1" />
                        {group.Created ? new Date(group.Created).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 font-bold">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Manage Types", href: "/admin/projecttype", icon: <Briefcase size={18} /> },
              { label: "Manage Staff", href: "/admin/staff", icon: <Users size={18} /> },
              { label: "Manage Students", href: "/admin/student", icon: <Users size={18} /> },
              { label: "View Reports", href: "/admin/reports", icon: <Calendar size={18} /> },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
              >
                <div className="h-10 w-10 bg-gray-50 text-gray-600 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                  {action.icon}
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-indigo-900">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
