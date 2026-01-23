"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export default async function DeleteStaffAction(formData: FormData) {
    console.log("FORM DATA:", Object.fromEntries(formData.entries()));

  const id = Number(formData.get("StaffID"));
  console.log("DELETE ID:", id);

  if (!id || Number.isNaN(id)) {
    throw new Error("Invalid Staff ID");
  }

  await prisma.staff.delete({
    where: {
      StaffID: id,
    },
  });

  redirect("/staff?msg=deleted");
}
