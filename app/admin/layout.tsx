import React from "react";
import AdminSidebar from "../ui/layout/AdminSidebar";
import Header from "../ui/layout/header";
import Footer from "../ui/layout/footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header/>
      <div style={{ display: "flex" }}>
        <AdminSidebar />
        <main style={{ flex: 1, padding: "20px" }}>{children}</main>
      </div>
      <Footer />
    </>
  );
}