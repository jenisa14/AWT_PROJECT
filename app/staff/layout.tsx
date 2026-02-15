import React from "react";
import { styles } from "@/app/lib/theme";
import StaffSidebar from "../ui/layout/StaffSidebar";
import Header from "../ui/layout/header";
import Footer from "../ui/layout/footer";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={styles.layoutWrapper()}>
      <div style={styles.layoutHeader()}>
        <Header />
      </div>
      <div style={styles.layoutBody()}>
        <StaffSidebar />
        <main style={styles.layoutMain()}>{children}</main>
      </div>
      <div style={styles.layoutFooter()}>
        <Footer />
      </div>
    </div>
  );
}
