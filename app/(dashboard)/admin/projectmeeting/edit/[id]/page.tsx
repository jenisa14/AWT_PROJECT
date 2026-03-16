"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { ArrowLeft, Save, X } from "lucide-react";

export default function EditMeeting({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const id = resolvedParams.id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [groups, setGroups] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    ProjectGroupID: "",
    GuideStaffID: "",
    MeetingDateTime: "",
    MeetingPurpose: "",
    MeetingNotes: ""
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/projectgroup").then(r => r.json()),
      fetch("/api/staff").then(r => r.json()),
      fetch(`/api/projectmeeting/${id}`).then(r => r.json())
    ]).then(([g, s, m]) => {
      setGroups(Array.isArray(g) ? g : []);
      setStaff(Array.isArray(s) ? s : []);
      if (m) setFormData({
        ProjectGroupID: m.ProjectGroupID?.toString() || "",
        GuideStaffID: m.GuideStaffID?.toString() || "",
        MeetingDateTime: m.MeetingDateTime ? new Date(m.MeetingDateTime).toISOString().slice(0, 16) : "",
        MeetingPurpose: m.MeetingPurpose || "",
        MeetingNotes: m.MeetingNotes || ""
      });
      setFetching(false);
    }).catch(() => setFetching(false));
  }, [id]);

  async function update() {
    if (!formData.MeetingDateTime) return alert("Date is required");
    setLoading(true);
    try {
      await fetch(`/api/projectmeeting/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      window.location.href = "/admin/projectmeeting?msg=updated";

    } catch (e) { alert("Failed to update"); }
    finally { setLoading(false); }
  }

  if (fetching) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
        <h2 className="text-2xl font-bold text-gray-900">Edit Meeting</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Project Group <span className="text-red-500">*</span></label>
            <select 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300 appearance-none bg-no-repeat bg-right"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")' }}
              value={formData.ProjectGroupID} 
              onChange={e => setFormData({ ...formData, ProjectGroupID: e.target.value })} 
              required
            >
              <option value="">Select Group</option>
              {groups.map(g => <option key={g.ProjectGroupID} value={g.ProjectGroupID}>{g.ProjectGroupName}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Guide Staff <span className="text-red-500">*</span></label>
            <select 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300 appearance-none bg-no-repeat bg-right"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")' }}
              value={formData.GuideStaffID} 
              onChange={e => setFormData({ ...formData, GuideStaffID: e.target.value })} 
              required
            >
              <option value="">Select Staff</option>
              {staff.map(s => <option key={s.StaffID} value={s.StaffID}>{s.StaffName}</option>)}
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Meeting Date & Time <span className="text-red-500">*</span></label>
            <input 
              type="datetime-local" 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300" 
              value={formData.MeetingDateTime} 
              onChange={e => setFormData({ ...formData, MeetingDateTime: e.target.value })} 
              required 
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Meeting Purpose</label>
            <input 
              type="text" 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border transition-all hover:border-slate-300" 
              placeholder="e.g. Weekly progress review"
              value={formData.MeetingPurpose} 
              onChange={e => setFormData({ ...formData, MeetingPurpose: e.target.value })} 
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Meeting Notes</label>
            <textarea 
              className="block w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3.5 border h-32 transition-all hover:border-slate-300" 
              placeholder="Record key discussion points and tasks..."
              value={formData.MeetingNotes} 
              onChange={e => setFormData({ ...formData, MeetingNotes: e.target.value })} 
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
              onClick={() => router.push("/admin/projectmeeting")} 
              className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-100 text-sm font-bold rounded-xl text-slate-500 bg-slate-50 hover:bg-slate-100 transition-all shadow-sm"
            >
              <X size={16} className="mr-2" /> Cancel
            </button>
            <button 
              onClick={update} 
              disabled={loading} 
              className="inline-flex items-center justify-center px-8 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200"
            >
              <Save size={16} className="mr-2" /> {loading ? "Updating..." : "Update Meeting"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
