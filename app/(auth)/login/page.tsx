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
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/auth";
import { useEffect } from "react";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 2 characters.",
  }),
  email: z.string().email("Please enter a valid email address"),
});

const LoginForm = () => {
  const auth = useUserStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (auth.user) router.push("/");
  }, [auth.user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    auth.login(values);
    !auth.error && router.push("/");
  };

  return (
    <div className="flex justify-center mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit">Login</Button>
          {auth.error && (
            <FormMessage className="text-red-500">{auth.error}</FormMessage>
          )}
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
