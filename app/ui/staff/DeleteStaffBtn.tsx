"use client";

import DeleteStaffAction from "@/app/actions/staff/DeleteStaffAction";


export default function DeleteStaffBtn({ id }: { id: number }) {
  return (
    <form action={DeleteStaffAction}>
      <input type="hidden" name="StaffID" defaultValue={id} />

      <button
        type="submit"
        style={{
          backgroundColor: "#dc2626",
          color: "white",
          padding: "6px 10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </form>
  );
}
