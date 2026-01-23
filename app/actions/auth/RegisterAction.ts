"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";


export async function RegisterAction(formData : FormData){

    const role = formData.get("Role")?.toString();

    if(role == "student"){

        await prisma.student.create({
            data:{

                StudentName : formData.get("Name")!.toString(),
                Email : formData.get("Email")!.toString(),
                Phone : formData.get("Phone")!.toString(),
            },
        });
    }


    
  if (role === "staff") {
    await prisma.staff.create({
      data: {

        // ! -> typescript , string not be null
        StaffName: formData.get("Name")!.toString(),
        Email: formData.get("Email")!.toString(),
        Phone: formData.get("Phone")!.toString(),
        Password: formData.get("Password")!.toString(),
      },
    });
  }

  redirect("/login")

}