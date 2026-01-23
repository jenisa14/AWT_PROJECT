"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function AddProjectMeetingAttendanceAction(formData: FormData) {
  await prisma.projectmeetingattendance.create({
    data: {
      ProjectMeetingID: Number(formData.get("ProjectMeetingID")),
      StudentID: Number(formData.get("StudentID")),
      IsPresent: formData.get("IsPresent") === "on",
    },
  });

  redirect("/projectmeetingattendance?msg=added");
}
