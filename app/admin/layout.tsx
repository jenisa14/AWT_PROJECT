import React from "react";
import { styles } from "@/app/lib/theme";
import AdminSidebar from "../ui/layout/AdminSidebar";
import Header from "../ui/layout/header";
import Footer from "../ui/layout/footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={styles.layoutWrapper()}>
      <div style={styles.layoutHeader()}>
        <Header />
      </div>
      <div style={styles.layoutBody()}>
        <AdminSidebar />
        <main style={styles.layoutMain()}>{children}</main>
      </div>
      <div style={styles.layoutFooter()}>
        <Footer />
      </div>
    </div>
  );
}