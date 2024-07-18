//UI
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

const LoadingSkeleton = () => {
  return (
    <div className="container px-8 mt-16 mb-8">
      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="w-1/6 h-6" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {"abcdef".split("").map((index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Button variant={"link"} asChild>
                    <Skeleton className="w-8/12 sm:w-6/12 h-6" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default LoadingSkeleton;
