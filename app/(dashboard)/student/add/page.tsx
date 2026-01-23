import Link from "next/link";
import { AddStudentAction } from "@/app/actions/student/AddStudentAction";

export default function AddStudent() {
  return (
    <div style={{ padding: "20px", maxWidth: "450px", margin: "40px auto" }}>
      <h2>Add Student</h2>

      <form action={AddStudentAction}>
        <input name="StudentName" placeholder="Student Name" />
        <input name="Email" placeholder="Email" />
        <input name="Phone" placeholder="Phone" />

        <Link href="/student">Cancel</Link>
        <button type="submit">Save Student</button>
      </form>
    </div>
  );
}
