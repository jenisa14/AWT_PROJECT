"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMeeting() {
  const r = useRouter();
  const [purpose, setPurpose] = useState("");

  async function save() {
    await fetch("/api/projectmeeting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingPurpose: purpose,
        meetingStatus: "Scheduled"
      }),
    });
    r.push("/staff/meetings");
  }

  return (
    <div className="p-8">
      <input className="input" placeholder="Meeting Purpose" onChange={e => setPurpose(e.target.value)} />
      <button className="btn" onClick={save}>Save</button>
    </div>
  );
}
