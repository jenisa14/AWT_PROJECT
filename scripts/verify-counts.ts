import "dotenv/config";
import { prisma } from "../lib/prisma";

async function checkCounts() {
  try {
    const typeCount = await prisma.projectType.count();
    const groupCount = await prisma.projectGroup.count();
    const staffCount = await prisma.staff.count();
    const studentCount = await prisma.student.count();

    console.log("COUNTS CHECK:");
    console.log("Project Types:", typeCount);
    console.log("Project Groups:", groupCount);
    console.log("Staff:", staffCount);
    console.log("Students:", studentCount);
  } catch (error) {
    console.error("ERROR FETCHING COUNTS:", error);
  } finally {
    process.exit();
  }
}

checkCounts();
