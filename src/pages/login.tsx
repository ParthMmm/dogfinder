import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { login, loginSchema } from "~/lib/api/client";
import { useRouter } from "next/router";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useSetAtom } from "jotai";
import { currentUserAtom, isAuthenticatedAtom } from "~/store/app";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const setAuthenticated = useSetAtom(isAuthenticatedAtom);
  const setUser = useSetAtom(currentUserAtom);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (_, variables) => {
      setAuthenticated(true);
      setUser(variables);
      await router.push("/home");
    },
    onError: (error: Error) => {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    const parseRes = loginSchema.safeParse(data);
    if (!parseRes.success) {
      toast.error("Invalid login data");
      return;
    }

    loginMutation.mutate(data);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to DogFinder" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Card className="min-w-[400px]">
            <CardHeader>
              <CardTitle className="text-2xl">
                <h1>Login</h1>
              </CardTitle>
              <CardDescription>Enter your login info below</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="John Doe"
                            {...field}
                          />
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
                          <Input
                            {...field}
                            type="email"
                            placeholder="john@acme.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant={"secondary"}
                    type="submit"
                    className="w-full"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
