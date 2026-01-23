"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function UpdateProjectTypeAction(formData: FormData) {
  const ProjectTypeID = Number(formData.get("ProjectTypeID"));
  const ProjectTypeName = formData.get("ProjectTypeName")?.toString();
  const Description = formData.get("Description")?.toString();

  await prisma.projecttype.update({
    where: { ProjectTypeID },
    data: { ProjectTypeName, Description },
  });

 redirect("/projecttype?msg=updated");

}
