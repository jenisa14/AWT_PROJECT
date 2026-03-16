"use server";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";


export async function LoginAction(formData: FormData) {
  const email = formData.get("Email")?.toString()?.trim();
  const password = formData.get("Password")?.toString();
  const roleRaw = formData.get("Role")?.toString()?.toLowerCase();

  if (!email) {
    redirect("/auth/login?error=" + encodeURIComponent("Email is required."));
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (roleRaw === "admin") {
    if (email === adminEmail && password === adminPassword) {
      await createSession({ role: "ADMIN", email });
      redirect("/admin/dashboard");
    }
    redirect("/auth/login?error=" + encodeURIComponent("Invalid admin credentials."));
  }

  if (roleRaw === "staff") {
    if (!password) redirect("/auth/login?error=" + encodeURIComponent("Password is required."));
    const staff = await prisma.staff.findFirst({
      where: { Email: email },
    });
    if (!staff || staff.Password !== password) {
      redirect("/auth/login?error=" + encodeURIComponent("Invalid staff email or password."));
    }
    await createSession({
      role: "STAFF",
      id: staff.StaffID,
      email: staff.Email ?? undefined,
    });
    redirect("/staff/dashboard");
  }

  if (roleRaw === "student") {
    const student = await prisma.student.findFirst({
      where: { Email: email },
    });
    if (!student) {
      redirect("/auth/login?error=" + encodeURIComponent("No student found with this email."));
    }
    await createSession({
      role: "STUDENT",
      id: student.StudentID,
      email: student.Email ?? undefined,
    });
    redirect("/student/dashboard");
  }

  redirect("/auth/login?error=" + encodeURIComponent("Please select a role and try again."));
}
