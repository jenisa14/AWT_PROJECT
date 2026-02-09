import { AddStaffAction } from "@/app/actions/staff/AddStaffAction";
import Link from "next/link";

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

export default function AddStaff() {
  return (
    <div style={{ padding: "20px", maxWidth: "450px", margin: "40px auto", backgroundColor: "#f8fafc", fontFamily: "Segoe UI, Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "16px", color: "#111827" }}>Add Staff</h2>

      <form action={AddStaffAction}>
        <input name="StaffName" placeholder="Staff Name" style={inputStyle} />
        <input name="Email" placeholder="Email" type="email" style={inputStyle} />
        <input name="Phone" placeholder="Phone" style={inputStyle} />
        <input type="password" name="Password" placeholder="Password" required style={inputStyle} />

        <div style={btnWrap}>
          <button type="submit" style={primaryBtn}>Save Staff</button>
          <Link href="/staff"><button type="button" style={secondaryBtn}>Cancel</button></Link>
        </div>
      </form>
    </div>
  );
}
