"use server";

import { AuthError } from "next-auth";
import { signIn } from "../auth";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

// ...

const prisma = new PrismaClient();

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

// Validation schema
const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(40, "Name cannot exceed 40 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .max(40, "Email cannot exceed 40 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(255, "Password is too long"),
  })
  .refine((data) => data.password.length >= 6, {
    message: "Password must be at least 6 characters",
    path: ["password"],
  });

export async function registerUser(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // Extract form data
    const rawFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Validate form data
    const validatedFields = RegisterSchema.safeParse(rawFormData);

    // Check validation
    if (!validatedFields.success) {
      return validatedFields.error.errors[0].message;
    }

    const { name, email, password } = validatedFields.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return "Email already in use";
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Redirect to login page
    //redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);
    return "An unexpected error occurred";
  }
}
