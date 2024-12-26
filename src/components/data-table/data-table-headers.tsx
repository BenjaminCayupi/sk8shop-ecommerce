"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { TableHead, TableHeader, TableRow } from "../ui/table";

interface Props {
  headers: {
    title: string;
    filterFunc?: () => void;
  }[];
}

export default function DataTableHeaders({ headers }: Props) {
  return (
    <TableHeader>
      <TableRow>
        {headers.map((header) =>
          header.filterFunc ? (
            <TableHead key={header.title}>
              <Button variant="ghost" onClick={() => header.filterFunc!()}>
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
