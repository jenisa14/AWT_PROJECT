"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";


export async function DeleteProjectGroupMemberAction(formData: FormData) {
  const id = Number(formData.get("ProjectGroupMemberID"));

  await prisma.projectGroupMember.delete({
    where: { ProjectGroupMemberID: id },
  });


  redirect("/projectgroupmember?msg=deleted");
}
