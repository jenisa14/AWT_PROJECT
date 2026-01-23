import { AddProjectGroupMemberAction } from "@/app/actions/projectgroupmember/AddProjectGroupMemberAction";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function AddProjectGroupMember() {
  const groups = await prisma.projectgroup.findMany();
  const students = await prisma.student.findMany();

  return (
    <form action={AddProjectGroupMemberAction}>
      <h2>Add Group Member</h2>

      <select name="ProjectGroupID" required>
        <option value="">Select Project Group</option>
        {groups.map(g => (
          <option key={g.ProjectGroupID} value={g.ProjectGroupID}>
            {g.ProjectGroupName}
          </option>
        ))}
      </select>

      <br /><br />

      <select name="StudentID" required>
        <option value="">Select Student</option>
        {students.map(s => (
          <option key={s.StudentID} value={s.StudentID}>
            {s.StudentName}
          </option>
        ))}
      </select>

      <br /><br />

      <label>
        <input type="checkbox" name="IsGroupLeader" />
        Is Group Leader
      </label>

      <br /><br />

      <button type="submit">Save</button>
      <Link href="/projectgroupmember">
        <button type="button">Cancel</button>
      </Link>
    </form>
  );
}
