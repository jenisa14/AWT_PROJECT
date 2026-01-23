"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function UpdateProjectGroupMemberAction(formData: FormData) {
  const id = Number(formData.get("ProjectGroupMemberID"));
  const ProjectGroupID = Number(formData.get("ProjectGroupID"));
  const StudentID = Number(formData.get("StudentID"));
  const IsGroupLeader = formData.get("IsGroupLeader") === "on";

  await prisma.projectgroupmember.update({
    where: { ProjectGroupMemberID: id },
    data: {
      ProjectGroupID,
      StudentID,
      IsGroupLeader,
    },
  });

  revalidatePath("/projectgroupmember");
  redirect("/projectgroupmember?msg=updated");
}
