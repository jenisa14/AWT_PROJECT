import "dotenv/config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding passwords for users...");
  
  const defaultPassword = await bcrypt.hash("password123", 10);
  
  // Update students
  const students = await prisma.student.findMany();
  let studentCount = 0;
  for (const student of students) {
    if (!student.Password || !student.Password.startsWith("$2a$")) {
      const plainPassword = student.Password || "password123";
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      await prisma.student.update({
        where: { StudentID: student.StudentID },
        data: { Password: hashedPassword }
      });
      studentCount++;
    }
  }
  
  // Update staff
  const staffMembers = await prisma.staff.findMany();
  let staffCount = 0;
  for (const staff of staffMembers) {
    if (!staff.Password || !staff.Password.startsWith("$2a$")) {
      const plainPassword = staff.Password || "password123";
      const hashedPassword = await bcrypt.hash(plainPassword, 10);
      
      const roleToSet = staff.Role || "STAFF";
      
      await prisma.staff.update({
        where: { StaffID: staff.StaffID },
        data: { 
          Password: hashedPassword,
          Role: roleToSet
        }
      });
      staffCount++;
    }
  }
  
  console.log(`Successfully updated ${studentCount} students and ${staffCount} staff members by hashing their existing passwords or setting default.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
