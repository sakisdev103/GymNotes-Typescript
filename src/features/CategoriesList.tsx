//UI
import { GoBack } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Categories = () => {
  return (
    <div className="container">
      <GoBack />
      <Table className="w-1/2">
        <TableHeader>
          <TableRow>
            <TableHead>Categories</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Abs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Back</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default Categories;
