// src/app/settings/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Palette, Bell, TextQuote, Save, Loader2, ShieldAlert, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const phoneRegex = /^\+?[0-9\s-]{7,15}$/;
const phoneErrorMsg = "Número de teléfono inválido.";

const settingsSchema = z.object({
  highContrastMode: z.boolean().default(false),
  pushNotifications: z.boolean().default(true),
  textSize: z.enum(["small", "medium", "large"], { errorMap: () => ({ message: "Selecciona un tamaño de texto válido."})}).default("medium"),
  emergencyContact1Name: z.string().max(50, "Máximo 50 caracteres.").optional(),
  emergencyContact1Phone: z.string().optional().refine(val => !val || phoneRegex.test(val), { message: phoneErrorMsg }),
  emergencyContact2Name: z.string().max(50, "Máximo 50 caracteres.").optional(),
  emergencyContact2Phone: z.string().optional().refine(val => !val || phoneRegex.test(val), { message: phoneErrorMsg }),
}).refine(data => !!data.emergencyContact1Name === !!data.emergencyContact1Phone, {
  message: "Debe proporcionar nombre y teléfono para el contacto de emergencia 1, o ninguno.",
  path: ["emergencyContact1Name"], 
}).refine(data => !!data.emergencyContact2Name === !!data.emergencyContact2Phone, {
  message: "Debe proporcionar nombre y teléfono para el contacto de emergencia 2, o ninguno.",
  path: ["emergencyContact2Name"],
});


type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      highContrastMode: false,
      pushNotifications: true,
      textSize: "medium",
      emergencyContact1Name: "",
      emergencyContact1Phone: "",
      emergencyContact2Name: "",
      emergencyContact2Phone: "",
    },
  });

  function onSubmit(data: SettingsFormValues) {
    setIsSaving(true);
    console.log("Settings saved:", data);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Configuración Guardada",
        description: "Tus preferencias han sido actualizadas exitosamente.",
      });
      // Note: Actual high contrast theme switching would need more robust implementation
      // This is just a placeholder for the idea.
      if (data.highContrastMode) {
        document.documentElement.classList.add('high-contrast-theme-active-placeholder'); 
      } else {
        document.documentElement.classList.remove('high-contrast-theme-active-placeholder'); 
      }
    }, 1500);
  }

  return (
    <div className="p-4 md:p-6">
      <Card className="max-w-2xl mx-auto shadow-xl border-border/70 rounded-xl bg-card">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="flex items-center text-2xl font-semibold text-foreground">
            <Settings className="mr-3 h-7 w-7 text-primary" />
            Configuración General
          </CardTitle>
          <CardDescription className="text-card-foreground/80">Personaliza tu experiencia en la aplicación WheelTaxi.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="highContrastMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-4 bg-card-foreground/5 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center font-medium text-foreground">
                        <Palette className="mr-2 h-5 w-5 text-muted-foreground" />
                        Modo Alto Contraste
                      </FormLabel>
                      <FormDescription className="text-xs text-muted-foreground">
                        Mejora la visibilidad de los elementos en pantalla.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Activar modo alto contraste"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pushNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-4 bg-card-foreground/5 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center font-medium text-foreground">
                        <Bell className="mr-2 h-5 w-5 text-muted-foreground" />
                        Notificaciones Push
                      </FormLabel>
                      <FormDescription className="text-xs text-muted-foreground">
                        Recibe alertas sobre tus viajes, promociones y noticias.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Activar notificaciones push"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="textSize"
                render={({ field }) => (
                  <FormItem className="rounded-lg border border-border/50 p-4 bg-card-foreground/5 shadow-sm">
                    <FormLabel className="text-base flex items-center font-medium text-foreground">
                       <TextQuote className="mr-2 h-5 w-5 text-muted-foreground" />
                       Tamaño de Texto Preferido
                    </FormLabel>
                     <FormDescription className="text-xs text-muted-foreground pb-2">
                        Ajusta el tamaño del texto en la aplicación para mejorar la lectura.
                      </FormDescription>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground">
                          <SelectValue placeholder="Selecciona un tamaño" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent> {/* Popover will use theme colors */}
                        <SelectItem value="small">Pequeño</SelectItem>
                        <SelectItem value="medium">Mediano (Predeterminado)</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Separator className="bg-border/50" />

              <div>
                 <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center">
                    <ShieldAlert className="mr-2 h-5 w-5 text-primary"/>
                    Contactos de Emergencia
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Estos contactos serán notificados si activas la función SOS.</p>

                <div className="space-y-6 rounded-lg border border-border/50 p-4 bg-card-foreground/5 shadow-sm">
                    <div>
                        <FormLabel className="text-base font-medium text-foreground">Contacto 1</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <FormField
                            control={form.control}
                            name="emergencyContact1Name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center text-xs text-muted-foreground"><User className="mr-1.5 h-3.5 w-3.5"/>Nombre</FormLabel>
                                <FormControl>
                                <Input placeholder="Nombre del contacto 1" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="emergencyContact1Phone"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center text-xs text-muted-foreground"><Phone className="mr-1.5 h-3.5 w-3.5"/>Teléfono</FormLabel>
                                <FormControl>
                                <Input type="tel" placeholder="Teléfono del contacto 1" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>
                    </div>
                    <div>
                        <FormLabel className="text-base font-medium text-foreground">Contacto 2 (Opcional)</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <FormField
                            control={form.control}
                            name="emergencyContact2Name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center text-xs text-muted-foreground"><User className="mr-1.5 h-3.5 w-3.5"/>Nombre</FormLabel>
                                <FormControl>
                                <Input placeholder="Nombre del contacto 2" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="emergencyContact2Phone"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center text-xs text-muted-foreground"><Phone className="mr-1.5 h-3.5 w-3.5"/>Teléfono</FormLabel>
                                <FormControl>
                                <Input type="tel" placeholder="Teléfono del contacto 2" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>
                    </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full text-base py-3 rounded-md mt-6" variant="default" disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                {isSaving ? "Guardando..." : "Guardar Configuración"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
