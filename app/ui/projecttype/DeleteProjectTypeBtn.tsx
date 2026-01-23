"use client";

import DeleteProjectTypeAction from "@/app/actions/projecttype/DeleteProjectTypeAction";



export default function DeleteProjectTypeBtn({ id }: { id: number }) {
  return (
    <form action={DeleteProjectTypeAction} style={{ display: "inline" }}>
      <input type="hidden" name="id" value={id} />
      <button type="submit">Delete</button>
    </form>
  );
}
