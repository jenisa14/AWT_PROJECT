import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import DeleteProjectMeetingAttendanceBtn from "@/app/ui/projectmeetingattendance/DeleteProjectMeetingAttendanceBtn";

export default async function ProjectMeetingAttendanceList({
  searchParams,
}: {
  searchParams?: { msg?: string };
}) {
  const msg = searchParams?.msg;

  const attendance = await prisma.projectmeetingattendance.findMany();

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>

      {msg && (
        <div style={{
          backgroundColor: "#16a34a",
          color: "white",
          padding: 8,
          marginBottom: 10,
          borderRadius: 4,
        }}>
          {msg === "added" && "Attendance added successfully"}
          {msg === "updated" && "Attendance updated successfully"}
          {msg === "deleted" && "Attendance deleted successfully"}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Project Meeting Attendance</h2>

        <Link href="/projectmeetingattendance/add">
          <button>Add Attendance</button>
        </Link>
      </div>

      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>Meeting ID</th>
            <th>Student ID</th>
            <th>Present</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map(a => (
            <tr key={a.ProjectMeetingAttendanceID}>
              <td>{a.ProjectMeetingID}</td>
              <td>{a.StudentID}</td>
              <td>{a.IsPresent ? "Yes" : "No"}</td>
              <td>
                <Link href={`/projectmeetingattendance/edit/${a.ProjectMeetingAttendanceID}`}>
                  <button>Edit</button>
                </Link>

                <DeleteProjectMeetingAttendanceBtn
                  id={a.ProjectMeetingAttendanceID}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
