import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StudentMyProjectPage() {
  // Static for now or fetch based on some mock session if needed
  // Since we don't have session here yet, just show a list
  const groups = await prisma.projectGroup.findMany({
    take: 5,
    orderBy: { Created: "desc" }
  }).catch(() => []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Project</h1>
      <div className="grid gap-6">
        {groups.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow border border-gray-200 text-center">
            <p className="text-gray-500 mb-4">You are not part of any project group.</p>
            <Link href="/projectgroup/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Join or Create Group
            </Link>
          </div>
        ) : (
          groups.map(g => (
            <div key={g.ProjectGroupID} className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h2 className="text-xl font-bold text-blue-600">{g.ProjectGroupName}</h2>
              <p className="text-gray-700 mt-2 font-medium">{g.ProjectTitle}</p>
              <p className="text-gray-500 text-sm mt-1">{g.ProjectArea}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
