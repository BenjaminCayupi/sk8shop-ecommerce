"use client";
import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import { SheetTitle, SheetTrigger, SheetContent, Sheet } from "../ui/sheet";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function MobileProductFilter({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTitle className="hidden">Menu</SheetTitle>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter /> Filtrar
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="mt-5">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
