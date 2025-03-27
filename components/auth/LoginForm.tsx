"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/useAuthStore";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Mail, Lock, LogIn, User } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Masukkan email yang valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const success = await login(data.email, data.password);
    if (success) {
      router.push("/tasks");
    }
  };

  const loginAsDemoUser = async () => {
    const success = await login("user@example.com", "password");
    if (success) {
      router.push("/tasks");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground mt-2">
          Login to access your account
        </p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <p className="text-sm font-medium mb-2">Demo Account:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1 text-blue-800" />
                  <span className="font-semibold">Email:</span>
                </div>
                <div>user@example.com</div>
                <div className="flex items-center">
                  <Lock className="h-3 w-3 mr-1 text-blue-800" />
                  <span className="font-semibold">Password:</span>
                </div>
                <div>password</div>
              </div>
            </AlertDescription>
          </Alert>

          <Button
            variant="outline"
            className="w-full mb-6"
            onClick={loginAsDemoUser}
            disabled={isLoading}
          >
            <User className="mr-2 h-4 w-4" />
            Login with Demo Account
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        {...field}
                        className="border-input bg-background"
                      />
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
                    <FormLabel className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••"
                        {...field}
                        className="border-input bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center pt-1 pb-4">
          <div className="text-center text-sm text-muted-foreground">
            <span>Don&apos;t have an account?</span>{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Create an account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
