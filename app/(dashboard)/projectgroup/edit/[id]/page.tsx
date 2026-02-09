import { prisma } from "@/app/lib/prisma";
import { UpdateProjectGroupAction } from "@/app/actions/projectgroup/UpdateProjectGroupAction";
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

export default async function EditProjectGroup({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  const group = await prisma.projectgroup.findUnique({
    where: { ProjectGroupID: Number(id) },
  });

  if (!group) return <h2>Not found</h2>;

  return (
    <div style={formWrap}>
      <form action={UpdateProjectGroupAction}>
        <input type="hidden" name="ProjectGroupID" value={group.ProjectGroupID} />

        <h2 style={{ marginBottom: "16px", color: "#111827" }}>Edit Project Group</h2>

        <input name="ProjectGroupName" placeholder="Group Name" defaultValue={group.ProjectGroupName} required style={inputStyle} />
        <input name="ProjectTitle" placeholder="Project Title" defaultValue={group.ProjectTitle} required style={inputStyle} />
        <input name="ProjectArea" placeholder="Project Area" defaultValue={group.ProjectArea ?? ""} style={inputStyle} />

        <div style={btnWrap}>
          <button type="submit" style={primaryBtn}>Update</button>
          <Link href="/projectgroup"><button type="button" style={secondaryBtn}>Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
