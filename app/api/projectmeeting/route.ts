import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.projectMeeting.findMany({
      orderBy: { ProjectMeetingID: "desc" },
      include: {
        ProjectGroup: {
          select: {
            ProjectGroupName: true
          }
        }
      }
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch meetings" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await prisma.projectMeeting.create({
      data: {
        ProjectGroupID: parseInt(body.ProjectGroupID),
        GuideStaffID: parseInt(body.GuideStaffID),
        MeetingDateTime: new Date(body.MeetingDateTime),
        MeetingPurpose: body.MeetingPurpose,
        MeetingNotes: body.MeetingNotes,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create meeting" }, { status: 500 });
  }
}
