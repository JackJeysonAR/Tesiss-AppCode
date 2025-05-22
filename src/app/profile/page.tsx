// src/app/profile/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { User, Mail, Phone, Save, Loader2, Accessibility, HelpCircle, MessageCircle, VolumeX, Users, CheckSquare, MessageSquare as MessageSquareIcon } from "lucide-react"; // Renamed MessageSquare to avoid conflict
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import type { ToastActionElement } from "@/components/ui/toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";


const profileSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }).max(50, { message: "El nombre no debe exceder los 50 caracteres." }),
  email: z.string().email({ message: "Correo electrónico inválido." }),
  phone: z.string().regex(/^\+?[0-9\s-]{7,15}$/, { message: "Número de teléfono inválido." }),
  requiresRamp: z.boolean().default(false),
  serviceAnimalSpace: z.boolean().default(false),
  prefersTalkativeDriver: z.boolean().default(false),
  prefersQuietRide: z.boolean().default(true),
  boardingAssistance: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState("UserExample"); // For dynamic avatar

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Usuario Ejemplo",
      email: "usuario@ejemplo.com",
      phone: "+51 987 654 321",
      requiresRamp: false,
      serviceAnimalSpace: false,
      prefersTalkativeDriver: false,
      prefersQuietRide: true,
      boardingAssistance: false,
    },
  });

  useEffect(() => {
    // Fetch user data from localStorage if available
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem("userName") || "Usuario Ejemplo";
      const storedEmail = localStorage.getItem("userEmail") || "usuario@ejemplo.com";
      form.reset({
        ...form.getValues(), // keep other default values
        name: storedName,
        email: storedEmail,
      });
      setAvatarSeed(storedName.replace(/\s+/g, '') || "User"); // Use name for avatar seed
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  function onSubmit(data: ProfileFormValues) {
    setIsSaving(true);
    console.log("Profile data submitted:", data);
    
    if (typeof window !== "undefined") {
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userEmail", data.email);
    }
    setAvatarSeed(data.name.replace(/\s+/g, '') || "User");


    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Perfil Actualizado",
        description: "Tus cambios han sido guardados exitosamente.",
        action: <Button variant="outline" size="sm" onClick={() => {}}>Ok</Button> as ToastActionElement,
      });
    }, 1500);
  }

  const currentName = form.watch("name");
  const avatarFallback = currentName ? currentName.substring(0, 2).toUpperCase() : "UE";


  return (
    <div className="p-4 md:p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="max-w-2xl mx-auto shadow-xl border-border/70 rounded-xl bg-card">
            <CardHeader className="items-center text-center border-b border-border/50 pb-4">
              <Avatar className="h-28 w-28 mb-3 border-4 border-primary shadow-lg rounded-full">
                <AvatarImage src={`https://picsum.photos/seed/${avatarSeed}/150/150?grayscale`} alt={currentName} data-ai-hint="user avatar" />
                <AvatarFallback className="text-3xl bg-muted text-muted-foreground">{avatarFallback}</AvatarFallback>
              </Avatar>
              <CardTitle className="flex items-center text-2xl font-semibold text-foreground">
                <User className="mr-2 h-7 w-7 text-primary" />
                Mi Perfil
              </CardTitle>
              <CardDescription className="text-card-foreground/80">Actualiza tu información personal y preferencias.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground"><User className="mr-2 h-4 w-4" />Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre completo" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
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
                    <FormLabel className="flex items-center text-muted-foreground"><Mail className="mr-2 h-4 w-4" />Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@correo.com" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground"><Phone className="mr-2 h-4 w-4" />Teléfono</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+51 XXX XXX XXX" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="max-w-2xl mx-auto shadow-xl border-border/70 rounded-xl bg-card">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center text-xl font-semibold text-foreground">
                <Accessibility className="mr-2 h-6 w-6 text-primary" />
                Preferencias de Viaje
              </CardTitle>
              <CardDescription className="text-card-foreground/80">Indícanos tus necesidades para personalizar tu experiencia.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Accessibility Preferences Switches */}
              <FormField
                control={form.control}
                name="requiresRamp"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-3 shadow-sm bg-card-foreground/5">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm flex items-center font-medium text-foreground">
                        <CheckSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                        Requiere rampa vehicular
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceAnimalSpace"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-3 shadow-sm bg-card-foreground/5">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm flex items-center font-medium text-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-muted-foreground lucide lucide-dog"><path d="M10 5.2C10.7 4.1 12.4 3 14.5 3c2.2 0 4.5 1.6 4.5 4.5 0 2.3-1.5 3.8-2.7 4.8L15 17.5V21H9V12.5L7.7 11.3C6.5 10.3 5 8.8 5 6.5 5 3.6 7.3 2 9.5 2c1.5 0 2.7.7 3.3 1.5"/><path d="M4 20h16"/></svg>
                        Espacio para animal de servicio
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="boardingAssistance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-3 shadow-sm bg-card-foreground/5">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm flex items-center font-medium text-foreground">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" /> 
                        Asistencia para abordar/descender
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
               <Separator className="my-4 bg-border/50" />
              {/* Communication Preferences Section */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-secondary" /> {/* Changed to secondary color */}
                  Preferencias de Comunicación
                </h3>
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="prefersTalkativeDriver"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-3 shadow-sm bg-card-foreground/5">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm flex items-center font-medium text-foreground">
                            <MessageSquareIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                            Prefiere conductor comunicativo
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} disabled={form.getValues("prefersQuietRide")} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prefersQuietRide"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-3 shadow-sm bg-card-foreground/5">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm flex items-center font-medium text-foreground">
                            <VolumeX className="mr-2 h-4 w-4 text-muted-foreground" />
                            Prefiere viaje silencioso
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} disabled={form.getValues("prefersTalkativeDriver")} />
                        </FormControl>
                      </FormItem>
                    )}
                  />  
                </div>            
              </div>
            </CardContent>
             <CardContent className="p-6 pt-0">
                <Button type="submit" className="w-full text-base py-3 rounded-md" variant="default" disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                    {isSaving ? "Guardando Cambios..." : "Guardar Todos los Cambios"}
                </Button>
             </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
