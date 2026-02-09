import { AddProjectGroupMemberAction } from "@/app/actions/projectgroupmember/AddProjectGroupMemberAction";
import { prisma } from "@/app/lib/prisma";
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

export default async function AddProjectGroupMember() {
  const groups = await prisma.projectgroup.findMany();
  const students = await prisma.student.findMany();

  return (
    <div style={formWrap}>
      <form action={AddProjectGroupMemberAction}>
        <h2 style={{ marginBottom: "16px", color: "#111827" }}>Add Group Member</h2>

        <label style={labelStyle}>Project Group</label>
        <select name="ProjectGroupID" required style={inputStyle}>
          <option value="">Select Project Group</option>
          {groups.map((g) => (
            <option key={g.ProjectGroupID} value={g.ProjectGroupID}>
              {g.ProjectGroupName}
            </option>
          ))}
        </select>

        <label style={labelStyle}>Student</label>
        <select name="StudentID" required style={inputStyle}>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.StudentID} value={s.StudentID}>
              {s.StudentName}
            </option>
          ))}
        </select>

        <div style={checkboxWrap}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input type="checkbox" name="IsGroupLeader" />
            <span>Is Group Leader</span>
          </label>
        </div>

        <div style={btnWrap}>
          <button type="submit" style={primaryBtn}>Save</button>
          <Link href="/projectgroupmember"><button type="button" style={secondaryBtn}>Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
