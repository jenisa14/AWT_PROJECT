"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProjectType({ params }: any) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetch(`/api/projecttype/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.projectTypeName);
        setDesc(data.description);
      });
  }, []);

  async function updateData() {
    await fetch(`/api/projecttype/${params.id}`, {
      method: "PUT",
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
      <h2 className="text-xl font-bold">Edit Project Type</h2>

      <input
        value={name}
        className="input"
        onChange={e => setName(e.target.value)}
      />

      <input
        value={desc}
        className="input"
        onChange={e => setDesc(e.target.value)}
      />

      <button onClick={updateData} className="btn mt-4">
        Update
      </button>
    </div>
  );
}
