"use client";
import { User, Menu, Heart, ShoppingCart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { useState } from "react";
import ModeToggle from "../mode-toggle";
import { signOut } from "@/actions/auth/helper";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

export default function NavbarMobile({ session }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const signOutFunc = async () => {
    setIsOpen(false);
    await signOut();
    location.reload();
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTitle className="hidden">Menu</SheetTitle>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col space-y-4 mt-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>

            <Separator />

            {session?.user.role === "user" && (
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-900 flex items-center dark:text-white dark:hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Admin
              </Link>
            )}

            {session?.user.role === "admin" && (
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900 flex items-center dark:text-white dark:hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Perfil
              </Link>
            )}
            {!session?.user && (
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 flex items-center dark:text-white dark:hover:text-gray-400"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Login
              </Link>
            )}

            <Link
              href="/favorites"
              className="text-gray-600 hover:text-gray-900 flex items-center dark:text-white dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="h-5 w-5 mr-2" />
              Favoritos
            </Link>

            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 flex items-center dark:text-white dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carro
            </Link>

            <div onClick={() => setIsOpen(false)}>
              <ModeToggle size="small" title="Cambiar tema" />
            </div>
            {session?.user && (
              <div className="flex row cursor-pointer" onClick={signOutFunc}>
                <LogOut className="h-5 w-5 mr-2 text-gray-600" />
                <p className="text-gray-600 hover:text-gray-900 cursor-pointer dark:text-white dark:hover:text-gray-400">
                  Cerrar sesión
                </p>
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
