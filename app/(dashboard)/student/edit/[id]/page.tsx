import UpdateStudentAction from "@/app/actions/student/UpdateStudentAction";
import { prisma } from "@/app/lib/prisma";
import { theme, styles } from "@/app/lib/theme";
import Link from "next/link";

export default async function EditStudent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const StudentID = Number(id);

  if (Number.isNaN(StudentID)) {
    return <h2 style={{ color: theme.colors.text, textAlign: "center", marginTop: theme.spacing.xl }}>Invalid Student</h2>;
  }

  const student = await prisma.student.findUnique({
    where: { StudentID },
  });

  if (!student) {
    return <h2 style={{ color: theme.colors.text, textAlign: "center", marginTop: theme.spacing.xl }}>Student not found</h2>;
  }

  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Edit Student</h2>

        <form action={UpdateStudentAction}>
          <input type="hidden" name="StudentID" value={student.StudentID} />

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="StudentName" style={styles.label()}>StudentName</label>
            <input
              id="StudentName"
              type="text"
              name="StudentName"
              defaultValue={student.StudentName}
              style={styles.input()}
              required
            />
          </div>

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Email" style={styles.label()}>Email</label>
            <input
              id="Email"
              type="email"
              name="Email"
              defaultValue={student.Email ?? ""}
              style={styles.input()}
              required
            />
          </div>

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Phone" style={styles.label()}>Phone</label>
            <input
              id="Phone"
              type="text"
              name="Phone"
              defaultValue={student.Phone ?? ""}
              style={styles.input()}
            />
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Update</button>
            <Link href="/student"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
