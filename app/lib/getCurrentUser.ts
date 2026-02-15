import { getSession } from "./session";

/**
 * Returns the current session (user) or null if not authenticated.
 * Use in server components or server actions.
 */
export async function getCurrentUser() {
  return getSession();
}
