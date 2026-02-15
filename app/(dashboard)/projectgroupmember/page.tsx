import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import ListPageLayout from "@/app/components/ListPageLayout";
import DeleteProjectGroupMemberBtn from "@/app/ui/projectgroupmember/DeleteProjectGroupMemberBtn";
import { resolveMsg } from "@/app/lib/resolveSearchParams";
import { theme, styles } from "@/app/lib/theme";

export default async function ProjectGroupMemberList({
  searchParams,
}: {
  searchParams?: Promise<{ msg?: string }> | { msg?: string };
}) {
  const msg = await resolveMsg(searchParams);
  const members = await prisma.projectgroupmember.findMany();

  return (
    <ListPageLayout title="Project Group Members" addHref="/projectgroupmember/add" addLabel="Add Member" msg={msg} entityName="Project Group Member">
      <table style={styles.table()}>
        <thead>
          <tr>
            <th style={styles.th()}>ProjectGroupID</th>
            <th style={styles.th()}>StudentID</th>
            <th style={styles.th()}>Leader</th>
            <th style={{ ...styles.th(), textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.ProjectGroupMemberID} style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}>
              <td style={styles.td()}>{m.ProjectGroupID}</td>
              <td style={styles.td()}>{m.StudentID}</td>
              <td style={styles.td()}>{m.IsGroupLeader ? "Yes" : "No"}</td>
              <td style={styles.td()}>
                <div style={styles.actionsRow()}>
                  <Link href={`/projectgroupmember/${m.ProjectGroupMemberID}`}>
                    <button style={styles.btnTeal()}>Details</button>
                  </Link>
                  <Link href={`/projectgroupmember/edit/${m.ProjectGroupMemberID}`}>
                    <button style={styles.btnSuccess()}>Edit</button>
                  </Link>
                  <DeleteProjectGroupMemberBtn id={m.ProjectGroupMemberID} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ListPageLayout>
  );
}
