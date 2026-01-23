"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export default async function UpdateProjectMeetingAction(formData: FormData) {
  const ProjectMeetingID = Number(formData.get("ProjectMeetingID"));

  await prisma.projectmeeting.update({
    where: { ProjectMeetingID },
    data: {
      ProjectGroupID: Number(formData.get("ProjectGroupID")),
      GuideStaffID: Number(formData.get("GuideStaffID")),
      MeetingDateTime: new Date(
        formData.get("MeetingDateTime")!.toString()
      ),
      MeetingPurpose: formData.get("MeetingPurpose")?.toString(),
      MeetingNotes: formData.get("MeetingNotes")?.toString(),
    },
  });

  redirect("/projectmeeting?msg=updated");
}
