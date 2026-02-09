"use client";

import { DeleteProjectGroupMemberAction } from "@/app/actions/projectgroupmember/DeleteProjectGroupMemberAction";

export default function DeleteProjectGroupMemberBtn({ id }: { id: number }) {
  return (
    <form action={DeleteProjectGroupMemberAction} style={{ display: "inline-block" }}>
      <input type="hidden" name="ProjectGroupMemberID" value={id} />
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
