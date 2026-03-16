"use client";

import { useEffect, useState } from "react";

type MsgType = "added" | "updated" | "deleted";

const labels: Record<MsgType, string> = {
  added: "added successfully",
  updated: "updated successfully",
  deleted: "deleted successfully",
};

export default function SuccessToast({
  msg,
  entityName,
}: {
  msg?: string | null;
  entityName: string;
}) {
  const [show, setShow] = useState(false);
  const typedMsg = msg as MsgType | undefined;

  useEffect(() => {
    if (typedMsg && (typedMsg === "added" || typedMsg === "updated" || typedMsg === "deleted")) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(t);
    }
  }, [typedMsg]);

  if (!show || !typedMsg || !labels[typedMsg]) return null;

  const message = `${entityName} ${labels[typedMsg]}`;

  return (
    <div
      className="success-toast"
      role="alert"
      aria-live="polite"
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        minWidth: "280px",
        maxWidth: "400px",
        padding: "14px 18px",
        backgroundColor: "#16a34a",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        fontSize: "14px",
        fontWeight: 500,
        animation: "successToastIn 0.3s ease-out",
      }}
    >
      {message}
    </div>
  );
}
