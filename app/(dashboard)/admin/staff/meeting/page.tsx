"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MeetingList() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projectmeeting").then(r => r.json()).then(setData);
  }, []);

  return (
    <div className="p-8">
      <h2>Meetings</h2>
      <Link href="/staff/meetings/add" className="btn">+ Add Meeting</Link>

      <table className="table">
        <tbody>
          {data.map(m => (
            <tr key={m.projectMeetingID}>
              <td>{m.meetingPurpose}</td>
              <td>{m.meetingStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
