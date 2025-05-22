
// src/app/evaluate-trip/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Star, MessageSquare, Send, Loader2, ThumbsUp, Lightbulb, MapPin, CalendarDays, UserCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";

const evaluationSchema = z.object({
  rating: z.number().min(1, { message: "Por favor, selecciona al menos una estrella." }).max(5),
  positiveAspects: z.array(z.string()).optional(),
  comments: z.string().max(500, "Los comentarios no deben exceder los 500 caracteres.").optional(),
  improvementSuggestions: z.string().max(500, "Las sugerencias no deben exceder los 500 caracteres.").optional(),
});

type EvaluationFormValues = z.infer<typeof evaluationSchema>;

const positiveAspectsOptions = [
  { id: "clean_vehicle", label: "Vehículo Limpio y Cómodo" },
  { id: "safe_driving", label: "Conducción Segura y Prudente" },
  { id: "friendly_driver", label: "Conductor Amable y Respetuoso" },
  { id: "helpful_assistance", label: "Asistencia Útil al Abordar/Descender" },
  { id: "good_communication", label: "Buena Comunicación Durante el Viaje" },
  { id: "efficient_route", label: "Ruta Eficiente y Conocimiento de la Zona" },
];

function StarRatingInput({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-10 w-10 cursor-pointer transition-colors
            ${(hoverRating || value) >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50 hover:text-yellow-300"}
          `}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );
}

function EvaluateTripContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tripId = searchParams.get("tripId") || "N/A";
  const destination = searchParams.get("destination") || "Destino Desconocido";
  const date = searchParams.get("date") || "Fecha Desconocida";
  const driverName = searchParams.get("driverName") || "Conductor Desconocido";

  const form = useForm<EvaluationFormValues>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      rating: 0,
      positiveAspects: [],
      comments: "",
      improvementSuggestions: "",
    },
  });

  async function onSubmit(data: EvaluationFormValues) {
    setIsSubmitting(true);
    console.log("Evaluation submitted for tripId:", tripId, data);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Evaluación Enviada",
        description: `Gracias por evaluar tu viaje a ${destination}. Tus comentarios son valiosos.`,
      });
      router.push("/history"); // Redirect to history page after submission
    }, 1500);
  }

  return (
    <div className="p-4 md:p-6 space-y-6 h-full overflow-y-auto">
       <div className="mb-4 max-w-3xl mx-auto">
        <Link href="/history" passHref>
          <Button variant="outline" size="sm" className="text-sm border-border/70 hover:bg-muted/50">
            <ChevronLeft className="mr-1.5 h-4 w-4" />
            Volver al Historial
          </Button>
        </Link>
      </div>
      <Card className="max-w-2xl mx-auto shadow-xl border-border/70 rounded-xl bg-card overflow-hidden">
        <CardHeader className="border-b border-border/50 p-5">
          <div className="flex items-center gap-3 mb-1">
            <Star className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-semibold text-foreground break-words">
              Evalúa tu Viaje
            </CardTitle>
          </div>
          <CardDescription className="text-card-foreground/80 pl-11 break-words">
            Ayúdanos a mejorar compartiendo tu experiencia.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="p-4 border border-border/50 rounded-lg bg-card-foreground/5 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-3">Detalles del Viaje</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary shrink-0" /> Destino: <span className="font-medium text-foreground ml-1">{destination}</span></p>
              <p className="flex items-center"><CalendarDays className="h-4 w-4 mr-2 text-primary shrink-0" /> Fecha: <span className="font-medium text-foreground ml-1">{date}</span></p>
              <p className="flex items-center"><UserCircle className="h-4 w-4 mr-2 text-primary shrink-0" /> Conductor: <span className="font-medium text-foreground ml-1">{driverName}</span></p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-foreground flex items-center mb-2">
                      <Star className="h-5 w-5 mr-2 text-primary" />Calificación General *
                    </FormLabel>
                    <FormControl>
                      <StarRatingInput value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="positiveAspects"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base font-semibold text-foreground flex items-center">
                        <ThumbsUp className="h-5 w-5 mr-2 text-green-500" />Aspectos Positivos (Opcional)
                      </FormLabel>
                    </div>
                    <div className="space-y-3">
                      {positiveAspectsOptions.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="positiveAspects"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0 p-3 bg-card-foreground/5 border border-border/30 rounded-md shadow-sm"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal text-foreground cursor-pointer flex-1 min-w-0 break-words">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-foreground flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-secondary" />Comentarios Adicionales (Opcional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Comparte más detalles sobre tu experiencia..."
                        rows={4}
                        className="bg-input border-border/70 focus:ring-primary rounded-md resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="improvementSuggestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-foreground flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-accent" />Sugerencias de Mejora (Opcional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="¿Hay algo que podríamos hacer mejor?"
                        rows={3}
                        className="bg-input border-border/70 focus:ring-primary rounded-md resize-y min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-base py-3 rounded-md" variant="default" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                {isSubmitting ? "Enviando Evaluación..." : "Enviar Evaluación"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}


export default function EvaluateTripPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
      <EvaluateTripContent />
    </Suspense>
  );
}
    
    