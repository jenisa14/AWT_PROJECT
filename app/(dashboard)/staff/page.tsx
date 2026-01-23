import { prisma } from "@/app/lib/prisma";
import DeleteStaffBtn from "@/app/ui/staff/DeleteStaffBtn";


import Link from "next/link";

export default async function StffList({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  const { msg } = await searchParams;

  const students = await prisma.staff.findMany();

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "750px",
        margin: "0 auto",
        fontFamily: "Segoe UI, Arial, sans-serif",
        backgroundColor: "#f8fafc",
      }}
    >
     
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ margin: 0, color: "#111827" }}>User List</h2>

        <Link href="/staff/add">
          <button
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "8px 14px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            + Add Staff
          </button>
        </Link>
      </div>

      {msg === "deleted" && (
        <p
          style={{
            color: "green",
            marginBottom: "12px",
            fontWeight: 500,
          }}
        >
          Staff deleted successfully
        </p>
      )}

    
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#e5e7eb" }}>
            <th style={thStyle}>Staff Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr
              key={s.StaffID}
              style={{ borderBottom: "1px solid #e5e7eb" }}
            >
              <td style={{ ...tdStyle, textAlign: "left", fontWeight: 500 }}>
                {s.StaffName}
              </td>

              <td style={{ ...tdStyle, textAlign: "left" }}>{s.Email}</td>

              <td style={{ ...tdStyle, textAlign: "left" }}>{s.Phone}</td>

              <td style={tdStyle}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href={`/staff/${s.StaffID}`}>
                    <button
                      style={{ ...actionBtn, backgroundColor: "#0f766e" }}
                    >
                      Details
                    </button>
                  </Link>

                  <Link href={`/staff/edit/${s.StaffID}`}>
                    <button
                      style={{ ...actionBtn, backgroundColor: "#16a34a" }}
                    >
                      Edit
                    </button>
                  </Link>

             
                  <DeleteStaffBtn id={s.StaffID}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Styles ---------- */

const thStyle = {
  padding: "12px",
  textAlign: "left" as const,
  fontWeight: 600,
  color: "#374151",
  borderBottom: "2px solid #d1d5db",
};

const tdStyle = {
  padding: "12px",
  textAlign: "center" as const,
  color: "#374151",
};

const actionBtn = {
  color: "white",
  padding: "6px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
};
