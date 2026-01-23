import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-indigo-600">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-8">
      
  
        <div className="card"><Link href="/student">Student Management</Link></div>
        <div className="card"><Link href="/staff" >Staff Management</Link></div>
        <div className="card"><Link href="/projecttype">Project Types Management</Link></div>
      </div>
    </div>
  );
}
