import { prisma } from "@/app/lib/prisma";
import { UpdateProjectMeetingAttendanceAction } from "@/app/actions/projectmeetingattendance/UpdateProjectMeetingAttendanceAction";
import { theme, styles } from "@/app/lib/theme";
import Link from "next/link";

export default async function EditAttendancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const attendanceID = Number(id);

  if (Number.isNaN(attendanceID)) return <h2 style={{ color: theme.colors.text }}>Invalid Attendance ID</h2>;

  const attendance = await prisma.projectmeetingattendance.findUnique({
    where: { ProjectMeetingAttendanceID: attendanceID },
  });

  if (!attendance) return <h2 style={{ color: theme.colors.text }}>Record not found</h2>;

  const meetings = await prisma.projectmeeting.findMany();
  const students = await prisma.student.findMany();

  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Edit Attendance</h2>

        <form action={UpdateProjectMeetingAttendanceAction}>
          <input type="hidden" name="ProjectMeetingAttendanceID" value={attendanceID} />

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Project Meeting</label>
            <select name="ProjectMeetingID" defaultValue={attendance.ProjectMeetingID} required style={styles.input()}>
              {meetings.map((m) => (
                <option key={m.ProjectMeetingID} value={m.ProjectMeetingID}>
                  {m.ProjectMeetingID} - {m.MeetingPurpose || "No Purpose"}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Student</label>
            <select name="StudentID" defaultValue={attendance.StudentID} required style={styles.input()}>
              {students.map((s) => (
                <option key={s.StudentID} value={s.StudentID}>
                  {s.StudentName} ({s.Email || "No email"})
                </option>
              ))}
            </select>
          </div>

          <div style={styles.checkboxRow()}>
            <label style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm, cursor: "pointer", color: theme.colors.text }}>
              <input type="checkbox" name="IsPresent" defaultChecked={attendance.IsPresent} />
              <span>Present</span>
            </label>
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Update</button>
            <Link href="/projectmeetingattendance"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
