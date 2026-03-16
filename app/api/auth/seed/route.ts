import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const defaultPassword = await bcrypt.hash("password123", 10);
   
    const students = await prisma.student.findMany();
    let studentCount = 0;
    for (const student of students) {
      if (!student.Password || student.Password === "") {
        await prisma.student.update({
          where: { StudentID: student.StudentID },
          data: { Password: defaultPassword }
        });
        studentCount++;
      }
    }
    
    const staffMembers = await prisma.staff.findMany();
    let staffCount = 0;
    for (const staff of staffMembers) {
      if (!staff.Password || staff.Password === "") {
       
        const roleToSet = staff.Role || "STAFF";
        
        await prisma.staff.update({
          where: { StaffID: staff.StaffID },
          data: { 
            Password: defaultPassword,
            Role: roleToSet
          }
        });
        staffCount++;
      }
    }
    
   
    const adminEmail = "admin@gmail.com";
    const adminPassword = await bcrypt.hash("admin@123", 10);
    
    await prisma.staff.upsert({
      where: { Email: adminEmail },
      update: { Password: adminPassword, Role: "ADMIN" },
      create: {
        StaffName: "Administrator",
        Email: adminEmail,
        Password: adminPassword,
        Role: "ADMIN"
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded admin and set 'password123' for ${studentCount} students and ${staffCount} staff members.` 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
