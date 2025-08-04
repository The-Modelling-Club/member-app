import { z } from "zod";

export const signUpSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirm_password: z.string().min(1, "Please confirm your password"),
    type: z.enum(["Graduate", "Student"]),
    school: z.string().min(1, "School/Institution is required"),
    programme: z.string().min(1, "Programme is required"),
    level: z.string().min(1, "Level is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

// Step-specific schemas for validation
export const personalInfoSchema = signUpSchema.pick({
  first_name: true,
  last_name: true,
  email: true,
});

export const academicSchema = signUpSchema.pick({
  type: true,
  school: true,
  programme: true,
  level: true,
});

export const securitySchema = signUpSchema
  .pick({
    password: true,
    confirm_password: true,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
