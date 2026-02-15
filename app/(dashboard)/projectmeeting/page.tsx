import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import ListPageLayout from "@/app/components/ListPageLayout";
import DeleteProjectMeetingBtn from "@/app/ui/projectmeeting/DeleteProjectMeetingBtn";
import { resolveMsg } from "@/app/lib/resolveSearchParams";
import { theme, styles } from "@/app/lib/theme";

export default async function ProjectMeetingList({
  searchParams,
}: {
  searchParams?: Promise<{ msg?: string }> | { msg?: string };
}) {
  const msg = await resolveMsg(searchParams);
  const meetings = await prisma.projectmeeting.findMany();

  return (
    <ListPageLayout title="Project Meetings" addHref="/projectmeeting/add" addLabel="Add Meeting" msg={msg} entityName="Project Meeting">
      <table style={styles.table()}>
        <thead>
          <tr>
            <th style={styles.th()}>Group ID</th>
            <th style={styles.th()}>Guide Staff ID</th>
            <th style={styles.th()}>Date</th>
            <th style={{ ...styles.th(), textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((m) => (
            <tr key={m.ProjectMeetingID} style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}>
              <td style={styles.td()}>{m.ProjectGroupID}</td>
              <td style={styles.td()}>{m.GuideStaffID}</td>
              <td style={styles.td()}>{m.MeetingDateTime.toString()}</td>
              <td style={styles.td()}>
                <div style={styles.actionsRow()}>
                  <Link href={`/projectmeeting/${m.ProjectMeetingID}`}>
                    <button style={styles.btnTeal()}>Details</button>
                  </Link>
                  <Link href={`/projectmeeting/edit/${m.ProjectMeetingID}`}>
                    <button style={styles.btnSuccess()}>Edit</button>
                  </Link>
                  <DeleteProjectMeetingBtn id={m.ProjectMeetingID} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ListPageLayout>
  );
}
