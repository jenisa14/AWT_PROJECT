"use client";

import DeleteProjectMeetingAction from "@/app/actions/projectmeeting/DeleteProjectMeetingAction";

export default function DeleteProjectMeetingBtn({ id }: { id: number }) {
  return (
    <form action={DeleteProjectMeetingAction}>
      <input type="hidden" name="ProjectMeetingID" value={id} />
      <button type="submit">Delete</button>
    </form>
  );
}
