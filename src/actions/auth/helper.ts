"use server";

import { signIn as signInFunc, signOut as signOutFunc } from "@/auth/auth";

export async function signIn(email: string, password: string) {
  try {
    await signInFunc("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      ok: true,
      message: "Login exitoso",
    };
  } catch (error) {
    console.log("error :", error);
    return { ok: false, message: "Credenciales Inválidas" };
  }
}

export async function signOut() {
  await signOutFunc();
}
