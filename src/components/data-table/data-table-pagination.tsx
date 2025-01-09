"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  totalPages: number | undefined;
  currentPage: number;
}

export default function DataTablePagination({
  totalPages: totalPagesCount,
  currentPage,
}: Props) {
  const totalPages = totalPagesCount || 0;
  const pathname = usePathname();
  const router = useRouter();
  const [rowPerPage, setRowPerPage] = useState("5");

  const nextPage = () => {
    if (currentPage >= totalPages) return;

    router.push(`${pathname}/?page=${currentPage + 1}`);
  };

  const previousPage = () => {
    if (currentPage === 1) return;

    router.push(`${pathname}/?page=${currentPage - 1}`);
  };

  const onRowsChange = (value: string) => {
    setRowPerPage(value);
    router.push(`${pathname}/?page=1&take=${value}`);
  };
  return (
    <div className="flex flex-row mt-4">
      <p className="text-[10px]">Filas por pagina</p>
      <Select value={rowPerPage} onValueChange={(value) => onRowsChange(value)}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Filas por pagina" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
        </SelectContent>
      </Select>
      <Pagination className="mx-0 justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={previousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>
          <div className="hidden sm:flex">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
              <PaginationItem key={item}>
                <PaginationLink
                  href={`${pathname}/?page=${item}`}
                  isActive={currentPage === item}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
          </div>
          <div className="sm:hidden">
            <p className="text-sm">{`${currentPage} / ${totalPages}`}</p>
          </div>
          <PaginationItem>
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={nextPage}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
