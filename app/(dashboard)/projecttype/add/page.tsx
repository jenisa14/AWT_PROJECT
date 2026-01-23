import { AddProjectTypeAction } from "@/app/actions/projecttype/AddProjectTypeAction";
import Link from "next/link";

export default function AddProjectType() {
  return (
    <form action={AddProjectTypeAction}>
      <h2>Add Project Type</h2>

      <input
        type="text"
        name="ProjectTypeName"
        placeholder="Project Type Name"
        required
      />

      <input
        type="text"
        name="Description"
        placeholder="Description"
      />

      <button type="submit">Save</button>

      <Link href="/projecttype">
        <button type="button">Cancel</button>
      </Link>
    </form>
  );
}
