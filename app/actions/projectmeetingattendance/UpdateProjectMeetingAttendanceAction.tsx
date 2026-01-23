"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function UpdateProjectMeetingAttendanceAction(formData: FormData) {
  const id = Number(formData.get("ProjectMeetingAttendanceID"));

  await prisma.projectmeetingattendance.update({
    where: { ProjectMeetingAttendanceID: id },
    data: {
      ProjectMeetingID: Number(formData.get("ProjectMeetingID")),
      StudentID: Number(formData.get("StudentID")),
      IsPresent: formData.get("IsPresent") === "on",
      Modified: new Date(),
    },
  });

  redirect("/projectmeetingattendance?msg=updated");
}
