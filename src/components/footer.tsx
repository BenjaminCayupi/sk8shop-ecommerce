import Image from "next/image";
import logoBlack from "../../public/imgs/logo-black.png";
import logoWhite from "../../public/imgs/logo-white.png";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <div className="border-t border-gray-300 dark:border-gray-600 text-slate-700 dark:text-slate-200 mt-[25vh]">
      <div className="container grid grid-cols-1 sm:grid-cols-3 mt-8 mb-8">
        <div className="p-2">
          <Image
            src={logoBlack}
            alt="logo-black"
            className="w-20 h-auto hidden dark:block"
          />
          <Image
            src={logoWhite}
            alt="logo-white"
            className="w-20 h-auto dark:hidden"
          />
          <p className="font-extralight mt-2">
            SK8 ECOMMERCE - 2024 todos los derechos reservados
          </p>
        </div>
        <div className="p-2">
          <h3 className="font-semibold">About us</h3>
          <ul>
            <li>Sobre nosotros</li>
            <li>Contacto</li>
            <li>Envíos</li>
          </ul>
        </div>
        <div className="p-2">
          <h3 className="font-semibold">Sociales</h3>
          <div className="flex flex-row">
            <Button variant="ghost" size="icon">
              <Instagram />
            </Button>
            <Button variant="ghost" size="icon">
              <Facebook />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
