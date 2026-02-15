import { AddProjectGroupMemberAction } from "@/app/actions/projectgroupmember/AddProjectGroupMemberAction";
import { prisma } from "@/app/lib/prisma";
import { theme, styles } from "@/app/lib/theme";
import Link from "next/link";

export default async function AddProjectGroupMember() {
  const groups = await prisma.projectgroup.findMany();
  const students = await prisma.student.findMany();

  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Add Group Member</h2>

        <form action={AddProjectGroupMemberAction}>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Project Group</label>
            <select name="ProjectGroupID" required style={styles.input()}>
              <option value="">Select Project Group</option>
              {groups.map((g) => (
                <option key={g.ProjectGroupID} value={g.ProjectGroupID}>
                  {g.ProjectGroupName}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Student</label>
            <select name="StudentID" required style={styles.input()}>
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.StudentID} value={s.StudentID}>
                  {s.StudentName}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.checkboxRow()}>
            <label style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm, cursor: "pointer", color: theme.colors.text }}>
              <input type="checkbox" name="IsGroupLeader" />
              <span>Is Group Leader</span>
            </label>
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Save</button>
            <Link href="/projectgroupmember"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
