import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LoadingPage() {
  return (
    <div className="container">
      <Skeleton className="w-[150px] h-[32px] rounded-md mb-8" />
      <div className="mb-3 flex flex-row justify-between">
        <div className="w-4/6 sm:w-4/6">
          <Skeleton className="w-full h-[36px] rounded-md" />
        </div>
        <div className="w-2/6 flex justify-end">
          <Skeleton className="w-[110px] h-[36px] rounded-md" />
        </div>
      </div>
      <Card className="p-5 mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={4}>
                <Skeleton className="w-full h-[30px] rounded-md" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Skeleton className="w-full h-[30px] rounded-md py-2" />
                </TableCell>
                <TableCell className="font-medium">
                  <Skeleton className="w-full h-[30px] rounded-md py-2" />
                </TableCell>
                <TableCell className="font-medium">
                  <Skeleton className="w-full h-[30px] rounded-md py-2" />
                </TableCell>
                <TableCell className="font-medium">
                  <Skeleton className="w-full h-[30px] rounded-md py-2" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex flex-row justify-between mt-4">
          <Skeleton className="w-[100px] h-[30px] rounded-md ml-2" />
          <Skeleton className="w-[100px] h-[30px] rounded-md mr-2" />
        </div>
      </Card>
    </div>
  );
}
