"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function DataTableFilter() {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState("");

  const search = () => {
    router.push(`${pathname}/?query=${value}`);
  };

  return (
    <div className="flex flex-row">
      <Input
        type="text"
        placeholder="Filtrar"
        className="mr-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={search}>
        <Search />
      </Button>
    </div>
  );
}
