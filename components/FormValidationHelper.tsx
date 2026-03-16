"use client";

import type { z } from "zod";

export function getZodErrors<T extends z.ZodType>(schema: T, data: unknown): Record<string, { message: string }> {
  const result = schema.safeParse(data);
  if (result.success) return {};
  const errors: Record<string, { message: string }> = {};
  const flat = result.error.flatten();
  if (flat.fieldErrors) {
    for (const [key, messages] of Object.entries(flat.fieldErrors)) {
      const msg = Array.isArray(messages) ? messages[0] : messages;
      if (msg) errors[key] = { message: String(msg) };
    }
  }
  return errors;
}
