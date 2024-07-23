//File
import { updateWorkout, deleteWorkout } from "@/state/workout/workoutSlice";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";

//React-Query
import { useQueryClient, useMutation } from "react-query";

//React-form / zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//UI
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type state = {
  exercise: string;
  weight: number;
  reps: number;
  id: string;
};

const UpdateExercise = ({ exercise, weight, reps, id }: state) => {
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  const { date } = useSelector((state: RootState) => state.date);

  const dispatch = useDispatch<AppDispatch>();

  const queryClient = useQueryClient();

  const { mutate: update } = useMutation({
    mutationFn: (payload: z.infer<typeof formSchema>) =>
      dispatch(updateWorkout({ id, payload })),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["data"] }),
  });

  const { mutate: deleteSelectedWorkout } = useMutation({
    mutationFn: (id: string) => dispatch(deleteWorkout(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["data"] }),
  });

  const formSchema = z.object({
    username: z.string(),
    exercise: z.string(),
    weight: z.coerce.number().min(1).max(1000),
    reps: z.coerce.number().min(1).max(1000000),
    date: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: loggedInUser.name,
      exercise: exercise,
      weight: weight,
      reps: reps,
      date,
    },
  });

  const onSubmit = (payload: z.infer<typeof formSchema>) => {
    update(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reps</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-evenly items-center">
          <DialogClose asChild>
            <Button type="submit">Update</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant={"destructive"}
              onClick={() => deleteSelectedWorkout(id)}
            >
              Delete
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};
export default UpdateExercise;
