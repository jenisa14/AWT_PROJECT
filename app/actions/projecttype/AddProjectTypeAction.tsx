"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function AddProjectTypeAction(formData: FormData) {
  const ProjectTypeName = formData.get("ProjectTypeName")?.toString();
  const Description = formData.get("Description")?.toString();

  if (!ProjectTypeName || !Description) {
    throw new Error("All fields required");
  }

  await prisma.projecttype.create({
    data: {
      ProjectTypeName,
      Description,
    },
  });

  redirect("/projecttype?msg=added");
}
