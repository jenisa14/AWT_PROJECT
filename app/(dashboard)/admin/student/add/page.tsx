"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";

export default function AddStudent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ StudentName: "", Email: "", Phone: "", Password: "password123" });

  async function save() {
    if (!formData.StudentName || !formData.Email) return alert("Required fields missing");
    setLoading(true);
    try {
      await fetch("/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      router.push("/admin/student");
      router.refresh();
    } catch (e) { alert("Failed to save"); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
        <h2 className="text-2xl font-bold text-gray-900">Add Student</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300" 
              placeholder="e.g. Alice Smith"
              value={formData.StudentName} 
              onChange={e => setFormData({ ...formData, StudentName: e.target.value })} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300" 
              placeholder="alice.smith@university.edu"
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
              placeholder="+91 8765432109"
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
              onClick={() => router.push("/admin/student")} 
              className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-100 text-sm font-bold rounded-xl text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all shadow-sm"
            >
              <X size={16} className="mr-2" /> Cancel
            </button>
            <button 
              onClick={save} 
              disabled={loading} 
              className="inline-flex items-center justify-center px-8 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200"
            >
              <Save size={16} className="mr-2" /> {loading ? "Saving..." : "Save Student"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
