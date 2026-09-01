import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function AdminLogin() {
  const { login, isLoggingIn } = useAuth();
  
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-white/60 hover:text-white flex items-center gap-2 font-bold uppercase tracking-widest text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Site
        </Link>
      </div>

      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to manage content</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((d) => login(d))} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-12 bg-gray-50" />
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
                    <Input type="password" {...field} className="h-12 bg-gray-50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-bold"
            >
              {isLoggingIn ? "Authenticating..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
