
import UpdateStaffAction from "@/app/actions/staff/UpdateStaffAction";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function EditStaff({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const StaffID = Number(id);

  if (Number.isNaN(StaffID)) {
    return <h2 className="text-white text-center mt-10">Invalid Staff</h2>;
  }

  const staff = await prisma.staff.findUnique({
    where: { StaffID },
  });

  if (!staff) {
    return <h2 className="text-white text-center mt-10">Staff not found</h2>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6 shadow-2xl">
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Edit Staff
        </h2>

        <form action={UpdateStaffAction} className="space-y-4">
          <input type="hidden" name="StaffID" value={staff.StaffID} />

          <input
            type="text"
            name="StaffName"
            defaultValue={staff.StaffName}
            className="w-full rounded-md border bg-zinc-800 px-4 py-2 text-white"
            required
          />

          <input
            type="text"
            name="Email"
            defaultValue={staff.Email ?? ""}
            className="w-full rounded-md border bg-zinc-800 px-4 py-2 text-white"
            required
          />

          <input
            type="text"
            name="Phone"
            defaultValue={staff.Phone ?? ""}
            className="w-full rounded-md border bg-zinc-800 px-4 py-2 text-white"
            required
          />

          <div className="flex justify-between pt-4">
            <Link href="/staff" className="rounded-md bg-zinc-700 px-4 py-2 text-white">
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
