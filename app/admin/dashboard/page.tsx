import Link from "next/link";
import { Suspense } from "react";
import DashboardLoginToast from "@/app/components/DashboardLoginToast";
import { prisma } from "@/app/lib/prisma";
import { theme, styles } from "@/app/lib/theme";

export default async function AdminDashboard() {
  const [totalProjects, totalStudents, totalStaff, totalMeetings, recentGroups] = await Promise.all([
    prisma.projectgroup.count(),
    prisma.student.count(),
    prisma.staff.count(),
    prisma.projectmeeting.count(),
    prisma.projectgroup.findMany({
      take: 5,
      orderBy: { Created: "desc" },
      select: { ProjectGroupID: true, ProjectGroupName: true, Created: true },
    }),
  ]);

  const cardStyle: React.CSSProperties = {
    ...styles.card(),
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    textDecoration: "none",
    color: theme.colors.text,
    display: "block",
  };

  return (
    <div style={{ padding: theme.spacing.xl }}>
      <Suspense fallback={null}><DashboardLoginToast /></Suspense>
      <h1 style={{ ...styles.title(), color: theme.colors.primary, marginBottom: theme.spacing.xl }}>Admin Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: theme.spacing.lg, marginBottom: theme.spacing.xxl }}>
        <Link href="/projectgroup" style={cardStyle}>
          <p style={{ fontSize: 12, color: theme.colors.textMuted, margin: 0, marginBottom: 4 }}>Total Projects</p>
          <p style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{totalProjects}</p>
        </Link>
        <Link href="/student" style={cardStyle}>
          <p style={{ fontSize: 12, color: theme.colors.textMuted, margin: 0, marginBottom: 4 }}>Total Students</p>
          <p style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{totalStudents}</p>
        </Link>
        <Link href="/staff" style={cardStyle}>
          <p style={{ fontSize: 12, color: theme.colors.textMuted, margin: 0, marginBottom: 4 }}>Total Staff</p>
          <p style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{totalStaff}</p>
        </Link>
        <Link href="/projectmeeting" style={cardStyle}>
          <p style={{ fontSize: 12, color: theme.colors.textMuted, margin: 0, marginBottom: 4 }}>Total Meetings</p>
          <p style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{totalMeetings}</p>
        </Link>
      </div>

      <div style={styles.card()}>
        <h2 style={{ fontSize: theme.font.size.lg, fontWeight: 600, marginBottom: theme.spacing.lg, color: theme.colors.text }}>Recent Project Groups</h2>
        {recentGroups.length === 0 ? (
          <p style={{ color: theme.colors.textMuted, fontSize: theme.font.size.sm }}>No project groups yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {recentGroups.map((g) => (
              <li key={g.ProjectGroupID} style={{ padding: theme.spacing.sm, borderBottom: `1px solid ${theme.colors.borderLight}` }}>
                <Link href={`/projectgroup/edit/${g.ProjectGroupID}`} style={{ color: theme.colors.primary, fontWeight: 500, textDecoration: "none" }}>
                  {g.ProjectGroupName}
                </Link>
                <span style={{ fontSize: 12, color: theme.colors.textMuted, marginLeft: theme.spacing.sm }}>
                  {g.Created ? new Date(g.Created).toLocaleDateString() : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: theme.spacing.md, marginTop: theme.spacing.xl }}>
        <Link href="/student" style={{ ...styles.btnPrimary(), textDecoration: "none" }}>Student Management</Link>
        <Link href="/staff" style={{ ...styles.btnPrimary(), textDecoration: "none" }}>Staff Management</Link>
        <Link href="/projecttype" style={{ ...styles.btnPrimary(), textDecoration: "none" }}>Project Types</Link>
        <Link href="/projectgroup" style={{ ...styles.btnSecondary(), textDecoration: "none" }}>Project Groups</Link>
      </div>
    </div>
  );
}
