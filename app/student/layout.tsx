import StudentSidebar from "@/app/ui/layout/StudentSidebar";
import { styles } from "@/app/lib/theme";
import Header from "../ui/layout/header";
import Footer from "../ui/layout/footer";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={styles.layoutWrapper()}>
      <div style={styles.layoutHeader()}>
        <Header />
      </div>
      <div style={styles.layoutBody()}>
        <StudentSidebar />
        <main style={styles.layoutMain()}>{children}</main>
      </div>
      <div style={styles.layoutFooter()}>
        <Footer />
      </div>
    </div>
  );
}
