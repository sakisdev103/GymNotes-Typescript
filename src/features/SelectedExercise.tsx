//React-form / zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//UI
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

const SelectedExercise = () => {
  const formSchema = z.object({
    weight: z.coerce.number().min(1).max(1000),
    reps: z.coerce.number().min(1).max(1000000),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 0,
      reps: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 sm:w-2/4 lg:w-2/5">
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
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default SelectedExercise;
