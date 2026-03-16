import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.projectType.findMany({
    orderBy: { ProjectTypeID: "desc" },
  });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await prisma.projectType.create({
      data: {
        ProjectTypeName: body.ProjectTypeName,
        Description: body.Description,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project type" }, { status: 500 });
  }
}