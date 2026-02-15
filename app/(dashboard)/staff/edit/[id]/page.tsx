import UpdateStaffAction from "@/app/actions/staff/UpdateStaffAction";
import { prisma } from "@/app/lib/prisma";
import { theme, styles } from "@/app/lib/theme";
import Link from "next/link";

export default async function EditStaff({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const StaffID = Number(id);

  if (Number.isNaN(StaffID)) {
    return <h2 style={{ color: theme.colors.text, textAlign: "center", marginTop: theme.spacing.xl }}>Invalid Staff</h2>;
  }

  const staff = await prisma.staff.findUnique({
    where: { StaffID },
  });

  if (!staff) {
    return <h2 style={{ color: theme.colors.text, textAlign: "center", marginTop: theme.spacing.xl }}>Staff not found</h2>;
  }

  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Edit Staff</h2>

        <form action={UpdateStaffAction}>
          <input type="hidden" name="StaffID" value={staff.StaffID} />

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="StaffName" style={styles.label()}>StaffName</label>
            <input
              id="StaffName"
              type="text"
              name="StaffName"
              defaultValue={staff.StaffName}
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
              defaultValue={staff.Email ?? ""}
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
              defaultValue={staff.Phone ?? ""}
              style={styles.input()}
            />
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Update</button>
            <Link href="/staff"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
