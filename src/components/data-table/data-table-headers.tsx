"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { TableHead, TableHeader, TableRow } from "../ui/table";

interface Props {
  headers: {
    title: string;
    key: string;
  }[];
  filterFunc: (param: string) => Promise<string>;
}

export default function DataTableHeaders({ headers, filterFunc }: Props) {
  const onClickFilter = async (key: string) => {
    const res = await filterFunc(key);
    console.log("res :", res);
    return res;
  };
  return (
    <TableHeader>
      <TableRow>
        {headers.map((header) =>
          header.key ? (
            <TableHead key={header.title}>
              <Button
                variant="ghost"
                className="text-right capitalize"
                onClick={() => onClickFilter(header.key)}
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
