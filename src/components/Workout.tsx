import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

//File
import db from "@/appwrite/database";

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
  // const [workout, setWorkout] = useState<Models.Document[] | null>(null);

  // const init = async () => {
  //   const { documents } = await db.workouts.list();
  //   setWorkout(documents);
  // };
  // useEffect(() => {
  //   init();
  // }, []);

  const { workouts } = useSelector((store: RootState) => store.workout);
  console.log(workouts.documents);

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
            ({ username, exercise, weight, reps }: Models.Document) => {
              return (
                <TableRow key={username}>
                  <TableCell className="font-medium">{exercise}</TableCell>
                  <TableCell>{weight}</TableCell>
                  <TableCell className="text-right">{reps}</TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </div>
  );
};
export default Workout;
