"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddGroup() {
  const r = useRouter();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  async function save() {
    await fetch("/api/projectgroup", {
      method: "POST",
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
      <input className="input" placeholder="Group Name" onChange={e => setName(e.target.value)} />
      <input className="input" placeholder="Project Title" onChange={e => setTitle(e.target.value)} />
      <button className="btn" onClick={save}>Save</button>
    </div>
  );
}
