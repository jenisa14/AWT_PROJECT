import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import DeleteProjectGroupBtn from "@/app/ui/projectgroup/DeleteProjectGroupBtn";

export default async function ProjectGroupList({
  searchParams,
}: {
  searchParams?: { msg?: string };
}) {
  const msg = searchParams?.msg;

  const groups = await prisma.projectgroup.findMany();

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>

     
      {msg && (
        <div
          style={{
            backgroundColor: "#16a34a",
            color: "white",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
          }}
        >
          {msg === "added" && "Project Group added successfully"}
          {msg === "updated" && "Project Group updated successfully"}
          {msg === "deleted" && "Project Group deleted successfully"}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Project Groups</h2>

        <Link href="/projectgroup/add">
          <button>Add Project Group</button>
        </Link>
      </div>

      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {groups.map((g) => (
            <tr key={g.ProjectGroupID}>
              <td>{g.ProjectGroupName}</td>
              <td>{g.ProjectTitle}</td>
              <td>
                <Link href={`/projectgroup/${g.ProjectGroupID}`}>
                  <button>Details</button>
                </Link>

                <Link href={`/projectgroup/edit/${g.ProjectGroupID}`}>
                  <button>Edit</button>
                </Link>

                <DeleteProjectGroupBtn id={g.ProjectGroupID} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
