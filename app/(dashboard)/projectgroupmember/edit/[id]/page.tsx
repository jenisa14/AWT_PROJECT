import { UpdateProjectGroupMemberAction } from "@/app/actions/projectgroupmember/UpdateProjectGroupMemberAction";
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

export default async function EditProjectGroupMember({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const member = await prisma.projectgroupmember.findUnique({
    where: { ProjectGroupMemberID: Number(id) },
  });

  const groups = await prisma.projectgroup.findMany();
  const students = await prisma.student.findMany();

  if (!member) return <h2>Not found</h2>;

  return (
    <div style={formWrap}>
      <form action={UpdateProjectGroupMemberAction}>
        <input type="hidden" name="ProjectGroupMemberID" value={member.ProjectGroupMemberID} />

        <h2 style={{ marginBottom: "16px", color: "#111827" }}>Edit Group Member</h2>

        <label style={labelStyle}>Project Group</label>
        <select name="ProjectGroupID" defaultValue={member.ProjectGroupID} style={inputStyle}>
          {groups.map((g) => (
            <option key={g.ProjectGroupID} value={g.ProjectGroupID}>
              {g.ProjectGroupName}
            </option>
          ))}
        </select>

        <label style={labelStyle}>Student</label>
        <select name="StudentID" defaultValue={member.StudentID} style={inputStyle}>
          {students.map((s) => (
            <option key={s.StudentID} value={s.StudentID}>
              {s.StudentName}
            </option>
          ))}
        </select>

        <div style={checkboxWrap}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input type="checkbox" name="IsGroupLeader" defaultChecked={member.IsGroupLeader ?? false} />
            <span>Is Group Leader</span>
          </label>
        </div>

        <div style={btnWrap}>
          <button type="submit" style={primaryBtn}>Update</button>
          <Link href="/projectgroupmember"><button type="button" style={secondaryBtn}>Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
