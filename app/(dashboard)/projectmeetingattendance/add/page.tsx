import { prisma } from "@/app/lib/prisma";
import { AddProjectMeetingAttendanceAction } from "@/app/actions/projectmeetingattendance/AddProjectMeetingAttendanceAction";
import Link from "next/link";

const formWrap = {
  padding: "20px",
  maxWidth: "480px",
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
const labelStyle = { display: "block", marginBottom: "4px", fontWeight: 500, color: "#374151" };
const checkboxWrap = { marginBottom: "16px" };
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

export default async function AddAttendancePage() {
  const meetings = await prisma.projectmeeting.findMany();
  const students = await prisma.student.findMany();

  return (
    <div style={formWrap}>
      <form action={AddProjectMeetingAttendanceAction}>
        <h2 style={{ marginBottom: "16px", color: "#111827" }}>Add Attendance</h2>

        <label style={labelStyle}>Project Meeting</label>
        <select name="ProjectMeetingID" required style={inputStyle}>
          <option value="">Select meeting</option>
          {meetings.map((m) => (
            <option key={m.ProjectMeetingID} value={m.ProjectMeetingID}>
              {m.ProjectMeetingID} - {m.MeetingPurpose || "No Purpose"}
            </option>
          ))}
        </select>

        <label style={labelStyle}>Student</label>
        <select name="StudentID" required style={inputStyle}>
          <option value="">Select student</option>
          {students.map((s) => (
            <option key={s.StudentID} value={s.StudentID}>
              {s.StudentName} ({s.Email || "No email"})
            </option>
          ))}
        </select>

        <div style={checkboxWrap}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input type="checkbox" name="IsPresent" />
            <span>Present</span>
          </label>
        </div>

        <div style={btnWrap}>
          <button type="submit" style={primaryBtn}>Save</button>
          <Link href="/projectmeetingattendance"><button type="button" style={secondaryBtn}>Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
