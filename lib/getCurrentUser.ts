import { getSession } from "./session";


export async function getCurrentUser() {
  return getSession();
}
