"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function DataTableFilter() {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState("");

  const search = () => {
    if (value.trim() !== "") {
      return router.push(`${pathname}/?query=${value}`);
    }
    router.push(`${pathname}`);
  };

  const clearFilters = () => {
    setValue("");
    router.push(`${pathname}`);
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
      <Button variant="secondary" className="ml-2" onClick={clearFilters}>
        <X />
      </Button>
    </div>
  );
}
