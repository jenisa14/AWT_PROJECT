"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export default async function DeleteStudentAction(formData: FormData) {
    console.log("FORM DATA:", Object.fromEntries(formData.entries()));

  const id = Number(formData.get("StudentID"));
  console.log("DELETE ID:", id);

  if (!id || Number.isNaN(id)) {
    throw new Error("Invalid Student ID");
  }

  await prisma.student.delete({
    where: {
      StudentID: id,
    },
  });

  redirect("/student?msg=deleted");
}
