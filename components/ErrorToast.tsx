"use client";

import { useEffect, useState } from "react";

export default function ErrorToast({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss?: () => void;
}) {
  const [show, setShow] = useState(!!message);

  useEffect(() => {
    if (message) {
      setShow(true);
      const t = setTimeout(() => {
        setShow(false);
        onDismiss?.();
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [message, onDismiss]);

  if (!show || !message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 10000,
        minWidth: "280px",
        maxWidth: "400px",
        padding: "14px 18px",
        backgroundColor: "#b91c1c",
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
