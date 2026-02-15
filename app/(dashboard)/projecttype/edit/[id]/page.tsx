import { prisma } from "@/app/lib/prisma";
import { UpdateProjectTypeAction } from "@/app/actions/projecttype/UpdateProjectTypeAction";
import { theme, styles } from "@/app/lib/theme";
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

  if (!type) return <h2 style={{ color: theme.colors.text }}>Not Found</h2>;

  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Edit Project Type</h2>

        <form action={UpdateProjectTypeAction}>
          <input type="hidden" name="ProjectTypeID" value={type.ProjectTypeID} />

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ProjectTypeName" style={styles.label()}>Project Type Name</label>
            <input id="ProjectTypeName" type="text" name="ProjectTypeName" defaultValue={type.ProjectTypeName} required style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Description" style={styles.label()}>Description</label>
            <input id="Description" type="text" name="Description" defaultValue={type.Description ?? ""} style={styles.input()} />
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Update</button>
            <Link href="/projecttype"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
