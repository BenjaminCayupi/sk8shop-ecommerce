"use client";
import { User, User2, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "@/actions/auth/helper";
import { Session } from "next-auth";
import { useState } from "react";

interface Props {
  session: Session | null;
}

export default function NavbarUserMenu({ session }: Props) {
  const [open, setOpen] = useState(false);

  const signOutFunc = async () => {
    setOpen(false);
    await signOut();
    location.reload();
  };
  return (
    <DropdownMenu open={open} onOpenChange={(value) => setOpen(value)}>
      <DropdownMenuTrigger>
        <User
          className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
          aria-label="Perfil de usuario"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {session?.user ? (
          <>
            <DropdownMenuItem onClick={() => setOpen(false)}>
              <Link href="/profile" className="flex row justify-center">
                <User2 size={20} className="mr-2" />
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOutFunc}>
              <div className="flex row justify-center cursor-pointer">
                <LogOut size={20} className="mr-2" />
                Cerrar sesión
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => setOpen(false)}>
            <Link href="/login" className="flex row justify-center">
              <User2 size={20} className="mr-2" />
              Login
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
