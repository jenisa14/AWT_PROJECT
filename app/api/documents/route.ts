import { NextRequest, NextResponse } from "next/server";
import { writeFile, readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { Created: "desc" }
    });
    
    const fileList = documents.map(doc => ({
      name: doc.FileName,
      url: `/api/documents/download/${doc.FileName}`,
      size: doc.FileSize ? (doc.FileSize / 1024).toFixed(2) + " KB" : "N/A",
      date: doc.Created
    }));

    return NextResponse.json(fileList);
  } catch (error) {
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const storageDir = path.join(process.cwd(), "storage");
    await mkdir(storageDir, { recursive: true });
    
   
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(storageDir, filename);
    
    await writeFile(filePath, buffer);

    await prisma.document.create({
      data: {
        FileName: filename,
        FilePath: filePath,
        FileSize: file.size,
        FileType: file.type,
      }
    });

    return NextResponse.json({ success: true, filename });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

