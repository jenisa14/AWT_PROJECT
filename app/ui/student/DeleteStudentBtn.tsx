"use client";

import DeleteStudentAction from "@/app/actions/student/DeleteStudentAction";

export default function DeleteStudentBtn({ id }: { id: number }) {
  return (
    <form action={DeleteStudentAction}>
      <input type="hidden" name="StudentID" defaultValue={id} />

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
