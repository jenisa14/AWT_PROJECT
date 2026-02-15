import Link from "next/link";
import { Suspense } from "react";
import DashboardLoginToast from "@/app/components/DashboardLoginToast";
import { prisma } from "@/app/lib/prisma";
import { theme, styles } from "@/app/lib/theme";

export default async function StudentDashboard() {
  const [recentGroups, recentMeetings] = await Promise.all([
    prisma.projectgroup.findMany({ take: 5, orderBy: { Created: "desc" }, select: { ProjectGroupID: true, ProjectGroupName: true, ProjectTitle: true } }),
    prisma.projectmeeting.findMany({ take: 5, orderBy: { MeetingDateTime: "desc" }, select: { ProjectMeetingID: true, MeetingDateTime: true, MeetingPurpose: true } }),
  ]);

  const cardStyle: React.CSSProperties = { ...styles.card(), padding: theme.spacing.lg, marginBottom: theme.spacing.lg };

  return (
    <div style={{ padding: theme.spacing.xl }}>
      <Suspense fallback={null}><DashboardLoginToast /></Suspense>
      <h1 style={{ ...styles.title(), color: theme.colors.success, marginBottom: theme.spacing.xl }}>Student Dashboard</h1>

      <div style={cardStyle}>
        <h2 style={{ fontSize: theme.font.size.lg, fontWeight: 600, marginBottom: theme.spacing.lg, color: theme.colors.text }}>My Project</h2>
        <p style={{ color: theme.colors.textMuted, fontSize: theme.font.size.sm, marginBottom: theme.spacing.sm }}>Create or join a project group to get started.</p>
        <Link href="/projectgroupmember/add" style={{ color: theme.colors.success, fontWeight: 500, textDecoration: "none" }}>Add to group / Create group</Link>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: theme.font.size.lg, fontWeight: 600, marginBottom: theme.spacing.lg, color: theme.colors.text }}>Project Groups</h2>
        {recentGroups.length === 0 ? (
          <p style={{ color: theme.colors.textMuted, fontSize: theme.font.size.sm }}>No project groups yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {recentGroups.map((g) => (
              <li key={g.ProjectGroupID} style={{ marginBottom: theme.spacing.sm }}>
                <Link href={`/projectgroup/edit/${g.ProjectGroupID}`} style={{ color: theme.colors.success, fontWeight: 500, textDecoration: "none" }}>{g.ProjectGroupName}</Link>
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
                <span>{m.MeetingPurpose ?? "Meeting"}</span>
                <span style={{ fontSize: theme.font.size.sm, color: theme.colors.textMuted, marginLeft: theme.spacing.sm }}>{new Date(m.MeetingDateTime).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: theme.spacing.md }}>
        <Link href="/student/my_project" style={{ ...styles.btnSuccess(), textDecoration: "none" }}>My Project</Link>
        <Link href="/projectgroupmember/add" style={{ ...styles.btnSecondary(), textDecoration: "none" }}>Group Members</Link>
      </div>
    </div>
  );
}
