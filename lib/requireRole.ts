import { redirect } from "next/navigation";
import { getSession } from "./session";
import type { Role } from "./session";


export async function requireRole(allowedRoles: Role[]) {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  if (!allowedRoles.includes(session.role)) redirect("/unauthorized");
  return session;
}
