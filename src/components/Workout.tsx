//Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getWorkouts } from "@/state/workout/workoutSlice";

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

//React-Query
import { useQuery } from "react-query";

//Icon
import { Loader2 } from "lucide-react";

const Workout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  const stateDate = useSelector((state: RootState) => state.date.date);

  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: () => dispatch(getWorkouts()),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container">
      <Table>
        <TableCaption>A list of your recent workouts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Exercise</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.payload.documents?.map(
            (
              { username, exercise, weight, reps, date }: Models.Document,
              index: number
            ) => {
              if (username === loggedInUser.name) {
                if (stateDate === date) {
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {exercise.toUpperCase()}
                      </TableCell>
                      <TableCell>{weight}</TableCell>
                      <TableCell>{reps}</TableCell>
                      <TableCell className="text-right">{date}</TableCell>
                    </TableRow>
                  );
                }
              }
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default Workout;
