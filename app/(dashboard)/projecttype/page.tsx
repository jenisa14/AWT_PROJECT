import { prisma } from "@/app/lib/prisma";
import DeleteProjectTypeBtn from "@/app/ui/projecttype/DeleteProjectTypeBtn";
import Link from "next/link";

export default async function ProjectTypeList({
  searchParams,
}: {
  searchParams?: { msg?: string };
}) {
  const msg = searchParams?.msg;

  const types = await prisma.projecttype.findMany();

  return (
    <div style={{ padding: 20 }}>
      
      
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
          {msg === "added" && "Project Type added successfully"}
          {msg === "updated" && "Project Type updated successfully"}
          {msg === "deleted" && "Project Type deleted successfully"}
        </div>
      )}

      <h2>Project Types</h2>

      <Link href="/projecttype/add">
        <button>Add Project Type</button>
      </Link>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {types.map((t) => (
            <tr key={t.ProjectTypeID}>
              <td>{t.ProjectTypeName}</td>
              <td>{t.Description}</td>
              <td>
                <Link href={`/projecttype/edit/${t.ProjectTypeID}`}>
                  <button>Edit</button>
                </Link>

                <DeleteProjectTypeBtn id={t.ProjectTypeID} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
