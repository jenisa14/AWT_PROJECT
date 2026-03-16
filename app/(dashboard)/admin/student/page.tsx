"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Mail, Phone, ArrowLeft } from "lucide-react";

export default function StudentList() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/student")
      .then(res => res.json())
      .then(data => {
        setData(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function deleteItem(id: number) {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/student/${id}`, { method: "DELETE" });
    setData(data.filter(item => item.StudentID !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
        </div>
        <Link 
          href="/admin/student/add" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Student
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Student Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Contact Info</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={3} className="px-6 py-12 text-center text-sm text-slate-400 font-medium italic">Loading students...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-12 text-center text-sm text-slate-400 font-medium italic">No students found.</td></tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.StudentID} className={`hover:bg-slate-50/80 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 border-b border-slate-100">{item.StudentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-slate-100">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-[11px] text-slate-500 font-medium">
                          <Mail size={12} className="mr-1.5 text-slate-400" /> {item.Email}
                        </div>
                        {item.Phone && (
                          <div className="flex items-center text-[11px] text-slate-500 font-medium">
                            <Phone size={12} className="mr-1.5 text-slate-400" /> {item.Phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-slate-100">
                      <div className="flex items-center justify-end space-x-3">
                        <Link href={`/admin/student/edit/${item.StudentID}`} className="inline-flex items-center px-3 py-1.5 border border-indigo-100 rounded-lg text-xs font-bold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                          <Edit2 size={14} className="mr-1.5" /> Edit
                        </Link>
                        <button onClick={() => deleteItem(item.StudentID)} className="inline-flex items-center px-3 py-1.5 border border-red-100 rounded-lg text-xs font-bold text-red-600 bg-red-50/50 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                          <Trash2 size={14} className="mr-1.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
