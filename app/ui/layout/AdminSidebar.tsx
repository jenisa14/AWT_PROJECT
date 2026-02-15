import Link from "next/link";
import { theme } from "@/app/lib/theme";

const asideStyle: React.CSSProperties = {
  width: 250,
  backgroundColor: theme.colors.header,
  color: "#fff",
  padding: theme.spacing.xl,
};
const linkStyle: React.CSSProperties = {
  display: "block",
  padding: "10px 12px",
  color: "#e2e8f0",
  textDecoration: "none",
  borderRadius: theme.radius.sm,
  marginBottom: theme.spacing.sm,
};

export default function AdminSidebar() {
  return (
    <aside style={asideStyle}>
      <h3 style={{ marginBottom: theme.spacing.lg }}>Admin Panel</h3>
      <nav>
        <Link href="/admin/dashboard" style={linkStyle}>Dashboard</Link>
        <Link href="/student" style={linkStyle}>Students</Link>
        <Link href="/staff" style={linkStyle}>Staff</Link>
        <Link href="/projecttype" style={linkStyle}>Project Types</Link>
        <Link href="/projectgroup" style={linkStyle}>Project Groups</Link>
        <Link href="/projectgroupmember" style={linkStyle}>Group Members</Link>
        <Link href="/projectmeeting" style={linkStyle}>Meetings</Link>
        <Link href="/projectmeetingattendance" style={linkStyle}>Attendance</Link>
      </nav>
    </aside>
  );
}
