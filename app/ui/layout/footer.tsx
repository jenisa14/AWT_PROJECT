import { styles } from "@/lib/theme";

export default function Footer() {
  return (
    <footer style={styles.footerBar()}>
      Student Project Management System &copy; {new Date().getFullYear()}
    </footer>
  );
}
