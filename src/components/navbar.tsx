import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import ModeToggle from "./mode-toggle";
import Image from "next/image";
import logoBlack from "../../public/imgs/logo-black.png";
import logoWhite from "../../public/imgs/logo-white.png";
import NavbarMenu from "./navbar-menu";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import NavbarMobile from "./navbar-mobile";

export default function Navbar() {
  return (
    <nav className="shadow-md">
      <div className="container py-3">
        <div className="flex flex-col items-center md:p-4">
          {/* Logo and Menu Button */}
          <div className="flex w-full justify-between items-center md:justify-center">
            <NavbarMobile />
            <div className="text-2xl font-bold">
              <Link href="/">
                <Image
                  src={logoBlack}
                  alt="logo-black"
                  className="w-20 h-auto hidden dark:block"
                  priority
                />
                <Image
                  src={logoWhite}
                  alt="logo-white"
                  className="w-20 h-auto dark:hidden"
                  priority
                />
              </Link>
            </div>
            <Link href="/cart" className="md:hidden">
              <ShoppingCart
                className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
                aria-label="Carrito de compras"
              />
            </Link>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex flex-row items-center space-x-8 mt-4">
            <NavbarMenu />
          </div>
        </div>

        {/* Icons for Desktop */}
        <div className="hidden md:flex absolute top-0 right-0 mt-16 mr-4 space-x-5">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent sideOffset={2}>
                <p className="bg-black text-white rounded-md transition-all text-xs p-1 mr-9 mb-[2px]">
                  Cambiar tema
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link href="/login">
                  <User
                    className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
                    aria-label="Perfil de usuario"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent sideOffset={2}>
                <p className="bg-black text-white rounded-md transition-all text-xs p-1 mr-10 mb-[2px]">
                  Perfil
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link href="/cart">
                  <ShoppingCart
                    className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
                    aria-label="Carrito de compras"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-black text-white rounded-md transition-all text-xs p-1 mr-7 mb-[2px]">
                  Carro
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </nav>
  );
}
