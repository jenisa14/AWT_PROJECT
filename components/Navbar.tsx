"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between">
      <span className="font-bold">SPMS</span>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
