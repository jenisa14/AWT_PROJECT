import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import ListPageLayout from "@/app/components/ListPageLayout";
import DeleteProjectTypeBtn from "@/app/ui/projecttype/DeleteProjectTypeBtn";
import { resolveMsg } from "@/app/lib/resolveSearchParams";
import { theme, styles } from "@/app/lib/theme";

export default async function ProjectTypeList({
  searchParams,
}: {
  searchParams?: Promise<{ msg?: string }> | { msg?: string };
}) {
  const msg = await resolveMsg(searchParams);
  const types = await prisma.projecttype.findMany();

  return (
    <ListPageLayout title="Project Types" addHref="/projecttype/add" addLabel="Add Project Type" msg={msg} entityName="Project Type">
      <table style={styles.table()}>
        <thead>
          <tr>
            <th style={styles.th()}>Name</th>
            <th style={styles.th()}>Description</th>
            <th style={{ ...styles.th(), textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map((t) => (
            <tr key={t.ProjectTypeID} style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}>
              <td style={{ ...styles.td(), textAlign: "left", fontWeight: 500 }}>{t.ProjectTypeName}</td>
              <td style={{ ...styles.td(), textAlign: "left" }}>{t.Description ?? ""}</td>
              <td style={styles.td()}>
                <div style={styles.actionsRow()}>
                  <Link href={`/projecttype/edit/${t.ProjectTypeID}`}>
                    <button style={styles.btnSuccess()}>Edit</button>
                  </Link>
                  <DeleteProjectTypeBtn id={t.ProjectTypeID} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ListPageLayout>
  );
}
