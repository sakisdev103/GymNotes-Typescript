//File
import { UpdateExercise } from "@/features";
import { getWorkouts } from "@/state/workout/workoutSlice";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";

//React-Query
import { useQuery } from "react-query";

//Types
import { Models } from "appwrite";

//Ui
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

//Icon
import { Loader2 } from "lucide-react";

const Workout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stateDate = useSelector((state: RootState) => state.date.date);
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

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
    <div className="container my-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Exercise</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Reps</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.payload.documents?.map(
            (
              { $id, username, exercise, weight, reps, date }: Models.Document,
              index: number
            ) => {
              if (username === loggedInUser.name) {
                if (stateDate === date) {
                  return (
                    <Dialog key={index}>
                      <DialogTrigger className="hover:cursor-pointer" asChild>
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {exercise}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <p>{weight}</p>
                              <p>{weight > 1 ? "kgs" : "kg"}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <p>{reps}</p>
                              <p>{reps > 1 ? "reps" : "reps"}</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{exercise}</DialogTitle>
                          <DialogDescription>
                            Update / Delete workout.
                          </DialogDescription>
                        </DialogHeader>
                        <UpdateExercise
                          exercise={exercise}
                          weight={weight}
                          reps={reps}
                          id={$id}
                        />
                      </DialogContent>
                    </Dialog>
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
