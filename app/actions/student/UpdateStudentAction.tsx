"use server"
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdateStudentAction(formData:FormData){

    const StudentID  = Number(formData.get("StudentID"));
    const StudentName = formData.get("StudentName")?.toString();
    const Email = formData.get("Email")?.toString();
    const Phone = formData.get("Phone")?.toString();

    if(!StudentID || !StudentName || !Email || !Phone ){

        throw new Error("All fields are required")
    }

    await prisma.student.update({

        where : {
            StudentID
        },
        data :{
            StudentName,
            Email,
            Phone
        }
    });

    revalidatePath("/student");
    redirect("/student");
}