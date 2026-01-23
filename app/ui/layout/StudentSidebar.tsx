import Link from "next/link";

export default function StudentSidebar() {
  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#0f766e",
        color: "white",
        padding: "20px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Student Panel</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link href="/student/dashboard">Dashboard</Link>
        <Link href="/my-projects">My Projects</Link>
        <Link href="/projectmeeting">Meetings</Link>
        <Link href="/projectmeetingattendance">Attendance</Link>
      </nav>
    </aside>
  );
}
