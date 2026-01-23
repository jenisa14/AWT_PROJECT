import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function LoginAction(formData: FormData){

    const email = formData.get("Email")?.toString();
    const password = formData.get("Password")?.toString();
    const role = formData.get("Role")?.toString();

// -------------------------admin
    if (role === "admin") {
    if (email === "admin@gmail.com" && password === "admin123") {
      redirect("/admin/dashboard");
    }
    throw new Error("Invalid admin credentials");
  }

// ----------------------staff

  if (role === "staff") {
    const staff = await prisma.staff.findFirst({
      where: { Email: email},
    });

    if (!staff || staff.Password !== password) {
      throw new Error("Invalid staff login");
    }

    redirect("/staff/dashboard");
  }

   if (role === "student") {
    const student = await prisma.student.findFirst({
      where: { Email: email },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    redirect("/student/dashboard");
  }

}