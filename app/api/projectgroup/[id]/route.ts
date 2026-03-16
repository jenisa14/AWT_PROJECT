import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await prisma.projectGroup.findUnique({
      where: { ProjectGroupID: parseInt(id) },
    });
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project group" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await prisma.projectGroup.update({
      where: { ProjectGroupID: parseInt(id) },
      data: {
        ProjectGroupName: body.ProjectGroupName,
        ProjectTypeID: parseInt(body.ProjectTypeID),
        ProjectTitle: body.ProjectTitle,
        ProjectArea: body.ProjectArea,
        ConvenerStaffID: parseInt(body.ConvenerStaffID),
        ExpertStaffID: body.ExpertStaffID ? parseInt(body.ExpertStaffID) : null,
        Modified: new Date(),
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project group" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.projectGroup.delete({
      where: { ProjectGroupID: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project group" }, { status: 500 });
  }
}
