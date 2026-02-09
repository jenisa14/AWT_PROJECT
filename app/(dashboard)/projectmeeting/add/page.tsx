import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { AddProjectMeetingAction } from "@/app/actions/projectmeeting/AddProjectMeetingAction";

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

export default async function AddProjectMeetingPage() {
  const groups = await prisma.projectgroup.findMany();
  const staff = await prisma.staff.findMany();

  return (
    <div style={formWrap}>
      <h2 style={{ marginBottom: "16px", color: "#111827" }}>Add Project Meeting</h2>

      <form action={AddProjectMeetingAction}>
        <label style={labelStyle}>Project Group</label>
        <select name="ProjectGroupID" required style={inputStyle}>
          <option value="">-- Select Group --</option>
          {groups.map((g) => (
            <option key={g.ProjectGroupID} value={g.ProjectGroupID}>
              {g.ProjectGroupName}
            </option>
          ))}
        </select>

        <label style={labelStyle}>Guide Staff</label>
        <select name="GuideStaffID" required style={inputStyle}>
          <option value="">-- Select Staff --</option>
          {staff.map((s) => (
            <option key={s.StaffID} value={s.StaffID}>
              {s.StaffName}
            </option>
          ))}
        </select>

        <label style={labelStyle}>Date & Time</label>
        <input type="datetime-local" name="MeetingDateTime" required style={inputStyle} />

        <label style={labelStyle}>Purpose</label>
        <input type="text" name="MeetingPurpose" placeholder="Purpose" required style={inputStyle} />

        <label style={labelStyle}>Notes</label>
        <textarea name="MeetingNotes" placeholder="Notes" style={textareaStyle}></textarea>

        <div style={btnWrap}>
          <button type="submit" style={primaryBtn}>Save</button>
          <Link href="/projectmeeting"><button type="button" style={secondaryBtn}>Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
