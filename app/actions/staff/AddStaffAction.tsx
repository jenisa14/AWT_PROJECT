"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function AddStaffAction(formData:FormData){

    const StaffName = formData.get("StaffName")?.toString();
    
    const Email = formData.get("Email")?.toString();

    const Phone = formData.get("Phone")?.toString();

    const Password = formData.get("Password")?.toString();

      if (!StaffName || !Email || !Phone || !Password) {
    throw new Error("all fields are required");
  }

    await prisma.staff.create({

        data:{

            StaffName,
            Email,
            Phone,
            Password,

        },

    });

    revalidatePath("/staff");
    redirect("/staff?msg=added");
    
}