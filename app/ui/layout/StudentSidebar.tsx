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

export default function StudentSidebar() {
  return (
    <aside style={asideStyle}>
      <h3 style={{ marginBottom: theme.spacing.lg }}>Student Panel</h3>
      <nav>
        <Link href="/student/dashboard" style={linkStyle}>Dashboard</Link>
        <Link href="/student/my_project" style={linkStyle}>My Projects</Link>
        <Link href="/projectmeeting" style={linkStyle}>Meetings</Link>
        <Link href="/projectmeetingattendance" style={linkStyle}>Attendance</Link>
      </nav>
    </aside>
  );
}
