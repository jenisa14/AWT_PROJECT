import { UpdateProjectGroupMemberAction } from "@/app/actions/projectgroupmember/UpdateProjectGroupMemberAction";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function EditProjectGroupMember({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const member = await prisma.projectgroupmember.findUnique({
    where: { ProjectGroupMemberID: Number(id) },
  });

  const groups = await prisma.projectgroup.findMany();
  const students = await prisma.student.findMany();

  if (!member) return <h2>Not found</h2>;

  return (
    <form action={UpdateProjectGroupMemberAction}>
      <input type="hidden" name="ProjectGroupMemberID" value={member.ProjectGroupMemberID} />

      <select name="ProjectGroupID" defaultValue={member.ProjectGroupID}>
        {groups.map(g => (
          <option key={g.ProjectGroupID} value={g.ProjectGroupID}>
            {g.ProjectGroupName}
          </option>
        ))}
      </select>

      <br /><br />

      <select name="StudentID" defaultValue={member.StudentID}>
        {students.map(s => (
          <option key={s.StudentID} value={s.StudentID}>
            {s.StudentName}
          </option>
        ))}
      </select>

      <br /><br />

      <label>
        <input
          type="checkbox"
          name="IsGroupLeader"
          defaultChecked={member.IsGroupLeader ?? false}
        />
        Is Group Leader
      </label>

      <br /><br />

      <button type="submit">Update</button>
      <Link href="/projectgroupmember">
        <button type="button">Cancel</button>
      </Link>
    </form>
  );
}
