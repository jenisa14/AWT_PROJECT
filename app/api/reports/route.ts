import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const format = searchParams.get("format") || "json";

  try {
    let data: any[] = [];
    let title = "Report";

    if (type === "projects-guide") {
      title = "List of Projects with Guide";
      data = await prisma.projectGroup.findMany({
        select: {
          ProjectGroupName: true,
          ProjectTitle: true,
          ProjectArea: true,
          Created: true,
        },
      });
    
    } else if (type === "project-type") {
      title = "Project Type Wise List";
      data = await prisma.projectType.findMany({
        select: {
          ProjectTypeName: true,
          Description: true,
        },
      });
    } else if (type === "group-members") {
      title = "Group Members Report";
      data = await prisma.projectGroupMember.findMany({
        select: {
          ProjectGroupID: true,
          StudentID: true,
          IsGroupLeader: true,
        },
      });
    } else if (type === "attendance") {
      title = "Meeting Attendance Report";
      data = await prisma.projectMeetingAttendance.findMany({
        select: {
          ProjectMeetingID: true,
          StudentID: true,
          IsPresent: true,
        },
      });
    } else {
      return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
    }

    if (format === "csv") {
      if (data.length === 0) return new NextResponse("No data", { status: 200, headers: { "Content-Type": "text/csv" } });
      
      const headers = Object.keys(data[0]);
      const csvRows = [
        headers.join(","),
        ...data.map(row => headers.map(header => `"${(row[header] ?? "").toString().replace(/"/g, '""')}"`).join(","))
      ];
      const csvContent = csvRows.join("\n");
      
      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${type}-report.csv"`,
        },
      });
    }

    return NextResponse.json({ title, data });
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
