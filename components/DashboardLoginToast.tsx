"use client";

import { useSearchParams } from "next/navigation";
import SimpleMessageToast from "./SimpleMessageToast";

export default function DashboardLoginToast() {
  const searchParams = useSearchParams();
  const showLogin = searchParams.get("login") === "1";
  return showLogin ? <SimpleMessageToast message="Login successful." /> : null;
}
