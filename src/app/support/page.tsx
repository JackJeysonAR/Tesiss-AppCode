// src/app/support/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MessageSquare, Send, Loader2, Edit, FileText, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Link from "next/link";

const supportSchema = z.object({
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres." }).max(100, { message: "El asunto no puede exceder los 100 caracteres."}),
  message: z.string().min(20, { message: "El mensaje debe tener al menos 20 caracteres." }).max(1000, { message: "El mensaje no puede exceder los 1000 caracteres."}),
});

type SupportFormValues = z.infer<typeof supportSchema>;

export default function SupportPage() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: SupportFormValues) {
    setIsSending(true);
    console.log("Support message submitted:", data);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Mensaje Enviado",
        description: "Tu consulta ha sido recibida. Nuestro equipo de soporte se pondrá en contacto contigo pronto.",
      });
      form.reset(); // Clear the form after successful submission
    }, 2000);
  }

  return (
    <div className="p-4 md:p-6">
      <Card className="max-w-2xl mx-auto shadow-lg border-border/70 rounded-xl bg-card">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="flex items-center text-2xl font-semibold text-foreground">
            <MessageSquare className="mr-3 h-7 w-7 text-primary" />
            Centro de Soporte
          </CardTitle>
          <CardDescription className="text-card-foreground/80">¿Necesitas ayuda o tienes alguna consulta? Contáctanos a través de este formulario.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground"><Edit className="mr-2 h-4 w-4" />Asunto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Problema con un viaje, Sugerencia de mejora" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground"><FileText className="mr-2 h-4 w-4" />Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe tu consulta o problema detalladamente aquí. Incluye fechas, horas o cualquier información relevante..."
                        rows={6}
                        {...field}
                        className="bg-input border-border/70 focus:ring-primary rounded-md resize-y min-h-[120px] text-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-base py-3 rounded-md" variant="default" disabled={isSending}>
                {isSending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                {isSending ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </Form>
           <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <HelpCircle className="mx-auto h-8 w-8 text-primary mb-2" />
            <h3 className="text-lg font-semibold text-foreground mb-1">¿Buscas Respuestas Rápidas?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Consulta nuestra sección de Preguntas Frecuentes (FAQ) para encontrar soluciones a las dudas más comunes.
            </p>
            <Link href="/faq" passHref>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Ir a Preguntas Frecuentes
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
