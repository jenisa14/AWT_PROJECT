import StudentSidebar from "@/app/ui/layout/StudentSidebar";
import Header from "../ui/layout/header";
import Footer from "../ui/layout/footer";

export default function StudentLayout({ children }: 
    { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <StudentSidebar />
        <main style={{ flex: 1, padding: "20px" }}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
