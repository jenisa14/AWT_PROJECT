import { Bell, Search, User, LogOut } from "lucide-react";

export default function TopNavbar({ role }: { role: string }) {
  const handleLogout = () => {
    window.location.href = "/auth/login?logout=1";
  };

  return (
    <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8 z-10 sticky top-0 transition-all">
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
            placeholder="Search system..."
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all relative group">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white ring-2 ring-transparent group-hover:ring-red-100"></span>
        </button>
        
        <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-gray-800 capitalize leading-tight">{role}</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Verified Account</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 ring-2 ring-white">
            <User size={20} />
          </div>
          
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
