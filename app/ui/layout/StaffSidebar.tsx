import Link from "next/link";

export default function StaffSidebar() {
  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#1f2933",
        color: "white",
        padding: "20px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Staff Panel</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link href="/staff/dashboard">Dashboard</Link>
        <Link href="/projectgroup">Project Groups</Link>
        <Link href="/projectmeeting">Meetings</Link>
        <Link href="/projectmeetingattendance">Attendance</Link>
      </nav>
    </aside>
  );
}
