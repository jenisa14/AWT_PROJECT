"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProjectType() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  async function handleSubmit() {
    await fetch("/api/projecttype", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectTypeName: name,
        description: desc,
      }),
    });

    router.push("/admin/projecttype");
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">Add Project Type</h2>

      <input
        placeholder="Project Type Name"
        className="input"
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Description"
        className="input"
        onChange={e => setDesc(e.target.value)}
      />

      <button onClick={handleSubmit} className="btn mt-4">
        Save
      </button>
    </div>
  );
}
