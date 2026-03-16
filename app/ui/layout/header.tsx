import Link from "next/link";
import { styles } from "@/lib/theme";

export default function Header() {
  return (
    <header style={styles.headerBar()}>
      <span>Student Project Management System</span>
      <Link
        href="/auth/login?logout=1"
        style={{
          backgroundColor: "#475569",
          color: "#fff",
          padding: "6px 12px",
          border: "none",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        Logout
      </Link>
    </header>
  );
}
