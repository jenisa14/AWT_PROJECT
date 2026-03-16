"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function RegisterAction(formData: FormData) {
  const role = formData.get("Role")?.toString()?.toLowerCase();

  if (role === "student") {
    const studentName = formData.get("Name")?.toString()?.trim();
    const email = formData.get("Email")?.toString()?.trim();
    const phone = formData.get("Phone")?.toString()?.trim();
    if (!studentName || !email || !phone) {
      redirect("/auth/register?error=" + encodeURIComponent("StudentName, Email and Phone are required."));
    }
    await prisma.student.create({
      data: {
        StudentName: studentName,
        Email: email,
        Phone: phone ?? null,
      },
    });
    redirect("/auth/login?registered=1");
  }

  if (role === "staff") {
    const staffName = formData.get("Name")?.toString()?.trim();
    const email = formData.get("Email")?.toString()?.trim();
    const phone = formData.get("Phone")?.toString()?.trim();
    const password = formData.get("Password")?.toString()?.trim();
    if (!staffName || !email || !phone) {
      redirect("/auth/register?error=" + encodeURIComponent("StaffName, Email and Phone are required."));
    }
    if (!password || password.length === 0) {
      redirect("/auth/register?error=" + encodeURIComponent("Password is required for Staff and cannot be empty."));
    }
    await prisma.staff.create({
      data: {
        StaffName: staffName,
        Email: email,
        Phone: phone ?? null,
        Password: password,
      },
    });
    redirect("/auth/login?registered=1");
  }

  redirect("/auth/register?error=" + encodeURIComponent("Please select Role (Staff or Student)."));

}