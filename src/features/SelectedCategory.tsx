import { Link, useParams } from "react-router-dom";
//Files
import { customFetch } from "@/utils/customFetch";
import { GoBack } from "@/components";

//UI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

//React-Query
import { useQuery } from "react-query";
import SelectedExercise from "./SelectedExercise";

const SelectedCategory = () => {
  const { id } = useParams();
  console.log(id);

  const { data: exercises, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => customFetch.get(`/target/${id}`),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(exercises?.data);

  type state = {
    name: string;
  };

  return (
    <div>
      <GoBack />
      <div className="container px-8 my-8">
        <Table className="mb-8">
          <TableHeader>
            <TableRow>
              <TableHead>Exercises</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercises?.data.map(({ name }: state, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"link"}>{name}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Save Workout</DialogTitle>
                          <DialogDescription>
                            Add weight and reps for the selected exercise. Click
                            save when you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <SelectedExercise exercise={name} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default SelectedCategory;
