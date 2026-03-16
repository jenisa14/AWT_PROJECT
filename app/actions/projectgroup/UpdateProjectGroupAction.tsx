"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function UpdateProjectGroupAction(formData: FormData) {
  const ProjectGroupID = Number(formData.get("ProjectGroupID"));
  const ProjectGroupName = formData.get("ProjectGroupName")?.toString();
  const ProjectTitle = formData.get("ProjectTitle")?.toString();
  const ProjectArea = formData.get("ProjectArea")?.toString();

  if (!ProjectGroupID || !ProjectGroupName || !ProjectTitle) {
    throw new Error("Required");
  }

  await prisma.projectGroup.update({
    where: { ProjectGroupID },
    data: { ProjectGroupName, ProjectTitle, ProjectArea },
  });
redirect("/projectgroup?msg=updated");

}
