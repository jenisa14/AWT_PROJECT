import { prisma } from "@/app/lib/prisma";
import DeleteProjectMeetingAttendanceBtn from "@/app/ui/projectmeetingattendance/DeleteProjectMeetingAttendanceBtn";
import Link from "next/link";

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const attendanceID = Number(id);

  if (Number.isNaN(attendanceID)) {
    return <h2 className="text-white text-center mt-10">Invalid Attendance ID</h2>;
  }

  // Fetch attendance
  const attendance = await prisma.projectmeetingattendance.findUnique({
    where: { ProjectMeetingAttendanceID: attendanceID },
  });

  if (!attendance) {
    return <h2 className="text-white text-center mt-10">Attendance not found</h2>;
  }

  // Fetch student and meeting separately
  const student = await prisma.student.findUnique({
    where: { StudentID: attendance.StudentID },
  });

  const meeting = await prisma.projectmeeting.findUnique({
    where: { ProjectMeetingID: attendance.ProjectMeetingID },
  });

  return (
    <>
      <h2>Attendance Details</h2>
      <br />
      <table border={1} cellPadding={10} style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <th>Student Name:</th>
            <td>{student?.StudentName}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{student?.Email || "No email"}</td>
          </tr>
          <tr>
            <th>Meeting ID:</th>
            <td>{attendance.ProjectMeetingID}</td>
          </tr>
          <tr>
            <th>Meeting Purpose:</th>
            <td>{meeting?.MeetingPurpose || "No purpose"}</td>
          </tr>
          <tr>
            <th>Present:</th>
            <td>{attendance.IsPresent ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      <br />

      <div style={{ display: "flex", gap: "10px" }}>
        <Link href="/projectmeetingattendance">
          <button>Back</button>
        </Link>

        <DeleteProjectMeetingAttendanceBtn id={attendance.ProjectMeetingAttendanceID} />
      </div>
    </>
  );
}
