import { prisma } from "@/lib/prisma";

export default async function StaffAttendancePage() {
  const attendance = await prisma.projectMeetingAttendance.findMany({
    include: {
        Student: true,
        ProjectMeeting: {
            include: { ProjectGroup: true }
        }
    }
  }).catch(() => []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Staff - Meeting Attendance</h1>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendance.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">No attendance records found.</td></tr>
            ) : (
              attendance.map((a, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{a.Student?.StudentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.ProjectMeeting?.ProjectGroup?.ProjectGroupName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">Present</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
