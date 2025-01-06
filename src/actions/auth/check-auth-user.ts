"use server";

import prisma from "@/lib/prisma";
import { User } from "next-auth";
import bcryptjs from "bcryptjs";

export async function checkAuthUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    /* Check if the user exist */

    const existUser = await prisma.user.findUnique({ where: { email } });

    if (!existUser) return null;

    /* Check if the password match */

    if (!bcryptjs.compareSync(password, existUser.password)) return null;

    const { id, name, email: userEmail } = existUser;

    return {
      id,
      name,
      email: userEmail,
    } as User;
  } catch (error) {
    console.log("error :", error);
    return null;
  }
}
