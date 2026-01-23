import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function ProjectGroupDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ MUST await params
  const { id } = await params;

  const groupId = Number(id);

  if (!groupId || Number.isNaN(groupId)) {
    return <h2>Invalid Project Group ID</h2>;
  }

  const group = await prisma.projectgroup.findUnique({
    where: {
      ProjectGroupID: groupId,
    },
  });

  if (!group) {
    return <h2>Project Group Not Found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Project Group Details</h2>

      <p><b>Name:</b> {group.ProjectGroupName}</p>
      <p><b>Title:</b> {group.ProjectTitle}</p>
      <p><b>Area:</b> {group.ProjectArea ?? "N/A"}</p>

      <Link href="/projectgroup">
        <button>Back</button>
      </Link>
    </div>
  );
}
