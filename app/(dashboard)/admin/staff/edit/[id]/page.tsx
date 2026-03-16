"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { ArrowLeft, Save, X } from "lucide-react";

export default function EditStaff({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const id = resolvedParams.id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({ StaffName: "", Email: "", Phone: "", Role: "" });

  useEffect(() => {
    fetch(`/api/staff/${id}`).then(r => r.json()).then(d => {
      if (d) setFormData({ StaffName: d.StaffName || "", Email: d.Email || "", Phone: d.Phone || "", Role: d.Role || "" });
      setFetching(false);
    }).catch(() => setFetching(false));
  }, [id]);

  async function update() {
    if (!formData.StaffName) return alert("Name is required");
    setLoading(true);
    try {
      await fetch(`/api/staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      router.push("/admin/staff");
      router.refresh();
    } catch (e) { alert("Failed to update"); }
    finally { setLoading(false); }
  }

  if (fetching) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
        <h2 className="text-2xl font-bold text-gray-900">Edit Staff Member</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300" 
              placeholder="e.g. Dr. John Doe"
              value={formData.StaffName} 
              onChange={e => setFormData({ ...formData, StaffName: e.target.value })} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300" 
              placeholder="john.doe@example.com"
              value={formData.Email} 
              onChange={e => setFormData({ ...formData, Email: e.target.value })} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
            <input 
              type="text" 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300" 
              placeholder="+91 9876543210"
              value={formData.Phone} 
              onChange={e => setFormData({ ...formData, Phone: e.target.value })} 
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-slate-100">
          <button 
            type="button"
            onClick={() => router.back()} 
            className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-200 text-sm font-bold rounded-xl text-slate-600 bg-white hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>
          
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={() => router.push("/admin/staff")} 
              className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-100 text-sm font-bold rounded-xl text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all shadow-sm"
            >
              <X size={16} className="mr-2" /> Cancel
            </button>
            <button 
              onClick={update} 
              disabled={loading} 
              className="inline-flex items-center justify-center px-8 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200"
            >
              <Save size={16} className="mr-2" /> {loading ? "Updating..." : "Update Staff"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
