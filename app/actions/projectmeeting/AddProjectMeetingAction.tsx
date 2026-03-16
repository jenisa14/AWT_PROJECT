"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function AddProjectMeetingAction(formData: FormData) {
  const ProjectGroupID = Number(formData.get("ProjectGroupID"));
  const GuideStaffID = Number(formData.get("GuideStaffID"));
  const MeetingDateTime = new Date(
    formData.get("MeetingDateTime")!.toString()
  );
  const MeetingPurpose = formData.get("MeetingPurpose")?.toString();
  const MeetingNotes = formData.get("MeetingNotes")?.toString();

  if (
    !ProjectGroupID ||
    !GuideStaffID ||
    !MeetingPurpose ||
    Number.isNaN(ProjectGroupID)
  ) {
    throw new Error("All fields are required");
  }

  await prisma.projectMeeting.create({
    data: {
      ProjectGroupID,
      GuideStaffID,
      MeetingDateTime,
      MeetingPurpose,
      MeetingNotes,
    },
  });

  revalidatePath("/projectmeeting");
  redirect("/projectmeeting?msg=added");
}
