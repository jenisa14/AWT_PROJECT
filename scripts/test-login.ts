import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const student = await prisma.student.findFirst();
  console.log("Student:", student?.Email, student?.Password);
  if (student && student.Password) {
    const match = await bcrypt.compare("password123", student.Password);
    console.log("Matches 'password123':", match);
  }

  const staff = await prisma.staff.findFirst();
  console.log("Staff:", staff?.Email, staff?.Password);
  if (staff && staff.Password) {
    const match = await bcrypt.compare("password123", staff.Password);
    console.log("Matches 'password123':", match);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
