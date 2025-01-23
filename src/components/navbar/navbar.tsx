import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import ModeToggle from "../mode-toggle";
import Image from "next/image";
import logoBlack from "../../../public/imgs/logo-black.png";
import logoWhite from "../../../public/imgs/logo-white.png";
import NavbarMenu from "../navbar/navbar-menu";
import NavbarMobile from "./navbar-mobile";
import NavbarUserMenu from "./navbar-user-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { auth } from "@/auth/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="shadow-md">
      <div className="container py-3">
        <div className="flex flex-col items-center md:p-4">
          {/* Logo and Menu Button Mobile */}
          <div className="flex w-full justify-between items-center md:justify-center">
            <NavbarMobile session={session} />
            <div className="text-2xl font-bold motion-preset-slide-down">
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
                <p className="text-white dark:text-black rounded-md transition-all text-xs">
                  Cambiar tema
                </p>
              </TooltipContent>
            </Tooltip>

            <NavbarUserMenu session={session} />

            <Tooltip>
              <TooltipTrigger>
                <Link href="/favorites">
                  <Heart
                    className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-400"
                    aria-label="Perfil de usuario"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent sideOffset={2}>
                <p className="text-white dark:text-black rounded-md transition-all text-xs">
                  Favoritos
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
                <p className="text-white dark:text-black rounded-md transition-all text-xs">
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
