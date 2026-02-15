import { AddProjectGroupAction } from "@/app/actions/projectgroup/AddProjectGroupAction";
import { theme, styles } from "@/app/lib/theme";
import Link from "next/link";

export default function AddProjectGroup() {
  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Add Project Group</h2>

        <form action={AddProjectGroupAction}>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ProjectGroupName" style={styles.label()}>Group Name</label>
            <input id="ProjectGroupName" name="ProjectGroupName" required style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ProjectTitle" style={styles.label()}>Project Title</label>
            <input id="ProjectTitle" name="ProjectTitle" required style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ProjectTypeID" style={styles.label()}>Project Type ID</label>
            <input id="ProjectTypeID" name="ProjectTypeID" type="number" required style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ConvenerStaffID" style={styles.label()}>Convener Staff ID</label>
            <input id="ConvenerStaffID" name="ConvenerStaffID" type="number" required style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ExpertStaffID" style={styles.label()}>Expert Staff ID</label>
            <input id="ExpertStaffID" name="ExpertStaffID" type="number" style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ProjectArea" style={styles.label()}>Project Area</label>
            <input id="ProjectArea" name="ProjectArea" style={styles.input()} />
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Save</button>
            <Link href="/projectgroup"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
