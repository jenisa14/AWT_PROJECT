import Link from "next/link";

const linkStyle = {
  display: "block",
  padding: "10px 12px",
  color: "#111827",
  textDecoration: "none",
  borderRadius: "6px",
  marginBottom: "6px",
  backgroundColor: "#f3f4f6",
};

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#e5e7eb",
        padding: "15px",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Master Tables</h3>

      <Link href="/student" style={linkStyle}>Students</Link>
      <Link href="/staff" style={linkStyle}>Staff</Link>
      <Link href="/projecttype" style={linkStyle}>Project Types</Link>

      <hr style={{ margin: "12px 0" }} />

      <h3 style={{ marginBottom: "10px" }}>Project Management</h3>

      <Link href="/projectgroup" style={linkStyle}>Project Groups</Link>
      <Link href="/projectgroupmember" style={linkStyle}>Project Group Members</Link>
      <Link href="/projectmeeting" style={linkStyle}>Project Meetings</Link>
      <Link href="/projectmeetingattendance" style={linkStyle}>
        Meeting Attendance
      </Link>
    </aside>
  );
}
