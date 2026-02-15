import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import ListPageLayout from "@/app/components/ListPageLayout";
import DeleteProjectMeetingAttendanceBtn from "@/app/ui/projectmeetingattendance/DeleteProjectMeetingAttendanceBtn";
import { resolveMsg } from "@/app/lib/resolveSearchParams";
import { theme, styles } from "@/app/lib/theme";

export default async function ProjectMeetingAttendanceList({
  searchParams,
}: {
  searchParams?: Promise<{ msg?: string }> | { msg?: string };
}) {
  const msg = await resolveMsg(searchParams);
  const attendance = await prisma.projectmeetingattendance.findMany();

  return (
    <ListPageLayout title="Project Meeting Attendance" addHref="/projectmeetingattendance/add" addLabel="Add Attendance" msg={msg} entityName="Attendance">
      <table style={styles.table()}>
        <thead>
          <tr>
            <th style={styles.th()}>Meeting ID</th>
            <th style={styles.th()}>Student ID</th>
            <th style={styles.th()}>Present</th>
            <th style={{ ...styles.th(), textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a.ProjectMeetingAttendanceID} style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}>
              <td style={styles.td()}>{a.ProjectMeetingID}</td>
              <td style={styles.td()}>{a.StudentID}</td>
              <td style={styles.td()}>{a.IsPresent ? "Yes" : "No"}</td>
              <td style={styles.td()}>
                <div style={styles.actionsRow()}>
                  <Link href={`/projectmeetingattendance/edit/${a.ProjectMeetingAttendanceID}`}>
                    <button style={styles.btnSuccess()}>Edit</button>
                  </Link>
                  <DeleteProjectMeetingAttendanceBtn id={a.ProjectMeetingAttendanceID} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ListPageLayout>
  );
}
