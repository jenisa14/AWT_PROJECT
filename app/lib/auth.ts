import { redirect } from "next/navigation";
import { getSession, destroySession, type Role } from "./session";

export { getSession, destroySession, type Role } from "./session";

export async function requireSession(allowedRoles?: Role[]): Promise<{ role: Role; id?: number; email?: string }> {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
    redirect("/auth/login");
  }
  return session;
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/auth/login");
}
