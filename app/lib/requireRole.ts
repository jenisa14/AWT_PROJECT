import { redirect } from "next/navigation";
import { getSession } from "./session";
import type { Role } from "./session";

/**
 * Requires one of the allowed roles. Redirects to /auth/login if not authenticated,
 * or to /unauthorized if authenticated but role not allowed.
 */
export async function requireRole(allowedRoles: Role[]) {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  if (!allowedRoles.includes(session.role)) redirect("/unauthorized");
  return session;
}
