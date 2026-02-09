"use client";

import DeleteProjectTypeAction from "@/app/actions/projecttype/DeleteProjectTypeAction";



export default function DeleteProjectTypeBtn({ id }: { id: number }) {
  return (
    <form action={DeleteProjectTypeAction} style={{ display: "inline-block" }}>
      <input type="hidden" name="id" value={id} />
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
