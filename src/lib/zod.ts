import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
});

export const registerSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .refine(
      (value) =>
        /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d)).{8,}$/.test(value ?? ""),
      "Incorrect Format"
    ),
});
