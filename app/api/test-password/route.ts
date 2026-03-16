import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const student = await prisma.student.findFirst();
    const staff = await prisma.staff.findFirst();
    
    let sMatch = false;
    if (student && student.Password) {
      sMatch = await bcrypt.compare('password123', student.Password);
    }
    
    let stMatch = false;
    if (staff && staff.Password) {
      stMatch = await bcrypt.compare('password123', staff.Password);
    }

    return NextResponse.json({ 
      student: { email: student?.Email, hash: student?.Password?.slice(0, 10), match: sMatch },
      staff: { email: staff?.Email, hash: staff?.Password?.slice(0, 10), match: stMatch }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
