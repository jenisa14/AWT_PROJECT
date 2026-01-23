"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";


export async function AddProjectGroupAction(formData: FormData) {
  const ProjectGroupName = formData.get("ProjectGroupName")?.toString();
  const ProjectTitle = formData.get("ProjectTitle")?.toString();
  const ProjectTypeID = Number(formData.get("ProjectTypeID"));
  const ConvenerStaffID = Number(formData.get("ConvenerStaffID"));
  const ExpertStaffID = Number(formData.get("ExpertStaffID")) || null;
  const ProjectArea = formData.get("ProjectArea")?.toString();

  if (!ProjectGroupName || !ProjectTitle || !ProjectTypeID || !ConvenerStaffID) {
    throw new Error("Required fields missing");
  }

  await prisma.projectgroup.create({
    data: {
      ProjectGroupName,
      ProjectTitle,
      ProjectTypeID,
      ConvenerStaffID,
      ExpertStaffID,
      ProjectArea,
    },
  });
redirect("/projectgroup?msg=added");

}
