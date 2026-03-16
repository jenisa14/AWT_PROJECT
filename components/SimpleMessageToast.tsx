"use client";

import { useEffect, useState } from "react";

export default function SimpleMessageToast({ message }: { message: string | null }) {
  const [show, setShow] = useState(!!message);

  useEffect(() => {
    if (message) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(t);
    }
  }, [message]);

  if (!show || !message) return null;

  return (
    <div
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
