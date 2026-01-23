"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function DeleteProjectMeetingAttendanceAction(formData: FormData) {
  const id = Number(formData.get("ProjectMeetingAttendanceID"));

  await prisma.projectmeetingattendance.delete({
    where: { ProjectMeetingAttendanceID: id },
  });

  redirect("/projectmeetingattendance?msg=deleted");
}
