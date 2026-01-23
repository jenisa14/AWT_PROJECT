"use client";

import { DeleteProjectGroupMemberAction } from "@/app/actions/projectgroupmember/DeleteProjectGroupMemberAction";

export default function DeleteProjectGroupMemberBtn({ id }: { id: number }) {
  return (
    <form action={DeleteProjectGroupMemberAction} style={{ display: "inline" }}>
      <input type="hidden" name="ProjectGroupMemberID" value={id} />
      <button type="submit">Delete</button>
    </form>
  );
}
