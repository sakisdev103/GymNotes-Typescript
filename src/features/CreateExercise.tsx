//File
import { create } from "@/state/workout/workoutSlice";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";

//React-form / zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//UI
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const CreateExercise = ({ exercise }: { exercise: string }) => {
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  const { date } = useSelector((state: RootState) => state.date);

  const dispatch = useDispatch<AppDispatch>();

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
      weight: 0,
      reps: 0,
      date,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(create(values));
  };

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{exercise}</DialogTitle>
          <DialogDescription>Add workout details.</DialogDescription>
        </DialogHeader>
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
            <DialogClose asChild>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </>
  );
};
export default CreateExercise;
