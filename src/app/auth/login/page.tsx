// src/app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, Mail, KeyRound } from "lucide-react";
import { WheelTaxiLogo } from "@/components/app/wheel-taxi-logo";

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, ingresa un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful login
      if (typeof window !== "undefined") {
        // Simulate successful login for any email/password for now
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.email); 
      }
      toast({
        title: "Inicio de Sesión Exitoso",
        description: "¡Bienvenido de nuevo!",
      });
      router.push("/"); 
      router.refresh(); 
    }, 1500);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-slate-900/95 p-4">
      <Card className="w-full max-w-md shadow-2xl border-border/50 rounded-xl bg-card">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-3">
            <WheelTaxiLogo className="h-10 w-10 text-primary" />
            <CardTitle className="text-3xl font-bold text-primary">WheelTaxi</CardTitle>
          </div>
          <CardDescription className="text-card-foreground/80">Ingresa a tu cuenta para continuar.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground"><Mail className="mr-2 h-4 w-4"/>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@correo.com" {...field} className="bg-input border-border focus:ring-primary rounded-md text-base text-foreground" />
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
                    <FormLabel className="flex items-center text-muted-foreground"><KeyRound className="mr-2 h-4 w-4"/>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="bg-input border-border focus:ring-primary rounded-md text-base text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-lg py-3 rounded-md" variant="default" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
                {isLoading ? "Ingresando..." : "Ingresar"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center p-6 pt-0">
          <p className="text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="font-medium text-primary hover:underline">
              Regístrate aquí
            </Link>
          </p>
           <Link href="#" className="mt-3 text-xs text-muted-foreground hover:text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
