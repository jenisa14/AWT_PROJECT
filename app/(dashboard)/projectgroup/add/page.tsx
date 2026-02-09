import { AddProjectGroupAction } from "@/app/actions/projectgroup/AddProjectGroupAction";
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

export default function AddProjectGroup() {
  return (
    <div style={formWrap}>
      <form action={AddProjectGroupAction}>
        <h2 style={{ marginBottom: "16px", color: "#111827" }}>Add Project Group</h2>

        <input name="ProjectGroupName" placeholder="Group Name" required style={inputStyle} />
        <input name="ProjectTitle" placeholder="Project Title" required style={inputStyle} />
        <input name="ProjectTypeID" type="number" placeholder="Project Type ID" required style={inputStyle} />
        <input name="ConvenerStaffID" type="number" placeholder="Convener Staff ID" required style={inputStyle} />
        <input name="ExpertStaffID" type="number" placeholder="Expert Staff ID" style={inputStyle} />
        <input name="ProjectArea" placeholder="Project Area" style={inputStyle} />

        <div style={btnWrap}>
          <button type="submit" style={primaryBtn}>Save</button>
          <Link href="/projectgroup"><button type="button" style={secondaryBtn}>Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
