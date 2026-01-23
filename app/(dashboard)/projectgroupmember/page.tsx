import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import DeleteProjectGroupMemberBtn from "@/app/ui/projectgroupmember/DeleteProjectGroupMemberBtn";

export default async function ProjectGroupMemberList({
  searchParams,
}: {
  searchParams?: { msg?: string };
}) {
  const msg = searchParams?.msg;

  const members = await prisma.projectgroupmember.findMany();

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      
      {/* SUCCESS MESSAGE */}
      {msg && (
        <div style={{
          backgroundColor: "#16a34a",
          color: "white",
          padding: 8,
          marginBottom: 10,
          borderRadius: 4,
        }}>
          {msg === "added" && "Project group member added successfully"}
          {msg === "updated" && "Project group member updated successfully"}
          {msg === "deleted" && "Project group member deleted successfully"}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Project Group Members</h2>

        <Link href="/projectgroupmember/add">
          <button>Add Member</button>
        </Link>
      </div>

      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>ProjectGroupID</th>
            <th>StudentID</th>
            <th>Leader</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) => (
            <tr key={m.ProjectGroupMemberID}>
              <td>{m.ProjectGroupID}</td>
              <td>{m.StudentID}</td>
              <td>{m.IsGroupLeader ? "Yes" : "No"}</td>
              <td>
                <Link href={`/projectgroupmember/edit/${m.ProjectGroupMemberID}`}>
                  <button>Edit</button>
                </Link>
                <DeleteProjectGroupMemberBtn id={m.ProjectGroupMemberID} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
