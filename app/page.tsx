

import { prisma } from "@/app/lib/prisma";
import Footer from "./ui/layout/footer";
import Header from "./ui/layout/header";
import Sidebar from "./ui/layout/sidebar";

export default async function HomePage() {
  // count
  const totalProjects = await prisma.projectgroup.count();
  const totalStudents = await prisma.student.count();
  const totalStaff = await prisma.staff.count();
  const totalMeetings = await prisma.projectmeeting.count();


  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f9fafb",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Dashboard</h2>
          <p style={{ color: "#374151", marginBottom: "20px" }}>
            Student Project Management System Overview
          </p>

       
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            <DashboardCard title="Total Projects" value={totalProjects} />
            {/* <DashboardCard title="Running Projects" value={runningProjects} />
            <DashboardCard title="Completed Projects" value={completedProjects} /> */}
            <DashboardCard title="Total Students" value={totalStudents} />
            <DashboardCard title="Total Faculty" value={totalStaff} />
            <DashboardCard title="Total Meetings" value={totalMeetings} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <h3 style={{ fontSize: "14px", color: "#6b7280" }}>{title}</h3>
      <p style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>
        {value}
      </p>
    </div>
  );
}
