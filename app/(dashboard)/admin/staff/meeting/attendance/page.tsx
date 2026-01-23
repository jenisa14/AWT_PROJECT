"use client";
import { useState } from "react";

export default function Attendance() {
  const [present, setPresent] = useState(true);

  async function save() {
    await fetch("/api/projectmeetingattendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectMeetingID: 1,
        studentID: 1,
        isPresent: present
      }),
    });
  }

  return (
    <div className="p-8">
      <button className="btn" onClick={save}>
        Mark Attendance
      </button>
    </div>
  );
}
