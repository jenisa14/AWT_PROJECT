import { prisma } from "@/app/lib/prisma";
import UpdateProjectMeetingAction from "@/app/actions/projectmeeting/UpdateProjectMeetingAction";
import Link from "next/link";

const formWrap = {
  padding: "20px",
  maxWidth: "500px",
  margin: "0 auto",
  backgroundColor: "#f8fafc",
  fontFamily: "Segoe UI, Arial, sans-serif",
};
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "14px",
  boxSizing: "border-box" as const,
};
const textareaStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "14px",
  boxSizing: "border-box" as const,
  minHeight: "80px",
};
const labelStyle = { display: "block", marginBottom: "4px", fontWeight: 500, color: "#374151" };
const btnWrap = { display: "flex", gap: "10px", marginTop: "16px" };
const primaryBtn = {
  backgroundColor: "#2563eb",
  color: "white",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 500,
};
const secondaryBtn = {
  backgroundColor: "#6b7280",
  color: "white",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 500,
};

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
    <div style={formWrap}>
      <form action={UpdateProjectMeetingAction}>
        <input type="hidden" name="ProjectMeetingID" value={meeting.ProjectMeetingID} />

        <h2 style={{ marginBottom: "16px", color: "#111827" }}>Edit Project Meeting</h2>

        <label style={labelStyle}>Project Group ID</label>
        <input name="ProjectGroupID" defaultValue={meeting.ProjectGroupID} style={inputStyle} />

        <label style={labelStyle}>Guide Staff ID</label>
        <input name="GuideStaffID" defaultValue={meeting.GuideStaffID} style={inputStyle} />

        <label style={labelStyle}>Date & Time</label>
        <input
          type="datetime-local"
          name="MeetingDateTime"
          defaultValue={meeting.MeetingDateTime.toISOString().slice(0, 16)}
          style={inputStyle}
        />

        <label style={labelStyle}>Purpose</label>
        <input name="MeetingPurpose" defaultValue={meeting.MeetingPurpose ?? ""} style={inputStyle} />

        <label style={labelStyle}>Notes</label>
        <textarea name="MeetingNotes" defaultValue={meeting.MeetingNotes ?? ""} style={textareaStyle} />

        <div style={btnWrap}>
          <button type="submit" style={primaryBtn}>Update</button>
          <Link href="/projectmeeting"><button type="button" style={secondaryBtn}>Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
