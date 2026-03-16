import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.projectGroup.findMany({
      orderBy: { ProjectGroupID: "desc" },
      include: {
        ProjectType: true
      }
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project groups" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await prisma.projectGroup.create({
      data: {
        ProjectGroupName: body.ProjectGroupName,
        ProjectTypeID: parseInt(body.ProjectTypeID),
        ProjectTitle: body.ProjectTitle,
        ProjectArea: body.ProjectArea,
        ConvenerStaffID: parseInt(body.ConvenerStaffID),
        ExpertStaffID: body.ExpertStaffID ? parseInt(body.ExpertStaffID) : null,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project group" }, { status: 500 });
  }
}
