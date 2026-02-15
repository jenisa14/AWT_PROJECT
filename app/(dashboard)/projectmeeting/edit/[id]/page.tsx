import { prisma } from "@/app/lib/prisma";
import UpdateProjectMeetingAction from "@/app/actions/projectmeeting/UpdateProjectMeetingAction";
import { theme, styles } from "@/app/lib/theme";
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

  if (!meeting) return <h2 style={{ color: theme.colors.text }}>Meeting not found</h2>;

  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Edit Project Meeting</h2>

        <form action={UpdateProjectMeetingAction}>
          <input type="hidden" name="ProjectMeetingID" value={meeting.ProjectMeetingID} />

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ProjectGroupID" style={styles.label()}>Project Group ID</label>
            <input id="ProjectGroupID" name="ProjectGroupID" type="number" defaultValue={meeting.ProjectGroupID} style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="GuideStaffID" style={styles.label()}>Guide Staff ID</label>
            <input id="GuideStaffID" name="GuideStaffID" type="number" defaultValue={meeting.GuideStaffID} style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="MeetingDateTime" style={styles.label()}>Date & Time</label>
            <input
              id="MeetingDateTime"
              type="datetime-local"
              name="MeetingDateTime"
              defaultValue={meeting.MeetingDateTime.toISOString().slice(0, 16)}
              style={styles.input()}
            />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="MeetingPurpose" style={styles.label()}>Purpose</label>
            <input id="MeetingPurpose" name="MeetingPurpose" defaultValue={meeting.MeetingPurpose ?? ""} style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="MeetingNotes" style={styles.label()}>Notes</label>
            <textarea id="MeetingNotes" name="MeetingNotes" defaultValue={meeting.MeetingNotes ?? ""} style={styles.textarea()} />
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Update</button>
            <Link href="/projectmeeting"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
