//File
import { UpdateExercise } from "@/features";

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
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

//React-Query
import { useQuery } from "react-query";

//Icon
import { Loader2, Pencil, Trash2 } from "lucide-react";

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
    <div className="container my-8">
      <Table>
        <TableCaption>A list of your recent workouts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Exercise</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right"></TableHead>
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
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {exercise.toUpperCase()}
                      </TableCell>
                      <TableCell>{weight}</TableCell>
                      <TableCell>{reps}</TableCell>
                      <TableCell>{date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant={"ghost"}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <UpdateExercise
                              exercise={exercise}
                              weight={weight}
                              reps={reps}
                              id={$id}
                            />
                          </Dialog>
                          <Button variant={"destructive"}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
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
