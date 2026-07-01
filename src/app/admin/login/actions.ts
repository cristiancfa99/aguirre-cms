"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(_prev: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) return "Email o contraseña incorrectos.";
    throw error;
  }
  return undefined;
}
