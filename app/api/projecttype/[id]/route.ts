import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  _request: Request,
  _context: { params: Promise<{ id: string }> }
) {
  const data = await prisma.projecttype.findMany({
    orderBy: { ProjectTypeID: "desc" },
  });
  return NextResponse.json(data);
}