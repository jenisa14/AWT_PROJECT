import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await prisma.projectMeeting.findUnique({
      where: { ProjectMeetingID: parseInt(id) },
    });
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch meeting" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await prisma.projectMeeting.update({
      where: { ProjectMeetingID: parseInt(id) },
      data: {
        ProjectGroupID: parseInt(body.ProjectGroupID),
        GuideStaffID: parseInt(body.GuideStaffID),
        MeetingDateTime: new Date(body.MeetingDateTime),
        MeetingPurpose: body.MeetingPurpose,
        MeetingNotes: body.MeetingNotes,
        Modified: new Date(),
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update meeting" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.projectMeeting.delete({
      where: { ProjectMeetingID: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete meeting" }, { status: 500 });
  }
}
