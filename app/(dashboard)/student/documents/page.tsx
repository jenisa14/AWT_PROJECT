"use client";

import { useState, useEffect } from "react";
import { Upload, Download, FileText, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import SuccessToast from "@/components/SuccessToast";
import { useSearchParams } from "next/navigation";

export default function StudentDocumentsPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg");

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    setLoading(true);
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      setFiles(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        window.location.href = "/student/documents?msg=added";
      } else {
        setMessage({ text: "Upload failed.", type: "error" });
      }
    } catch (e) {
      setMessage({ text: "Error uploading file.", type: "error" });
    } finally {
      setUploading(false);
    }
  }


  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <SuccessToast msg={msg} entityName="Document" />
      {/* Header Section */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Project Documents</h1>
          <p className="text-slate-500 mt-1">Upload and manage your project reports and reports.</p>
        </div>
        
        <div className="relative">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
          <label
            htmlFor="file-upload"
            className={`inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2" size={20} />
                Upload New Document
              </>
            )}
          </label>
        </div>
      </div>

      {/* Message Notifications */}
      {message && (
        <div className={`flex items-center p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
          {message.type === 'success' ? <CheckCircle className="mr-3 shrink-0" size={20} /> : <AlertCircle className="mr-3 shrink-0" size={20} />}
          <span className="text-sm font-semibold">{message.text}</span>
        </div>
      )}

      {/* Documents Table Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Document Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Storage Path</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                      <span className="font-medium">Loading documents...</span>
                    </div>
                  </td>
                </tr>
              ) : files.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 bg-slate-50 rounded-full">
                        <FileText size={40} className="text-slate-300" />
                      </div>
                      <div className="text-slate-500 font-medium">No documents uploaded yet.</div>
                      <p className="text-slate-400 text-sm max-w-xs">Use the button above to upload your first project document.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                files.map((file, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                          <FileText size={20} />
                        </div>
                        <span className="font-bold text-slate-700">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded text-[11px] font-mono">
                        {file.url}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a
                          href={file.url}
                          download
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="Download"
                        >
                          <Download size={18} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer Area of Table */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-right">
          <span className="text-xs font-bold text-slate-400">Total Documents: {files.length}</span>
        </div>
      </div>
    </div>
  );
}
