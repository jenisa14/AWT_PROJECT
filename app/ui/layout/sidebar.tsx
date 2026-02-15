import Link from "next/link";
import { styles } from "@/app/lib/theme";

export default function Sidebar() {
  return (
    <aside style={styles.sidebar()}>
      <h3 style={{ marginBottom: 12, color: "#1e293b" }}>Master Tables</h3>
      <Link href="/student" style={styles.sidebarLink()}>Students</Link>
      <Link href="/staff" style={styles.sidebarLink()}>Staff</Link>
      <Link href="/projecttype" style={styles.sidebarLink()}>Project Types</Link>
      <hr style={{ margin: "12px 0", borderColor: "#e2e8f0" }} />
      <h3 style={{ marginBottom: 12, color: "#1e293b" }}>Project Management</h3>
      <Link href="/projectgroup" style={styles.sidebarLink()}>Project Groups</Link>
      <Link href="/projectgroupmember" style={styles.sidebarLink()}>Project Group Members</Link>
      <Link href="/projectmeeting" style={styles.sidebarLink()}>Project Meetings</Link>
      <Link href="/projectmeetingattendance" style={styles.sidebarLink()}>Meeting Attendance</Link>
    </aside>
  );
}
