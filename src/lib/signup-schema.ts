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
    // Academic fields – conditionally required based on `type`
    programme: z.string().min(1, "Programme is required"),
    school: z.string().optional(),
    level: z.string().optional(),
    student_type: z.enum(["Undergraduate", "Postgraduate"]).optional(),
    completion_year: z
      .string()
      .regex(/^\d{4}$/, "Enter a valid year (YYYY)")
      .optional(),
    current_role: z.string().optional(),
    company: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  })
  // Conditional requirements for academic fields
  .refine(
    (data) =>
      data.type !== "Student" ||
      (!!data.student_type && !!data.school && !!data.level),
    {
      message:
        "For Student, select study level and fill school and level of study",
      path: ["type"],
    }
  )
  .refine(
    (data) =>
      data.type !== "Graduate" ||
      (!!data.completion_year && !!data.current_role && !!data.company),
    {
      message:
        "For Graduate, provide completion year, current role, and company",
      path: ["type"],
    }
  );

export type SignUpFormData = z.infer<typeof signUpSchema>;

// Step-specific schemas for validation
export const personalInfoSchema = signUpSchema.pick({
  first_name: true,
  last_name: true,
  email: true,
});

export const academicSchema = signUpSchema
  .pick({
    type: true,
    programme: true,
    school: true,
    level: true,
    student_type: true,
    completion_year: true,
    current_role: true,
    company: true,
  })
  .refine(
    (data) =>
      data.type !== "Student" ||
      (!!data.student_type && !!data.school && !!data.level),
    {
      message:
        "For Student, select study level and fill school and level of study",
      path: ["type"],
    }
  )
  .refine(
    (data) =>
      data.type !== "Graduate" ||
      (!!data.completion_year && !!data.current_role && !!data.company),
    {
      message:
        "For Graduate, provide completion year, current role, and company",
      path: ["type"],
    }
  );

export const securitySchema = signUpSchema
  .pick({
    password: true,
    confirm_password: true,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
