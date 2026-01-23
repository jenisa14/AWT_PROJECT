"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export default async function DeleteProjectMeetingAction(formData: FormData) {
  const id = Number(formData.get("ProjectMeetingID"));

  await prisma.projectmeeting.delete({
    where: { ProjectMeetingID: id },
  });

 
  redirect("/projectmeeting?msg=deleted");

}
