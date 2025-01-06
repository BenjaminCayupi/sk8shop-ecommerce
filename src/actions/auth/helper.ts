"use server";

import { signIn as signInFunc, signOut as signOutFunc } from "@/auth/auth";

export async function signIn(email: string, password: string) {
  return await signInFunc("credentials", {
    email,
    password,
  });
}

export async function signOut() {
  await signOutFunc();
}
