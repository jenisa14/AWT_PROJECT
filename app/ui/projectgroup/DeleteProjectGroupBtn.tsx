"use client";

import DeleteProjectGroupAction from "@/app/actions/projectgroup/DeleteProjectGroupAction";

export default function DeleteProjectGroupBtn({ id }: { id: number }) {
  return (
    <form action={DeleteProjectGroupAction}>
      <input type="hidden" name="ProjectGroupID" value={id} />
      <button type="submit">Delete</button>
    </form>
  );
}
