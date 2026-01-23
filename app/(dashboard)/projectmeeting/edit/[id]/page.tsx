import { prisma } from "@/app/lib/prisma";
import UpdateProjectMeetingAction from "@/app/actions/projectmeeting/UpdateProjectMeetingAction";
import Link from "next/link";

export default async function EditProjectMeeting({
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
    <form action={UpdateProjectMeetingAction}>
      <input
        type="hidden"
        name="ProjectMeetingID"
        value={meeting.ProjectMeetingID}
      />

      <input name="ProjectGroupID" defaultValue={meeting.ProjectGroupID} />
      <br /><br />

      <input name="GuideStaffID" defaultValue={meeting.GuideStaffID} />
      <br /><br />

      <input
        type="datetime-local"
        name="MeetingDateTime"
        defaultValue={meeting.MeetingDateTime.toISOString().slice(0, 16)}
      />
      <br /><br />

      <input
        name="MeetingPurpose"
        defaultValue={meeting.MeetingPurpose ?? ""}
      />
      <br /><br />

      <input
        name="MeetingNotes"
        defaultValue={meeting.MeetingNotes ?? ""}
      />
      <br /><br />

      <button type="submit">Update</button>
      <Link href="/projectmeeting">
        <button type="button">Cancel</button>
      </Link>
    </form>
  );
}
