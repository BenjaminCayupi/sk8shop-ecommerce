"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export default function DataTableFilter() {
  return (
    <div className="flex flex-row">
      <Input
        type="text"
        placeholder="Filtrar"
        className="mr-2"
        /* value={value}
        onChange={onChangeFunc} */
      />
      <Button type="submit">
        <Search />
      </Button>
    </div>
  );
}
