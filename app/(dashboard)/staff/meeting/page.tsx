import { prisma } from "@/lib/prisma";

export default async function StaffMeetingPage() {
  const meetings = await prisma.projectMeeting.findMany({
    orderBy: { MeetingDateTime: "desc" },
    include: {
        ProjectGroup: true
    }
  }).catch(() => []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Staff - Project Meetings</h1>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {meetings.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">No meetings scheduled.</td></tr>
            ) : (
              meetings.map(m => (
                <tr key={m.ProjectMeetingID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{m.ProjectGroup?.ProjectGroupName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(m.MeetingDateTime).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{m.MeetingPurpose}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
