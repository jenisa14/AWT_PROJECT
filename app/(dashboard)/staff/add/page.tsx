import { AddStaffAction } from "@/app/actions/staff/AddStaffAction";
import { theme, styles } from "@/app/lib/theme";
import Link from "next/link";

export default function AddStaff() {
  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Add Staff</h2>

        <form action={AddStaffAction}>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="StaffName" style={styles.label()}>Staff Name</label>
            <input id="StaffName" name="StaffName" style={styles.input()} required />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Email" style={styles.label()}>Email</label>
            <input id="Email" name="Email" type="email" style={styles.input()} required />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Phone" style={styles.label()}>Phone</label>
            <input id="Phone" name="Phone" style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Password" style={styles.label()}>Password</label>
            <input id="Password" type="password" name="Password" style={styles.input()} required />
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Save Staff</button>
            <Link href="/staff"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
