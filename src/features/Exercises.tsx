import { useParams } from "react-router-dom";

//Files
import { customFetch } from "@/utils/customFetch";
import { GoBack } from "@/components";
import CreateExercise from "./CreateExercise";
import LoadingSkeleton from "@/components/LoadingSkeleton";

//Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";

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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

//React-Query
import { useQuery } from "react-query";

const Exercises = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { data: exercises, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => customFetch.get(`/target/${id}`),
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

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
                        <Button variant={"link"}>{name.toUpperCase()}</Button>
                      </DialogTrigger>
                      <CreateExercise exercise={name} />
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
export default Exercises;
