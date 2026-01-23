import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-600">
        Student Dashboard
      </h1>

      <ul className="mt-6 space-y-3">
        <li><Link href={`/student/my_project`}>My Project</Link></li>
        <li>Meetings</li>
        <li>Documents</li>
      </ul>
    </div>
  );
}
