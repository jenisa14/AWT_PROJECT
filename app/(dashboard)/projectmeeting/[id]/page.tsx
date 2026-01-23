import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import DeleteProjectMeetingBtn from "@/app/ui/projectmeeting/DeleteProjectMeetingBtn";

export default async function ProjectMeetingDetails({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const meeting = await prisma.projectmeeting.findUnique({
    where: { ProjectMeetingID: Number(id) },
  });

  if (!meeting) return <h2>Meeting not found</h2>;

  return (
    <>
      <h2>Project Meeting Details</h2>

      <table border={1} cellPadding={10}>
        <tbody>
          <tr>
            <th>Group ID</th>
            <td>{meeting.ProjectGroupID}</td>
          </tr>
          <tr>
            <th>Guide Staff ID</th>
            <td>{meeting.GuideStaffID}</td>
          </tr>
          <tr>
            <th>Purpose</th>
            <td>{meeting.MeetingPurpose}</td>
          </tr>
        </tbody>
      </table>

      <br />

      <Link href="/projectmeeting">
        <button>Back</button>
      </Link>

      <DeleteProjectMeetingBtn id={meeting.ProjectMeetingID} />
    </>
  );
}
