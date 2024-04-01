"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 2 characters.",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Password must be at least 2 characters.",
    }),
    email: z.string().email("Please enter a valid email address"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmations"],
  });

const RegisterForm = () => {
  // 1. Define your form.
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    axios
      .post("http://localhost:8080/api/users/register", values)
      .then((response) => {
        setError(null);
        router.push("/");
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <div className="flex justify-center mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <div className="flex flex-col md:flex-row md:gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email address ..." {...field} />
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
                  <Input
                    type="password"
                    placeholder="Password ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          {error && <FormMessage className="text-red-500">{error}</FormMessage>}
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
