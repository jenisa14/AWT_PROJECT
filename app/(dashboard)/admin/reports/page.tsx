import Link from "next/link";
import { FileText, Download, FileSpreadsheet } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { id: "projects-guide", title: "List of Projects with Guide", description: "View all projects and their assigned faculty guides." },
    { id: "project-type", title: "Project Type Wise List", description: "Breakdown of projects categorized by their types." },
    { id: "group-members", title: "Group Members Report", description: "Detailed list of all project groups and their student members." },
    { id: "attendance", title: "Meeting Attendance Report", description: "Attendance records for all scheduled project meetings." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">System Reports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start">
                <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">{report.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <a 
                href={`/api/reports?type=${report.id}&format=csv`}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                download
              >
                <FileSpreadsheet size={16} className="mr-2 text-green-600" />
                CSV
              </a>
              <a 
                href={`/api/reports?type=${report.id}&format=json`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <Download size={16} className="mr-2" />
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
