import { AddStaffAction } from "@/app/actions/staff/AddStaffAction";
import Link from "next/link";


export default function AddStaff() {
  return (
    <div style={{ padding: "20px", maxWidth: "450px", margin: "40px auto" }}>
      <h2>Add Staff</h2>

      <form action={AddStaffAction}>
        <input name="StaffName" placeholder="Staff Name" />
        <input name="Email" placeholder="Email" />
        <input name="Phone" placeholder="Phone" />

        <input
            type="password"
            name="Password"
            placeholder="Password"
            required
        />


        <Link href="/staff">Cancel</Link>
        <button type="submit">Save Staff</button>
      </form>
    </div>
  );
}
