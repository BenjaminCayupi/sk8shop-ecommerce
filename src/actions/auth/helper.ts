"use server";

import { signIn as signInFunc, signOut as signOutFunc } from "@/auth/auth";

export async function signIn() {
  await signInFunc();
}

export async function signOut() {
  await signOutFunc();
}
