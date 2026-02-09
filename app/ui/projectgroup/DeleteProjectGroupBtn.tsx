"use client";

import DeleteProjectGroupAction from "@/app/actions/projectgroup/DeleteProjectGroupAction";

export default function DeleteProjectGroupBtn({ id }: { id: number }) {
  return (
    <form action={DeleteProjectGroupAction} style={{ display: "inline-block" }}>
      <input type="hidden" name="ProjectGroupID" value={id} />
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
