"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

 
    document.cookie = `role=${role}; path=/`;

   
    if (role === "admin") router.push("/admin");
    if (role === "staff") router.push("/staff/dashboard");
    if (role === "student") router.push("/student/dashboard");
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select
            className="form-select mb-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Administrator</option>
            <option value="staff">Staff</option>
            <option value="student">Student</option>
          </select>

          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
