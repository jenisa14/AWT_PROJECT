import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import DeleteProjectMeetingBtn from "@/app/ui/projectmeeting/DeleteProjectMeetingBtn";

export default async function ProjectMeetingList({
  searchParams,
}: {
  searchParams?: { msg?: string };
}) {
  const msg = searchParams?.msg;

  const meetings = await prisma.projectmeeting.findMany();

  return (
    
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "#f8fafc",
      }}
    >

      {msg && (
        <div
          style={{
            backgroundColor: "#16a34a",
            color: "white",
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "4px",
          }}
        >
          {msg === "added" && "Project Meeting added successfully"}
          {msg === "updated" && "Project Meeting updated successfully"}
          {msg === "deleted" && "Project Meeting deleted successfully"}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Project Meetings</h2>

        <Link href="/projectmeeting/add">
          <button>Add Meeting</button>
        </Link>
      </div>

      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Guide Staff ID</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {meetings.map((m) => (
            <tr key={m.ProjectMeetingID}>
              <td>{m.ProjectGroupID}</td>
              <td>{m.GuideStaffID}</td>
              <td>{m.MeetingDateTime.toString()}</td>
              <td>
                <Link href={`/projectmeeting/${m.ProjectMeetingID}`}>
                  <button>Details</button>
                </Link>

                <Link href={`/projectmeeting/edit/${m.ProjectMeetingID}`}>
                  <button>Edit</button>
                </Link>

                <DeleteProjectMeetingBtn id={m.ProjectMeetingID} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
