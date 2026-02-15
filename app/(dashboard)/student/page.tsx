import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import ListPageLayout from "@/app/components/ListPageLayout";
import DeleteStudentBtn from "@/app/ui/student/DeleteStudentBtn";
import { resolveMsg } from "@/app/lib/resolveSearchParams";
import { theme, styles } from "@/app/lib/theme";

export default async function StudentList({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }> | { msg?: string };
}) {
  const msg = await resolveMsg(searchParams);
  const students = await prisma.student.findMany();

  return (
    <ListPageLayout title="Students" addHref="/student/add" addLabel="Add Student" msg={msg} entityName="Student">
      <table style={styles.table()}>
        <thead>
          <tr>
            <th style={styles.th()}>Student Name</th>
            <th style={styles.th()}>Email</th>
            <th style={styles.th()}>Phone</th>
            <th style={{ ...styles.th(), textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.StudentID} style={{ borderBottom: `1px solid ${theme.colors.borderLight}` }}>
              <td style={{ ...styles.td(), textAlign: "left", fontWeight: 500 }}>{s.StudentName}</td>
              <td style={{ ...styles.td(), textAlign: "left" }}>{s.Email}</td>
              <td style={{ ...styles.td(), textAlign: "left" }}>{s.Phone}</td>
              <td style={styles.td()}>
                <div style={styles.actionsRow()}>
                  <Link href={`/student/${s.StudentID}`}>
                    <button style={styles.btnTeal()}>Details</button>
                  </Link>
                  <Link href={`/student/edit/${s.StudentID}`}>
                    <button style={styles.btnSuccess()}>Edit</button>
                  </Link>
                  <DeleteStudentBtn id={s.StudentID} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ListPageLayout>
  );
}
