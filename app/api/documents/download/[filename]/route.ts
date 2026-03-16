import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const filePath = path.join(process.cwd(), "storage", filename);
    const fileBuffer = await readFile(filePath);
    
    
    let contentType = "application/octet-stream";
    if (filename.endsWith(".pdf")) contentType = "application/pdf";
    else if (filename.endsWith(".png")) contentType = "image/png";
    else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) contentType = "image/jpeg";
    else if (filename.endsWith(".txt")) contentType = "text/plain";
    else if (filename.endsWith(".doc") || filename.endsWith(".docx")) contentType = "application/msword";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename.split('_').slice(1).join('_') || filename}"`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
