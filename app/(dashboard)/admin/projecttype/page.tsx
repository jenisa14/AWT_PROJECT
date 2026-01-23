"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectTypeList() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projecttype")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  async function deleteItem(id: number) {
    await fetch(`/api/projecttype/${id}`, {
      method: "DELETE",
    });
    setData(data.filter(item => item.projectTypeID !== id));
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Project Types</h2>

      <Link href="/admin/projecttype/add" className="btn mt-4 inline-block">
        + Add Project Type
      </Link>

      <table className="mt-6 w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.projectTypeID} className="text-center border">
              <td>{item.projectTypeName}</td>
              <td>{item.description}</td>
              <td>
                <Link
                  href={`/admin/projecttype/edit/${item.projectTypeID}`}
                  className="text-blue-600 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteItem(item.projectTypeID)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
