import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { AddProjectMeetingAction } from "@/app/actions/projectmeeting/AddProjectMeetingAction";

export default async function AddProjectMeetingPage() {
  const groups = await prisma.projectgroup.findMany();
  const staff = await prisma.staff.findMany();

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h2>Add Project Meeting</h2>

      <form action={AddProjectMeetingAction}>
       

        <label>Project Group</label>
        <select name="ProjectGroupID" required>
          <option value="">-- Select Group --</option>
          {groups.map((g) => (
            <option key={g.ProjectGroupID} value={g.ProjectGroupID}>
              {g.ProjectGroupName}
            </option>
          ))}
        </select>

        <br /><br />

      
        <label>Guide Staff</label>
        <select name="GuideStaffID" required>
          <option value="">-- Select Staff --</option>
          {staff.map((s) => (
            <option key={s.StaffID} value={s.StaffID}>
              {s.StaffName}
            </option>
          ))}
        </select>

        <br /><br />

        <input type="datetime-local" name="MeetingDateTime" required />
        <br /><br />

        <input type="text" name="MeetingPurpose" placeholder="Purpose" required />
        <br /><br />

        <textarea name="MeetingNotes" placeholder="Notes"></textarea>
        <br /><br />

        <button type="submit">Save</button>
        <Link href="/projectmeeting"><button type="button">Cancel</button></Link>
      </form>
    </div>
  );
}
