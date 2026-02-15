import { AddStudentAction } from "@/app/actions/student/AddStudentAction";
import { theme, styles } from "@/app/lib/theme";
import Link from "next/link";

export default function AddStudent() {
  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Add Student</h2>

        <form action={AddStudentAction}>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="StudentName" style={styles.label()}>Student Name</label>
            <input id="StudentName" name="StudentName" style={styles.input()} required />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Email" style={styles.label()}>Email</label>
            <input id="Email" name="Email" type="email" style={styles.input()} required />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Phone" style={styles.label()}>Phone</label>
            <input id="Phone" name="Phone" style={styles.input()} />
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Save Student</button>
            <Link href="/student"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
