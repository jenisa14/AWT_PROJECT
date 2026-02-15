import Link from "next/link";
import { theme, styles } from "@/app/lib/theme";

export default function UnauthorizedPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background, padding: theme.spacing.xl }}>
      <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
        <h1 style={{ ...styles.title(), marginBottom: theme.spacing.sm }}>Access Denied</h1>
        <p style={{ color: theme.colors.textMuted, marginBottom: theme.spacing.xl }}>You do not have permission to view this page.</p>
        <Link href="/auth/login" style={{ ...styles.btnPrimary(), display: "inline-block", textDecoration: "none" }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
}
