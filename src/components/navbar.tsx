"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <nav className="shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col items-center">
          {/* Logo and Menu Button */}
          <div className="flex w-full justify-between items-center md:justify-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
            <div className="text-2xl font-bold">
              <Link href="/">Mi Tienda</Link>
            </div>
            <Link href="/" className="md:hidden">
              <ShoppingCart
                className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
                aria-label="Carrito de compras"
              />
            </Link>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex flex-row items-center space-x-8 mt-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
            >
              Inicio
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
            >
              Productos
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
            >
              Contacto
            </Link>
          </div>
        </div>

        {/* Icons for Desktop */}
        <div className="hidden md:flex absolute top-0 right-0 mt-4 mr-4 space-x-4">
          <ModeToggle />
          <Link href="/">
            <User
              className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
              aria-label="Perfil de usuario"
            />
          </Link>
          <Link href="/">
            <ShoppingCart
              className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
              aria-label="Carrito de compras"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
