"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditGroup({ params }: any) {
  const r = useRouter();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`/api/projectgroup/${params.id}`)
      .then(r => r.json())
      .then(d => {
        setName(d.projectGroupName);
        setTitle(d.projectTitle);
      });
  }, []);

  async function update() {
    await fetch(`/api/projectgroup/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectGroupName: name,
        projectTitle: title
      }),
    });
    r.push("/admin/projectgroup");
  }

  return (
    <div className="p-8">
      <input value={name} className="input" onChange={e => setName(e.target.value)} />
      <input value={title} className="input" onChange={e => setTitle(e.target.value)} />
      <button className="btn" onClick={update}>Update</button>
    </div>
  );
}
