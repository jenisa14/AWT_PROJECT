"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function GroupList() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projectgroup").then(r => r.json()).then(setData);
  }, []);

  async function remove(id: number) {
    await fetch(`/api/projectgroup/${id}`, { method: "DELETE" });
    setData(data.filter(d => d.projectGroupID !== id));
  }

  return (
    <div className="p-8">
      <h2 className="title">Project Groups</h2>
      <Link href="/admin/projectgroup/add" className="btn">+ Add Group</Link>

      <table className="table">
        <thead>
          <tr><th>Name</th><th>Title</th><th>Action</th></tr>
        </thead>
        <tbody>
          {data.map(g => (
            <tr key={g.projectGroupID}>
              <td>{g.projectGroupName}</td>
              <td>{g.projectTitle}</td>
              <td>
                <Link href={`/admin/projectgroup/edit/${g.projectGroupID}`}>Edit</Link>
                <button onClick={() => remove(g.projectGroupID)}> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
