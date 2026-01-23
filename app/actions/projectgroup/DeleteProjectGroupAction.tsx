"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export default async function DeleteProjectGroupAction(formData: FormData) {
  const id = Number(formData.get("ProjectGroupID"));

  await prisma.projectgroup.delete({
    where: { ProjectGroupID: id },
  });

  redirect("/projectgroup?msg=deleted");

}
