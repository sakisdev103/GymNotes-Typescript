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
import { useEffect } from "react";

//React-Query
import { useQuery } from "react-query";

const Workout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  // const workouts = useSelector((store: RootState) => store.workout.documents);

  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: () => dispatch(getWorkouts()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          {data?.payload.documents?.map(
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
