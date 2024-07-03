//Ui
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Workout = () => {
  return (
    <div className="container">
      <Table>
        <TableCaption>A list of your recent workouts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Exercise</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead className="text-right">Reps</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Lat Pull Down</TableCell>
            <TableCell>60</TableCell>
            <TableCell className="text-right">10</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default Workout;
