import { z } from "zod";

export const loginSchema = z.object({
  Email: z.string().min(1, "Email is required").email("Invalid email format"),
  Password: z.string().optional(),
  Role: z.enum(["admin", "staff", "student"], { message: "Select a role" }),
}).refine(
  (data) => {
    if (data.Role === "staff" || data.Role === "admin") {
      return typeof data.Password === "string" && data.Password.length > 0;
    }
    return true;
  },
  { message: "Password is required for Admin and Staff", path: ["Password"] }
);

export type LoginFormData = z.infer<typeof loginSchema>;
