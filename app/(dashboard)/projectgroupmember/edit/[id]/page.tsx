import { UpdateProjectGroupMemberAction } from "@/app/actions/projectgroupmember/UpdateProjectGroupMemberAction";
import { prisma } from "@/app/lib/prisma";
import { theme, styles } from "@/app/lib/theme";
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

  if (!member) return <h2 style={{ color: theme.colors.text }}>Not found</h2>;

  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Edit Group Member</h2>

        <form action={UpdateProjectGroupMemberAction}>
          <input type="hidden" name="ProjectGroupMemberID" value={member.ProjectGroupMemberID} />

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Project Group</label>
            <select name="ProjectGroupID" defaultValue={member.ProjectGroupID} style={styles.input()}>
              {groups.map((g) => (
                <option key={g.ProjectGroupID} value={g.ProjectGroupID}>
                  {g.ProjectGroupName}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Student</label>
            <select name="StudentID" defaultValue={member.StudentID} style={styles.input()}>
              {students.map((s) => (
                <option key={s.StudentID} value={s.StudentID}>
                  {s.StudentName}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.checkboxRow()}>
            <label style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm, cursor: "pointer", color: theme.colors.text }}>
              <input type="checkbox" name="IsGroupLeader" defaultChecked={member.IsGroupLeader ?? false} />
              <span>Is Group Leader</span>
            </label>
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Update</button>
            <Link href="/projectgroupmember"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
