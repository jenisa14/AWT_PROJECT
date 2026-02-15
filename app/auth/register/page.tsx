"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { RegisterAction } from "@/app/actions/auth/RegisterAction";
import ErrorToast from "@/app/components/ErrorToast";
import { theme, styles } from "@/app/lib/theme";

function RegisterForm() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const [role, setRole] = useState<string>("staff");
  const [clientError, setClientError] = useState<string | null>(null);
  const error = urlError ?? clientError;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClientError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("Name")?.toString()?.trim();
    const email = formData.get("Email")?.toString()?.trim();
    const phone = formData.get("Phone")?.toString()?.trim();
    const password = formData.get("Password")?.toString();
    const roleValue = formData.get("Role")?.toString() || "staff";

    if (!name || !email || !phone) {
      setClientError("Name, Email and Phone are required.");
      return;
    }
    if (roleValue === "staff" && (!password || !password.trim())) {
      setClientError("Password is required for Staff and cannot be empty.");
      return;
    }

    RegisterAction(formData).catch((err) => {
      setClientError(err instanceof Error ? err.message : "Registration failed.");
    });
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background, padding: theme.spacing.xl }}>
      <div style={styles.card()}>
        <h1 style={{ ...styles.title(), textAlign: "center", marginBottom: theme.spacing.sm }}>Register</h1>
        <p style={styles.subtitle()}>Create an account (Staff or Student)</p>

        {error && <ErrorToast message={error} />}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Role" style={styles.label()}>Role</label>
            <select
              id="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.input()}
              name="Role"
            >
              <option value="staff">Staff / Faculty</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Name" style={styles.label()}>{role === "staff" ? "StaffName" : "StudentName"}</label>
            <input
              id="Name"
              name="Name"
              type="text"
              placeholder={role === "staff" ? "e.g. Dr. Gopi Salghani" : "e.g. Jenisa Vasani"}
              style={styles.input()}
              required
            />
          </div>

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Email" style={styles.label()}>Email</label>
            <input id="Email" name="Email" type="email" placeholder="e.g. gopi@gmail.com" style={styles.input()} required />
          </div>

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label htmlFor="Phone" style={styles.label()}>Phone</label>
            <input id="Phone" name="Phone" type="text" placeholder="e.g. 9876543210" style={styles.input()} maxLength={15} required />
          </div>

          {role === "staff" && (
            <div style={{ marginBottom: theme.spacing.lg }}>
              <label htmlFor="Password" style={styles.label()}>Password (required)</label>
              <input
                id="Password"
                name="Password"
                type="password"
                placeholder="e.g. gopi@123"
                style={styles.input()}
                required
                minLength={1}
              />
              <p style={{ fontSize: 12, color: theme.colors.textMuted, marginTop: 4 }}>Staff table requires non-empty password.</p>
            </div>
          )}

          <button type="submit" style={{ ...styles.btnPrimary(), width: "100%", padding: 14, fontSize: 16, marginTop: theme.spacing.sm }}>
            Register
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: theme.spacing.xl, fontSize: theme.font.size.sm, color: theme.colors.textMuted }}>
          Already have an account?{" "}
          <Link href="/auth/login" style={{ color: theme.colors.primary, fontWeight: 500 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>Loading…</div>}>
      <RegisterForm />
    </Suspense>
  );
}
