import { prisma } from "@/app/lib/prisma";
import { AddProjectMeetingAction } from "@/app/actions/projectmeeting/AddProjectMeetingAction";
import { theme, styles } from "@/app/lib/theme";
import Link from "next/link";

export default async function AddProjectMeetingPage() {
  const groups = await prisma.projectgroup.findMany();
  const staff = await prisma.staff.findMany();

  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Add Project Meeting</h2>

        <form action={AddProjectMeetingAction}>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Project Group</label>
            <select name="ProjectGroupID" required style={styles.input()}>
              <option value="">-- Select Group --</option>
              {groups.map((g) => (
                <option key={g.ProjectGroupID} value={g.ProjectGroupID}>
                  {g.ProjectGroupName}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Guide Staff</label>
            <select name="GuideStaffID" required style={styles.input()}>
              <option value="">-- Select Staff --</option>
              {staff.map((s) => (
                <option key={s.StaffID} value={s.StaffID}>
                  {s.StaffName}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Date & Time</label>
            <input type="datetime-local" name="MeetingDateTime" required style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Purpose</label>
            <input type="text" name="MeetingPurpose" placeholder="Purpose" required style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={styles.label()}>Notes</label>
            <textarea name="MeetingNotes" placeholder="Notes" style={styles.textarea()} />
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Save</button>
            <Link href="/projectmeeting"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
