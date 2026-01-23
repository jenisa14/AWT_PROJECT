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
      <button type="submit" style={{ backgroundColor: "red", color: "white" }}>
        Delete
      </button>
    </form>
  );
}
