import { AddProjectTypeAction } from "@/app/actions/projecttype/AddProjectTypeAction";
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

export default function AddProjectType() {
  return (
    <div style={formWrap}>
      <form action={AddProjectTypeAction}>
        <h2 style={{ marginBottom: "16px", color: "#111827" }}>Add Project Type</h2>

        <input type="text" name="ProjectTypeName" placeholder="Project Type Name" required style={inputStyle} />
        <input type="text" name="Description" placeholder="Description" style={inputStyle} />

        <div style={btnWrap}>
          <button type="submit" style={primaryBtn}>Save</button>
          <Link href="/projecttype"><button type="button" style={secondaryBtn}>Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
