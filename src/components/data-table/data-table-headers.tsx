"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  headers: {
    title: string;
    key: string;
  }[];
}

export default function DataTableHeaders({ headers }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [sortDirection, setSortDirection] = useState(true);

  const onSort = (key: string) => {
    setSortDirection(!sortDirection);
    params.set("page", "1");
    params.set("sortBy", key);
    params.set("sortDirection", sortDirection ? "asc" : "desc");
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <TableHeader>
      <TableRow>
        {headers.map((header) =>
          header.key ? (
            <TableHead key={header.title}>
              <Button
                variant="ghost"
                className="text-left capitalize"
                onClick={() => onSort(header.key)}
              >
                {header.title}
                <ArrowUpDown />
              </Button>
            </TableHead>
          ) : (
            <TableHead className="w-[100px]" key={header.title}>
              {header.title}
            </TableHead>
          )
        )}
        <TableHead className="w-[100px] text-right">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  );
}
