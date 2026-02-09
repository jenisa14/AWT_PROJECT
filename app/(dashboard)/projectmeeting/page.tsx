import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import DeleteProjectMeetingBtn from "@/app/ui/projectmeeting/DeleteProjectMeetingBtn";
import SuccessToast from "@/app/components/SuccessToast";

export default async function ProjectMeetingList({
  searchParams,
}: {
  searchParams?: { msg?: string };
}) {
  const msg = searchParams?.msg;

  const meetings = await prisma.projectmeeting.findMany();

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Segoe UI, Arial, sans-serif",
        backgroundColor: "#f8fafc",
      }}
    >
      <SuccessToast msg={msg} entityName="Project Meeting" />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ margin: 0, color: "#111827" }}>Project Meetings</h2>
        <Link href="/projectmeeting/add">
          <button style={addBtnStyle}>+ Add Meeting</button>
        </Link>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: "#e5e7eb" }}>
            <th style={thStyle}>Group ID</th>
            <th style={thStyle}>Guide Staff ID</th>
            <th style={thStyle}>Date</th>
            <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((m) => (
            <tr key={m.ProjectMeetingID} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={tdStyle}>{m.ProjectGroupID}</td>
              <td style={tdStyle}>{m.GuideStaffID}</td>
              <td style={tdStyle}>{m.MeetingDateTime.toString()}</td>
              <td style={tdStyle}>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href={`/projectmeeting/${m.ProjectMeetingID}`}>
                    <button style={{ ...actionBtnStyle, backgroundColor: "#0f766e" }}>Details</button>
                  </Link>
                  <Link href={`/projectmeeting/edit/${m.ProjectMeetingID}`}>
                    <button style={{ ...actionBtnStyle, backgroundColor: "#16a34a" }}>Edit</button>
                  </Link>
                  <DeleteProjectMeetingBtn id={m.ProjectMeetingID} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
  backgroundColor: "white",
  borderRadius: "6px",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
};
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
const actionBtnStyle = {
  color: "white",
  padding: "6px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
};
const addBtnStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 500,
};
