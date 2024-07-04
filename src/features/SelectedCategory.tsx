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

const SelectedCategory = () => {
  return (
    <div className="container">
      <GoBack />
      <Table className="w-1/2">
        <TableHeader>
          <TableRow>
            <TableHead>Exercises</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Bench Press</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Incline bench press</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default SelectedCategory;
