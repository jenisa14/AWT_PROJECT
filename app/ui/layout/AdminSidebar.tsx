import Link from "next/link";
import { theme } from "@/lib/theme";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings,
  ShieldHalf,
  FileBarChart
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

export default function AdminSidebar() {
  return (
    <aside style={asideStyle}>
      <div className="mb-8 px-2">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldHalf className="text-purple-400" />
          SPMS Admin
        </h3>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">System Control</p>
      </div>

      <nav className="flex-1 space-y-1">
        <Link href="/admin/dashboard" className={linkStyle}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
        <Link href="/admin/projecttype" className={linkStyle}>
          <Settings size={18} />
          <span>Project Type</span>
        </Link>
        <Link href="/admin/projectgroup" className={linkStyle}>
          <Briefcase size={18} />
          <span>Project Group</span>
        </Link>
        <Link href="/admin/student" className={linkStyle}>
          <Users size={18} />
          <span>Students</span>
        </Link>
        <Link href="/admin/staff" className={linkStyle}>
          <Users size={18} />
          <span>Staff</span>
        </Link>
      </nav>

      <div className="pt-4 border-t border-white/10 mt-auto">
        <p className="text-[10px] text-gray-500 text-center font-bold">SPMS v1.0</p>
      </div>
    </aside>
  );
}
