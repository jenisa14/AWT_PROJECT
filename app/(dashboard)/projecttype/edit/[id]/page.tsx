import { prisma } from "@/app/lib/prisma";
import { UpdateProjectTypeAction } from "@/app/actions/projecttype/UpdateProjectTypeAction";
import Link from "next/link";

export default async function EditProjectType({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const type = await prisma.projecttype.findUnique({
    where: { ProjectTypeID: Number(id) },
  });

  if (!type) return <h2>Not Found</h2>;

  return (
    <form action={UpdateProjectTypeAction}>
      <input type="hidden" name="ProjectTypeID" value={type.ProjectTypeID} />

      <input
        type="text"
        name="ProjectTypeName"
        defaultValue={type.ProjectTypeName}
        required
      />

      <input
        type="text"
        name="Description"
        defaultValue={type.Description ?? ""}
      />

      <button type="submit">Update</button>

      <Link href="/projecttype">
        <button type="button">Cancel</button>
      </Link>
    </form>
  );
}
