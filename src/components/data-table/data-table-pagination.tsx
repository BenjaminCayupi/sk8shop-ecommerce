import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function DataTablePagination() {
  return (
    <div className="flex flex-row mt-4">
      <p className="text-[10px]">Filas por pagina</p>
      <Select value="5">
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
            <PaginationLink href="#">
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
          <div className="hidden sm:flex">
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </div>
          <div className="sm:hidden">
            <p className="text-sm">2 / 10</p>
          </div>
          <PaginationItem>
            <PaginationLink href="#">
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
