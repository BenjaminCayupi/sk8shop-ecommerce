"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { TableHead, TableHeader, TableRow } from "../ui/table";

interface Props {
  headers: {
    title: string;
    key: string;
  }[];
}

export default function DataTableHeaders({ headers }: Props) {
  return (
    <TableHeader>
      <TableRow>
        {headers.map((header) =>
          header.key ? (
            <TableHead key={header.title}>
              <Button variant="ghost" className="text-left capitalize px-0">
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
