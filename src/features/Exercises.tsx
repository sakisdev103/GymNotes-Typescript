import { useLocation } from "react-router-dom";

//Files
import { GoBack } from "@/components";
import CreateExercise from "./CreateExercise";

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

const Exercises = () => {
  const { state } = useLocation();
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
            {state?.exercises?.map((item: string, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"link"} className="px-0">
                          {item}
                        </Button>
                      </DialogTrigger>
                      <CreateExercise exercise={item} />
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
