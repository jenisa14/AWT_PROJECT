"use server"
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdateStaffAction(formData:FormData){

    const StaffID  = Number(formData.get("StaffID"));
    const StaffName = formData.get("StaffName")?.toString();
    const Email = formData.get("Email")?.toString();
    const Phone = formData.get("Phone")?.toString();

    if(!StaffID || !StaffName || !Email || !Phone ){

        throw new Error("All fields are required")
    }

    await prisma.staff.update({

        where : {
            StaffID
        },
        data :{
            StaffName,
            Email,
            Phone
        }
    });

    revalidatePath("/staff");
    redirect("/staff?msg=updated");
}