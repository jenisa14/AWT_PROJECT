import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "spms_session";
const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "spms-default-secret-change-in-production"
);

export type Role = "ADMIN" | "STAFF" | "STUDENT";

export type SessionPayload = {
  role: Role;
  id?: number;
  email?: string;
  exp?: number;
};

const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; 

async function signSessionToken(payload: SessionPayload, maxAge = DEFAULT_MAX_AGE): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + maxAge;
  return new SignJWT({ ...payload, exp })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(maxAge)
    .sign(SECRET);
}

const HANDOFF_MAX_AGE = 60; 


export async function createHandoffToken(payload: SessionPayload): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + HANDOFF_MAX_AGE;
  return new SignJWT({ ...payload, exp })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(HANDOFF_MAX_AGE)
    .sign(SECRET);
}


export async function verifyHandoffToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    const { role, id, email } = payload as unknown as SessionPayload;
    return { role: role as Role, id, email };
  } catch {
    return null;
  }
}

export async function createSessionCookieHeader(
  payload: SessionPayload,
  maxAge = DEFAULT_MAX_AGE
): Promise<string> {
  const token = await signSessionToken(payload, maxAge);
  const secure = process.env.NODE_ENV === "production";
  const value = token.includes(",") || token.includes(";") ? `"${token}"` : token;
  const parts = [
    `${COOKIE_NAME}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

export async function createSession(payload: SessionPayload, maxAge = DEFAULT_MAX_AGE): Promise<void> {
  const token = await signSessionToken(payload, maxAge);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    const { role, id, email, exp } = payload as unknown as SessionPayload & { exp: number };
    if (exp && exp < Math.floor(Date.now() / 1000)) return null;
    return { role: role as Role, id, email };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
