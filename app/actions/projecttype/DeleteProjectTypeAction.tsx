"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DeleteProjectTypeAction(formData: FormData) {
  const id = Number(formData.get("ProjectTypeID"));

  await prisma.projectType.delete({
    where: { ProjectTypeID: id },
  });

  redirect("/projecttype?msg=deleted");
}
