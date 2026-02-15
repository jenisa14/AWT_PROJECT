import { prisma } from "@/app/lib/prisma";
import { UpdateProjectGroupAction } from "@/app/actions/projectgroup/UpdateProjectGroupAction";
import { theme, styles } from "@/app/lib/theme";
import Link from "next/link";

export default async function EditProjectGroup({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;

  const group = await prisma.projectgroup.findUnique({
    where: { ProjectGroupID: Number(id) },
  });

  if (!group) return <h2 style={{ color: theme.colors.text }}>Not found</h2>;

  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Edit Project Group</h2>

        <form action={UpdateProjectGroupAction}>
          <input type="hidden" name="ProjectGroupID" value={group.ProjectGroupID} />

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ProjectGroupName" style={styles.label()}>Group Name</label>
            <input id="ProjectGroupName" name="ProjectGroupName" defaultValue={group.ProjectGroupName} required style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ProjectTitle" style={styles.label()}>Project Title</label>
            <input id="ProjectTitle" name="ProjectTitle" defaultValue={group.ProjectTitle} required style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ProjectArea" style={styles.label()}>Project Area</label>
            <input id="ProjectArea" name="ProjectArea" defaultValue={group.ProjectArea ?? ""} style={styles.input()} />
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Update</button>
            <Link href="/projectgroup"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
