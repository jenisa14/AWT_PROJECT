import { prisma } from "@/app/lib/prisma";
import { UpdateProjectGroupAction } from "@/app/actions/projectgroup/UpdateProjectGroupAction";

export default async function EditProjectGroup({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  const group = await prisma.projectgroup.findUnique({
    where: { ProjectGroupID: Number(id) },
  });

  if (!group) return <h2>Not found</h2>;

  return (
    <form action={UpdateProjectGroupAction}>
      <input type="hidden" name="ProjectGroupID" value={group.ProjectGroupID} />

      <input name="ProjectGroupName" defaultValue={group.ProjectGroupName} />
      <input name="ProjectTitle" defaultValue={group.ProjectTitle} />
      <input name="ProjectArea" defaultValue={group.ProjectArea ?? ""} />

      <button type="submit">Update</button>
    </form>
  );
}
