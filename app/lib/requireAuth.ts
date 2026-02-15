import { redirect } from "next/navigation";
import { getSession } from "./session";

/**
 * Requires authentication. Redirects to /auth/login if no session.
 * Use in layout.tsx or server components.
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  return session;
}
