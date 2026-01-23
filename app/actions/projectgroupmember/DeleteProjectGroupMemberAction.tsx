"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";


export async function DeleteProjectGroupMemberAction(formData: FormData) {
  const id = Number(formData.get("ProjectGroupMemberID"));

  await prisma.projectgroupmember.delete({
    where: { ProjectGroupMemberID: id },
  });


  redirect("/projectgroupmember?msg=deleted");
}
