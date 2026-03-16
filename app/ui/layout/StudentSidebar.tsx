import Link from "next/link";
import { theme } from "@/lib/theme";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Video, 
  FolderOpen
} from "lucide-react";

const asideStyle: React.CSSProperties = {
  width: 250,
  backgroundColor: theme.colors.header,
  color: "#fff",
  padding: theme.spacing.xl,
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  position: "sticky",
  top: 0
};

const linkStyle = "flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all mb-1";

export default function StudentSidebar() {
  return (
    <aside style={asideStyle}>
      <div className="mb-8 px-2">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FolderOpen className="text-blue-400" />
          SPMS Student
        </h3>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Portal Navigation</p>
      </div>

      <nav className="flex-1 space-y-1">
        <Link href="/student/dashboard" className={linkStyle}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
        <Link href="/student/myproject" className={linkStyle}>
          <FileText size={18} />
          <span>My Project</span>
        </Link>
        <Link href="/student/meeting" className={linkStyle}>
          <Video size={18} />
          <span>Meeting</span>
        </Link>
        <Link href="/student/documents" className={linkStyle}>
          <FileText size={18} />
          <span>Documents</span>
        </Link>
      </nav>

      <div className="pt-4 border-t border-white/10 mt-auto">
        <p className="text-[10px] text-gray-500 text-center">© 2026 SPMS Project</p>
      </div>
    </aside>
  );
}
