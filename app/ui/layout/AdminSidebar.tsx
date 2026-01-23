import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#111827",
        color: "white",
        padding: "20px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Admin Panel</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link href="/dashboard" className="text-white">Dashboard</Link>
        <Link href="/student">Students</Link>
        <Link href="/staff">Staff</Link>
        <Link href="/projecttype">Project Types</Link>
        <Link href="/projectgroup">Project Groups</Link>
        <Link href="/projectgroupmember">Group Members</Link>
        <Link href="/projectmeeting">Meetings</Link>
        <Link href="/projectmeetingattendance">Attendance</Link>
      </nav>
    </aside>
  );
}
