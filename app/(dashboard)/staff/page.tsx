import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import ListPageLayout from "@/app/components/ListPageLayout";
import DeleteStaffBtn from "@/app/ui/staff/DeleteStaffBtn";
import { resolveMsg } from "@/app/lib/resolveSearchParams";
import { theme, styles } from "@/app/lib/theme";

export default async function StffList({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }> | { msg?: string };
}) {
  const msg = await resolveMsg(searchParams);
  const students = await prisma.staff.findMany();

  return (
    <ListPageLayout title="Staff" addHref="/staff/add" addLabel="Add Staff" msg={msg} entityName="Staff">
      <table style={styles.table()}>
        <thead>
          <tr>
            <th style={styles.th()}>Staff Name</th>
            <th style={styles.th()}>Email</th>
            <th style={styles.th()}>Phone</th>
            <th style={{ ...styles.th(), textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.StaffID} style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}>
              <td style={{ ...styles.td(), textAlign: "left", fontWeight: 500 }}>{s.StaffName}</td>
              <td style={{ ...styles.td(), textAlign: "left" }}>{s.Email}</td>
              <td style={{ ...styles.td(), textAlign: "left" }}>{s.Phone}</td>
              <td style={styles.td()}>
                <div style={styles.actionsRow()}>
                  <Link href={`/staff/${s.StaffID}`}>
                    <button style={styles.btnTeal()}>Details</button>
                  </Link>
                  <Link href={`/staff/edit/${s.StaffID}`}>
                    <button style={styles.btnSuccess()}>Edit</button>
                  </Link>
                  <DeleteStaffBtn id={s.StaffID} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ListPageLayout>
  );
}
