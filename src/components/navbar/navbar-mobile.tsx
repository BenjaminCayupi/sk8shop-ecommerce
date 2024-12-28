"use client";
import { User, Menu, Heart, ShoppingCart } from "lucide-react";
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

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
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

            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 flex items-center dark:text-white dark:hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-5 w-5 mr-2" />
              Perfil
            </Link>
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

            <ModeToggle size="small" title="Cambiar tema" />
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
