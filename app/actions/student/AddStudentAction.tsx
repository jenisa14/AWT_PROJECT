"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function AddStudentAction(formData:FormData){

    const StudentName = formData.get("StudentName")?.toString();
    
    const Email = formData.get("Email")?.toString();

    const Phone = formData.get("Phone")?.toString();

      if (!StudentName || !Email || !Phone) {
    throw new Error("all fields are required");
  }

    await prisma.student.create({

        data:{

            StudentName,
            Email,
            Phone


        },

    });

    revalidatePath("/student");
    redirect("/student");
    
}