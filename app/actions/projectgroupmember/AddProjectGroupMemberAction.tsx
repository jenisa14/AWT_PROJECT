"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";


export async function AddProjectGroupMemberAction(formData: FormData) {
  const ProjectGroupID = Number(formData.get("ProjectGroupID"));
  const StudentID = Number(formData.get("StudentID"));
  const IsGroupLeader = formData.get("IsGroupLeader") === "on";

  if (!ProjectGroupID || !StudentID) {
    throw new Error("Invalid data");
  }

  await prisma.projectgroupmember.create({
    data: {
      ProjectGroupID,
      StudentID,
      IsGroupLeader,
    },
  });


  redirect("/projectgroupmember?msg=added");
}
