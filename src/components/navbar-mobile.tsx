"use client";
import { User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

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
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-5 w-5 mr-2" />
              Perfil
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
