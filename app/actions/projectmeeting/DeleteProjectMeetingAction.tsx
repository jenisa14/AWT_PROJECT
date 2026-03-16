"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DeleteProjectMeetingAction(formData: FormData) {
  const id = Number(formData.get("ProjectMeetingID"));

  await prisma.projectMeeting.delete({
    where: { ProjectMeetingID: id },
  });

 
  redirect("/projectmeeting?msg=deleted");

}
