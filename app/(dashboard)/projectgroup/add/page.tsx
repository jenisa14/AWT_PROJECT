import { AddProjectGroupAction } from "@/app/actions/projectgroup/AddProjectGroupAction";
import Link from "next/link";

export default function AddProjectGroup() {
  return (
    <form action={AddProjectGroupAction}>
      <h2>Add Project Group</h2>

      <input name="ProjectGroupName" placeholder="Group Name" required />
      <input name="ProjectTitle" placeholder="Project Title" required />
      <input name="ProjectTypeID" type="number" placeholder="Project Type ID" required />
      <input name="ConvenerStaffID" type="number" placeholder="Convener Staff ID" required />
      <input name="ExpertStaffID" type="number" placeholder="Expert Staff ID" />
      <input name="ProjectArea" placeholder="Project Area" />

      <button type="submit">Save</button>
      <Link href="/projectgroup"><button type="button">Cancel</button></Link>
    </form>
  );
}
