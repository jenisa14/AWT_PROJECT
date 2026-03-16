import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { theme, styles } from "@/lib/theme";

export default async function StudentMeetingPage() {
  const meetings = await prisma.projectMeeting.findMany({
    orderBy: { MeetingDateTime: "desc" },
    include: {
        // We'll see if the relation works, else just raw data
    }
  }).catch(() => []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Meetings</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {meetings.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No meetings found.</td>
              </tr>
            ) : (
              meetings.map((m) => (
                <tr key={m.ProjectMeetingID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(m.MeetingDateTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{m.MeetingPurpose}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{m.MeetingNotes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
