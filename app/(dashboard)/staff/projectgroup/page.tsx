import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StaffProjectGroupPage() {
  const groups = await prisma.projectGroup.findMany({
    orderBy: { ProjectGroupID: "desc" },
    include: { ProjectType: true }
  }).catch(() => []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Staff - Project Groups</h1>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groups.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">No project groups found.</td></tr>
            ) : (
              groups.map(g => (
                <tr key={g.ProjectGroupID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{g.ProjectGroupName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{g.ProjectTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{g.ProjectType?.ProjectTypeName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
