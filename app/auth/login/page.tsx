"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import SimpleMessageToast from "@/app/components/SimpleMessageToast";
import { theme, styles } from "@/app/lib/theme";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<string>("");

  const registered = searchParams.get("registered") === "1";
  const logout = searchParams.get("logout") === "1";
  const successMessage = registered ? "Registered successfully. Please sign in." : logout ? "Logout successful." : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    const path =
      role === "admin"
        ? "/admin/dashboard?login=1"
        : role === "staff"
          ? "/staff/dashboard?login=1"
          : "/student/dashboard?login=1";
    router.push(path);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background, padding: theme.spacing.xl }}>
      <div style={styles.card()}>
        <h1 style={{ ...styles.title(), textAlign: "center", marginBottom: theme.spacing.sm }}>Student Project Management System</h1>
        <p style={styles.subtitle()}>Select your role to continue</p>

        {successMessage && <SimpleMessageToast message={successMessage} />}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Role" style={styles.label()}>Role</label>
            <select
              id="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.input()}
              required
            >
              <option value="">Select role...</option>
              <option value="admin">Administrator</option>
              <option value="staff">Staff / Faculty</option>
              <option value="student">Student</option>
            </select>
          </div>
          <button type="submit" style={{ ...styles.btnPrimary(), width: "100%", padding: 14, fontSize: 16, marginTop: theme.spacing.sm }}>
            Continue
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: theme.spacing.xl, fontSize: theme.font.size.sm, color: theme.colors.textMuted }}>
          New user?{" "}
          <Link href="/auth/register" style={{ color: theme.colors.primary, fontWeight: 500 }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
