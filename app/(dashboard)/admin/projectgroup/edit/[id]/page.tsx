"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { ArrowLeft, Save, X } from "lucide-react";

export default function EditProjectGroup({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const id = resolvedParams.id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [types, setTypes] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    ProjectGroupName: "",
    ProjectTypeID: "",
    ProjectTitle: "",
    ProjectArea: "",
    ConvenerStaffID: "",
    ExpertStaffID: ""
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/projecttype").then(r => r.json()),
      fetch("/api/staff").then(r => r.json()),
      fetch(`/api/projectgroup/${id}`).then(r => r.json())
    ]).then(([t, s, g]) => {
      setTypes(Array.isArray(t) ? t : []);
      setStaff(Array.isArray(s) ? s : []);
      if (g) setFormData({
        ProjectGroupName: g.ProjectGroupName || "",
        ProjectTypeID: g.ProjectTypeID?.toString() || "",
        ProjectTitle: g.ProjectTitle || "",
        ProjectArea: g.ProjectArea || "",
        ConvenerStaffID: g.ConvenerStaffID?.toString() || "",
        ExpertStaffID: g.ExpertStaffID?.toString() || ""
      });
      setFetching(false);
    }).catch(() => setFetching(false));
  }, [id]);

  async function update() {
    if (!formData.ProjectGroupName) return alert("Name is required");
    setLoading(true);
    try {
      await fetch(`/api/projectgroup/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      window.location.href = "/admin/projectgroup?msg=updated";

    } catch (e) { alert("Failed to update"); }
    finally { setLoading(false); }
  }

  if (fetching) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
        <h2 className="text-2xl font-bold text-gray-900">Edit Project Group</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Group Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300" 
              placeholder="e.g. Group A - Web App"
              value={formData.ProjectGroupName} 
              onChange={e => setFormData({ ...formData, ProjectGroupName: e.target.value })} 
              required 
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Project Title <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300" 
              placeholder="Full descriptive title of the project"
              value={formData.ProjectTitle} 
              onChange={e => setFormData({ ...formData, ProjectTitle: e.target.value })} 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Project Type <span className="text-red-500">*</span></label>
            <select 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300 appearance-none bg-no-repeat bg-right"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")' }}
              value={formData.ProjectTypeID} 
              onChange={e => setFormData({ ...formData, ProjectTypeID: e.target.value })} 
              required
            >
              <option value="">Select Type</option>
              {types.map(t => <option key={t.ProjectTypeID} value={t.ProjectTypeID}>{t.ProjectTypeName}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Convener Staff <span className="text-red-500">*</span></label>
            <select 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300 appearance-none bg-no-repeat bg-right"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")' }}
              value={formData.ConvenerStaffID} 
              onChange={e => setFormData({ ...formData, ConvenerStaffID: e.target.value })} 
              required
            >
              <option value="">Select Staff</option>
              {staff.map(s => <option key={s.StaffID} value={s.StaffID}>{s.StaffName}</option>)}
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Project Area</label>
            <input 
              type="text" 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300" 
              placeholder="e.g. AI / ML, Web Development, Cloud Computing"
              value={formData.ProjectArea} 
              onChange={e => setFormData({ ...formData, ProjectArea: e.target.value })} 
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
              onClick={() => router.push("/admin/projectgroup")} 
              className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-100 text-sm font-bold rounded-xl text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all shadow-sm"
            >
              <X size={16} className="mr-2" /> Cancel
            </button>
            <button 
              onClick={update} 
              disabled={loading} 
              className="inline-flex items-center justify-center px-8 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200"
            >
              <Save size={16} className="mr-2" /> {loading ? "Updating..." : "Update Group"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
