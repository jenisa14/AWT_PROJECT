import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = "test2@gmail.com";
  const password = "password123";
  
  // 1. Check if user exists, delete if so
  const existing = await prisma.student.findUnique({ where: { Email: email } });
  if (existing) {
    await prisma.student.delete({ where: { Email: email } });
  }

  // 2. Hash and create
  const hash = await bcrypt.hash(password, 10);
  const student = await prisma.student.create({
    data: {
      StudentName: "Test Student 2",
      Email: email,
      Password: hash,
    }
  });

  console.log("Created student:", student.Email, "Hash:", student.Password);

  // 3. Verify
  const match = await bcrypt.compare(password, student.Password);
  console.log("Password match:", match);
}

main().catch(console.error).finally(() => prisma.$disconnect());
