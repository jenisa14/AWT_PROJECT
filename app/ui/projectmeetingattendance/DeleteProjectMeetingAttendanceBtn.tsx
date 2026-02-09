"use client";

import { DeleteProjectMeetingAttendanceAction } from "@/app/actions/projectmeetingattendance/DeleteProjectMeetingAttendanceAction";

export default function DeleteProjectMeetingAttendanceBtn({
  id,
}: {
  id: number;
}) {
  return (
    <form action={DeleteProjectMeetingAttendanceAction}>
      <input
        type="hidden"
        name="ProjectMeetingAttendanceID"
        value={id}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#dc2626",
          color: "white",
          padding: "6px 10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        Delete
      </button>
    </form>
  );
}
