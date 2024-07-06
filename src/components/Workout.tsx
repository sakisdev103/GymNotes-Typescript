import { useSelector } from "react-redux";

//Types
import { Models } from "appwrite";

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
import { RootState } from "@/state/store";
const Workout = () => {
  const { workouts } = useSelector((store: RootState) => store.workout);
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

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
          {workouts.documents.map(
            (
              { username, exercise, weight, reps }: Models.Document,
              index: number
            ) => {
              if (username === loggedInUser.name) {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{exercise}</TableCell>
                    <TableCell>{weight}</TableCell>
                    <TableCell className="text-right">{reps}</TableCell>
                  </TableRow>
                );
              }
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default Workout;
