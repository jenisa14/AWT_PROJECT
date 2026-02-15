import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import ListPageLayout from "@/app/components/ListPageLayout";
import DeleteProjectGroupBtn from "@/app/ui/projectgroup/DeleteProjectGroupBtn";
import { theme, styles } from "@/app/lib/theme";

export default async function ProjectGroupList({
  searchParams,
}: {
  searchParams?: Promise<{ msg?: string }> | { msg?: string };
}) {
  const resolved = searchParams && typeof (searchParams as Promise<{ msg?: string }>).then === "function"
    ? await (searchParams as Promise<{ msg?: string }>)
    : (searchParams as { msg?: string }) ?? {};
  const msg = resolved?.msg;

  const groups = await prisma.projectgroup.findMany();

  return (
    <ListPageLayout title="Project Groups" addHref="/projectgroup/add" addLabel="Add Project Group" msg={msg} entityName="Project Group">
      <table style={styles.table()}>
        <thead>
          <tr>
            <th style={styles.th()}>Name</th>
            <th style={styles.th()}>Title</th>
            <th style={{ ...styles.th(), textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <tr key={g.ProjectGroupID} style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}>
              <td style={{ ...styles.td(), textAlign: "left", fontWeight: 500 }}>{g.ProjectGroupName}</td>
              <td style={{ ...styles.td(), textAlign: "left" }}>{g.ProjectTitle}</td>
              <td style={styles.td()}>
                <div style={styles.actionsRow()}>
                  <Link href={`/projectgroup/${g.ProjectGroupID}`}>
                    <button style={styles.btnTeal()}>Details</button>
                  </Link>
                  <Link href={`/projectgroup/edit/${g.ProjectGroupID}`}>
                    <button style={styles.btnSuccess()}>Edit</button>
                  </Link>
                  <DeleteProjectGroupBtn id={g.ProjectGroupID} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ListPageLayout>
  );
}
