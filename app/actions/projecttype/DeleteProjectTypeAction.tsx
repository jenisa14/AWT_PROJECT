"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export default async function DeleteProjectTypeAction(formData: FormData) {
  const id = Number(formData.get("ProjectTypeID"));

  await prisma.projecttype.delete({
    where: { ProjectTypeID: id },
  });

  redirect("/projecttype?msg=deleted");
}
