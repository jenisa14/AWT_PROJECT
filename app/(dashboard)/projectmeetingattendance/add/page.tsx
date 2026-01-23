import { prisma } from "@/app/lib/prisma";
import { AddProjectMeetingAttendanceAction } from "@/app/actions/projectmeetingattendance/AddProjectMeetingAttendanceAction";

export default async function AddAttendancePage() {
  // Fetch meetings and students for dropdown
  const meetings = await prisma.projectmeeting.findMany();
  const students = await prisma.student.findMany();

  return (
    <form action={AddProjectMeetingAttendanceAction} style={{ padding: 20 }}>
      <h2>Add Attendance</h2>

      <label>
        Project Meeting:
        <select name="ProjectMeetingID" required>
          <option value="">Select meeting</option>
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
        <select name="StudentID" required>
          <option value="">Select student</option>
          {students.map(s => (
            <option key={s.StudentID} value={s.StudentID}>
              {s.StudentName} ({s.Email || "No email"})
            </option>
          ))}
        </select>
      </label>

      <br /><br />

      <label>
        <input type="checkbox" name="IsPresent" /> Present
      </label>

      <br /><br />

      <button type="submit">Save</button>
    </form>
  );
}
