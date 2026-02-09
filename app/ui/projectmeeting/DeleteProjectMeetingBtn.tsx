"use client";

import DeleteProjectMeetingAction from "@/app/actions/projectmeeting/DeleteProjectMeetingAction";

export default function DeleteProjectMeetingBtn({ id }: { id: number }) {
  return (
    <form action={DeleteProjectMeetingAction} style={{ display: "inline-block" }}>
      <input type="hidden" name="ProjectMeetingID" value={id} />
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
