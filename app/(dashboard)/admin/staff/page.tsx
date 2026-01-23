import Link from "next/link";

export default function StaffDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600">
        Staff Dashboard
      </h1>

      <ul className="mt-6 space-y-3">
        <li><Link href="/projectgroup">Project Groups</Link></li>
        <li><Link href="/projectmeeting">Project Meetings</Link></li>
        <li><Link href="/projectmeetingattendance">Attendance</Link></li>
      </ul>
    </div>
  );
}
