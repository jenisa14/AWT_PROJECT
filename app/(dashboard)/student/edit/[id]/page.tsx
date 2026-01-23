import UpdateStudentAction from "@/app/actions/student/UpdateStudentAction";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function EditStudent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const StudentID = Number(id);

  if (Number.isNaN(StudentID)) {
    return <h2 className="text-white text-center mt-10">Invalid Student</h2>;
  }

  const student = await prisma.student.findUnique({
    where: { StudentID },
  });

  if (!student) {
    return <h2 className="text-white text-center mt-10">Student not found</h2>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6 shadow-2xl">
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Edit Student
        </h2>

        <form action={UpdateStudentAction} className="space-y-4">
          <input type="hidden" name="StudentID" value={student.StudentID} />

          <input
            type="text"
            name="StudentName"
            defaultValue={student.StudentName}
            className="w-full rounded-md border bg-zinc-800 px-4 py-2 text-white"
            required
          />

          <input
            type="text"
            name="Email"
            defaultValue={student.Email ?? ""}
            className="w-full rounded-md border bg-zinc-800 px-4 py-2 text-white"
            required
          />

          <input
            type="text"
            name="Phone"
            defaultValue={student.Phone ?? ""}
            className="w-full rounded-md border bg-zinc-800 px-4 py-2 text-white"
            required
          />

          <div className="flex justify-between pt-4">
            <Link href="/student" className="rounded-md bg-zinc-700 px-4 py-2 text-white">
              Back
            </Link>

            <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
