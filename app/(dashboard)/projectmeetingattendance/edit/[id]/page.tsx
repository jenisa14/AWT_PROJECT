import { prisma } from "@/app/lib/prisma";
import { UpdateProjectMeetingAttendanceAction } from "@/app/actions/projectmeetingattendance/UpdateProjectMeetingAttendanceAction";

export default async function EditAttendancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const attendanceID = Number(id);

  if (Number.isNaN(attendanceID)) return <h2>Invalid Attendance ID</h2>;

  const attendance = await prisma.projectmeetingattendance.findUnique({
    where: { ProjectMeetingAttendanceID: attendanceID },
  });

  if (!attendance) return <h2>Record not found</h2>;

  // Fetch data for dropdowns
  const meetings = await prisma.projectmeeting.findMany();
  const students = await prisma.student.findMany();

  return (
    <form action={UpdateProjectMeetingAttendanceAction} style={{ padding: 20 }}>
      <h2>Edit Attendance</h2>

      <input type="hidden" name="ProjectMeetingAttendanceID" value={attendanceID} />

      <label>
        Project Meeting:
        <select
          name="ProjectMeetingID"
          defaultValue={attendance.ProjectMeetingID}
          required
        >
          {meetings.map(m => (
            <option key={m.ProjectMeetingID} value={m.ProjectMeetingID}>
              {m.ProjectMeetingID} - {m.MeetingPurpose || "No Purpose"}
            </option>
          ))}
        </select>
      </label>

      <br /><br />

      <label>
        Student:
        <select
          name="StudentID"
          defaultValue={attendance.StudentID}
          required
        >
          {students.map(s => (
            <option key={s.StudentID} value={s.StudentID}>
              {s.StudentName} ({s.Email || "No email"})
            </option>
          ))}
        </select>
      </label>

      <br /><br />

      <label>
        <input
          type="checkbox"
          name="IsPresent"
          defaultChecked={attendance.IsPresent}
        /> Present
      </label>

      <br /><br />

      <button type="submit">Update</button>
    </form>
  );
}
