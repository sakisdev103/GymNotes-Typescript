import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";

//File
import { loginUser, logoutUser } from "@/state/Auth/AuthSlice";

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

const Login = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  const formSchema = z.object({
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
      .min(1, {
        message: "Please provide a password",
      })
      .max(20, {
        message: "Password is too long",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(loginUser(values));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 sm:w-2/4 lg:w-2/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              Login
            </Button>
          </form>
        </Form>
        <p>
          Don't have an account?
          <Button variant="link" asChild>
            <Link to="/register">Register</Link>
          </Button>
        </p>
        {/* <Button onClick={() => dispatch(logoutUser())}>log out</Button> */}
      </div>
    </div>
  );
};
export default Login;
