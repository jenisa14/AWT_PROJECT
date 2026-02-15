import Link from "next/link";
import { Suspense } from "react";
import DashboardLoginToast from "@/app/components/DashboardLoginToast";
import { prisma } from "@/app/lib/prisma";
import { theme, styles } from "@/app/lib/theme";

export default async function StaffDashboard() {
  const [projectGroups, meetings, recentMeetings] = await Promise.all([
    prisma.projectgroup.findMany({ take: 10, select: { ProjectGroupID: true, ProjectGroupName: true, ProjectTitle: true }, orderBy: { Created: "desc" } }),
    prisma.projectmeeting.count(),
    prisma.projectmeeting.findMany({ take: 5, orderBy: { MeetingDateTime: "desc" }, select: { ProjectMeetingID: true, MeetingDateTime: true, MeetingPurpose: true } }),
  ]);

  const cardStyle: React.CSSProperties = { ...styles.card(), padding: theme.spacing.lg, marginBottom: theme.spacing.lg };

  return (
    <div style={{ padding: theme.spacing.xl }}>
      <Suspense fallback={null}><DashboardLoginToast /></Suspense>
      <h1 style={{ ...styles.title(), color: theme.colors.primary, marginBottom: theme.spacing.xl }}>Staff Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: theme.spacing.lg, marginBottom: theme.spacing.xl }}>
        <div style={cardStyle}>
          <p style={{ fontSize: 12, color: theme.colors.textMuted, margin: 0, marginBottom: 4 }}>Total Meetings</p>
          <p style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{meetings}</p>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: theme.font.size.lg, fontWeight: 600, marginBottom: theme.spacing.lg, color: theme.colors.text }}>Project Groups</h2>
        {projectGroups.length === 0 ? (
          <p style={{ color: theme.colors.textMuted, fontSize: theme.font.size.sm }}>No project groups yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {projectGroups.map((g) => (
              <li key={g.ProjectGroupID} style={{ marginBottom: theme.spacing.sm }}>
                <Link href={`/projectgroup/edit/${g.ProjectGroupID}`} style={{ color: theme.colors.primary, fontWeight: 500, textDecoration: "none" }}>{g.ProjectGroupName}</Link>
                <span style={{ color: theme.colors.textMuted, fontSize: theme.font.size.sm, display: "block" }}>{g.ProjectTitle}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: theme.font.size.lg, fontWeight: 600, marginBottom: theme.spacing.lg, color: theme.colors.text }}>Recent Meetings</h2>
        {recentMeetings.length === 0 ? (
          <p style={{ color: theme.colors.textMuted, fontSize: theme.font.size.sm }}>No meetings yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {recentMeetings.map((m) => (
              <li key={m.ProjectMeetingID} style={{ padding: theme.spacing.sm, borderBottom: `1px solid ${theme.colors.borderLight}` }}>
                <span style={{ fontWeight: 500 }}>{m.MeetingPurpose ?? "Meeting"}</span>
                <span style={{ fontSize: theme.font.size.sm, color: theme.colors.textMuted, marginLeft: theme.spacing.sm }}>{new Date(m.MeetingDateTime).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: theme.spacing.md }}>
        <Link href="/projectgroup" style={{ ...styles.btnPrimary(), textDecoration: "none" }}>Project Groups</Link>
        <Link href="/projectmeeting" style={{ ...styles.btnPrimary(), textDecoration: "none" }}>Meetings</Link>
        <Link href="/projectmeetingattendance" style={{ ...styles.btnSecondary(), textDecoration: "none" }}>Attendance</Link>
      </div>
    </div>
  );
}
