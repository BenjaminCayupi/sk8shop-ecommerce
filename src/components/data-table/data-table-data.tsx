import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
const testData = [
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
  { id: 1, name: "title" },
];

export default function DataTableData() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>
            <Button variant="ghost">
              Email
              <ArrowUpDown />
            </Button>
          </TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>item.name</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
