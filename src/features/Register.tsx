import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//File
import { registerUser } from "@/state/Auth/AuthSlice";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";

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

const Register = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  const formSchema = z.object({
    username: z
      .string()
      .min(1, { message: "Please provide username" })
      .max(30, { message: "Username is too long" }),
    email: z
      .string()
      .min(1, {
        message: "Please provide an email",
      })
      .max(30, {
        message: "Email is too long",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password must be over 8 characters",
      })
      .max(265, {
        message: "Password is too long",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(registerUser(values));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 sm:w-2/4 lg:w-2/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </Form>
        <p>
          You have an account?
          <Button variant="link" asChild>
            <Link to="/GymNotes-Typescript/login">Login</Link>
          </Button>
        </p>
      </div>
    </div>
  );
};
export default Register;
