import { AddProjectTypeAction } from "@/app/actions/projecttype/AddProjectTypeAction";
import { theme, styles } from "@/app/lib/theme";
import Link from "next/link";

export default function AddProjectType() {
  return (
    <div style={{ padding: theme.spacing.xl, backgroundColor: theme.colors.background, minHeight: "100%" }}>
      <div style={styles.formCard()}>
        <h2 style={{ ...styles.title(), marginBottom: theme.spacing.lg }}>Add Project Type</h2>

        <form action={AddProjectTypeAction}>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="ProjectTypeName" style={styles.label()}>Project Type Name</label>
            <input id="ProjectTypeName" type="text" name="ProjectTypeName" required style={styles.input()} />
          </div>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Description" style={styles.label()}>Description</label>
            <input id="Description" type="text" name="Description" style={styles.input()} />
          </div>

          <div style={styles.btnWrap()}>
            <button type="submit" style={styles.btnPrimary()}>Save</button>
            <Link href="/projecttype"><button type="button" style={styles.btnSecondary()}>Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}
