// src/app/accessibility-insights/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getLocationAccessibilityInsights, type GetLocationAccessibilityInsightsOutput } from "@/ai/flows/get-location-accessibility-insights";
import { Accessibility, AlertCircle, AlertTriangle, CheckCircle2, Lightbulb, Loader2, Search, Sparkles, StarIcon, MapPin, Building, ScanSearch, ShieldOff, Info as InfoIcon, ChevronRight, AlertOctagon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const insightsSchema = z.object({
  locationName: z.string().min(3, { message: "El nombre del lugar debe tener al menos 3 caracteres." }).max(100, { message: "El nombre del lugar no debe exceder los 100 caracteres." }),
  locationAddress: z.string().max(150, { message: "La dirección no debe exceder los 150 caracteres."}).optional(),
});

type InsightsFormValues = z.infer<typeof insightsSchema>;

// Componente ListSection rediseñado
const ListSection: React.FC<{
  title: string;
  items: string[];
  icon: React.ElementType; // Main section icon
  iconColorClass: string; // Color for the main section icon
  emptyIcon: React.ElementType;
  emptyTitle: string;
  emptyDescription: string;
}> = ({ title, items, icon: SectionIcon, iconColorClass, emptyIcon: EmptyIcon, emptyTitle, emptyDescription }) => (
  <section className="space-y-3 min-w-0">
    <h3 className={`flex items-center text-lg font-semibold ${iconColorClass} break-words`}>
      <SectionIcon className="mr-2.5 h-6 w-6 shrink-0" />
      {title}
    </h3>
    {items.length > 0 ? (
      <ul className="space-y-1 pl-1 bg-card-foreground/5 p-3.5 rounded-lg border border-border/40 shadow-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 py-2 border-b border-border/20 last:border-b-0">
            <ChevronRight className={`h-5 w-5 ${iconColorClass} opacity-70 shrink-0 mt-0.5`} />
            <span className="text-sm text-muted-foreground break-words flex-1 min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-center py-6 px-4 text-muted-foreground bg-card-foreground/10 rounded-lg border border-border/40 shadow-sm min-h-[150px] flex flex-col justify-center items-center">
        <EmptyIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground/60" />
        <p className="font-semibold text-base text-foreground/90 break-words">{emptyTitle}</p>
        <p className="text-sm break-words mt-1">{emptyDescription}</p>
      </div>
    )}
  </section>
);


export default function AccessibilityInsightsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<GetLocationAccessibilityInsightsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<InsightsFormValues>({
    resolver: zodResolver(insightsSchema),
    defaultValues: {
      locationName: "",
      locationAddress: "",
    },
  });

  async function onSubmit(data: InsightsFormValues) {
    setIsLoading(true);
    setInsights(null);
    setError(null);
    try {
      const result = await getLocationAccessibilityInsights(data);
      setInsights(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "Ocurrió un error desconocido.";
      setError(`No se pudieron obtener los detalles de accesibilidad: ${errorMessage}`);
      toast({
        title: "Error de Búsqueda",
        description: `No se pudieron obtener los detalles: ${errorMessage}. Intenta con otro lugar o revisa tu conexión.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.round(rating); 
    const halfStar = false; // Simplified, not showing half stars for now

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-8 w-8 ${i < fullStars ? "text-yellow-400 fill-yellow-400" : (i === fullStars && halfStar ? "text-yellow-400 fill-yellow-400 opacity-50" : "text-muted-foreground/30")}`}
          />
        ))}
        <span className="ml-2.5 text-2xl font-semibold text-foreground tabular-nums">
          {rating.toFixed(1)}<span className="text-lg text-muted-foreground">/5</span>
        </span>
      </div>
    );
  };


  return (
    <div className="p-4 md:p-6 space-y-6">
      <Card className="max-w-3xl mx-auto shadow-xl border-border/70 rounded-xl bg-card overflow-hidden">
        <CardHeader className="border-b border-border/50 p-5">
          <div className="flex items-center gap-3 mb-1">
            <Sparkles className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-semibold text-foreground break-words">
              Explorador de Accesibilidad IA
            </CardTitle>
          </div>
          <CardDescription className="text-card-foreground/80 pl-11 break-words">
            Descubre qué tan accesible es un lugar en Huancayo con nuestro análisis potenciado por IA.
            <span className="block text-xs text-accent mt-1.5">
              <InfoIcon className="inline h-3.5 w-3.5 mr-1" />
              Resultados generados por IA. Verifica siempre la información crítica.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="locationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground">
                      <Building className="mr-2 h-4 w-4" />Nombre del Lugar o Establecimiento
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Gran Teatro Nacional, Parque El Olivar" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />Dirección (Opcional, ayuda a precisar)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Av. Javier Prado Este 2225, San Borja" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-base py-3 rounded-md" variant="default" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                {isLoading ? "Explorando Accesibilidad..." : "Explorar Accesibilidad"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="max-w-3xl mx-auto shadow-lg border-border/70 rounded-xl bg-card overflow-hidden">
          <CardHeader className="p-5 border-b border-border/50 bg-card-foreground/5">
            <div className="flex items-center gap-3">
                <Building className="h-7 w-7 text-muted-foreground/50" />
                <Skeleton className="h-8 w-4/5 bg-muted/60 rounded" />
            </div>
            <Skeleton className="h-4 w-3/5 bg-muted/60 mt-2 rounded ml-10" />
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
                <Skeleton className="h-10 w-3/5 bg-muted/60 rounded" /> {/* Stars */}
                <Skeleton className="h-4 w-full bg-muted/60 rounded" /> {/* Summary line 1 */}
                <Skeleton className="h-4 w-5/6 bg-muted/60 rounded" /> {/* Summary line 2 */}
                <Skeleton className="h-4 w-4/6 bg-muted/60 rounded" /> {/* Summary line 3 */}
            </div>
            <div className="space-y-2">
                <Skeleton className="h-5 w-1/3 bg-muted/60 rounded" /> {/* Confidence title */}
                <Skeleton className="h-4 w-full bg-muted/60 rounded-full" /> {/* Confidence bar */}
            </div>
            <Separator className="bg-border/50"/>
            <div className="grid grid-cols-1 gap-y-6"> {/* Changed to grid-cols-1 */}
              {[1, 2].map(col => (
                <div key={col} className="space-y-3">
                  <Skeleton className="h-6 w-2/3 bg-muted/60 rounded" /> {/* Section title */}
                  <Skeleton className="h-10 w-full bg-muted/50 rounded-lg" />
                  <Skeleton className="h-10 w-full bg-muted/50 rounded-lg" />
                  <Skeleton className="h-10 w-5/6 bg-muted/50 rounded-lg" />
                </div>
              ))}
            </div>
             <Separator className="bg-border/50"/>
             <div className="space-y-3">
                <Skeleton className="h-6 w-1/2 bg-muted/60 rounded" /> {/* Tips title */}
                <Skeleton className="h-10 w-full bg-muted/50 rounded-lg" />
                <Skeleton className="h-10 w-5/6 bg-muted/50 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      )}

      {error && !isLoading && (
        <Alert variant="destructive" className="max-w-3xl mx-auto shadow-lg border-destructive/70 rounded-xl">
          <AlertCircle className="h-6 w-6" />
          <AlertTitle className="text-lg font-semibold break-words">Error al Obtener Información</AlertTitle>
          <AlertDescription className="mt-1 break-words">{error}</AlertDescription>
        </Alert>
      )}

      {insights && !isLoading && (
        <Card className="max-w-3xl mx-auto shadow-xl border-primary/40 rounded-xl bg-card overflow-hidden">
          <CardHeader className="p-5 border-b border-primary/30 bg-card-foreground/5">
             <div className="flex items-center gap-3">
                <Building className="h-7 w-7 text-primary" />
                <CardTitle className="text-2xl font-semibold text-primary break-words flex-1 min-w-0">{insights.locationName}</CardTitle>
            </div>
            <CardDescription className="text-primary/80 break-words mt-0.5 pl-10">Reporte Detallado de Accesibilidad (Generado por IA)</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <section>
              {renderStars(insights.overallAccessibilityRating)}
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed break-words min-w-0">{insights.accessibilitySummary}</p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-muted-foreground mb-1.5 break-words">Nivel de Confianza IA</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-muted/50 rounded-full p-0.5">
                    <Progress value={insights.aiConfidenceScore * 100} aria-label="Confianza de la IA" className="h-3.5 flex-1 rounded-full" />
                </div>
                <span className="text-sm font-bold text-foreground tabular-nums">{(insights.aiConfidenceScore * 100).toFixed(0)}%</span>
              </div>
            </section>
            
            <Separator className="bg-border/50"/>

            {/* Changed to single column layout */}
            <div className="grid grid-cols-1 gap-y-6">
              <ListSection 
                title="Características Clave"
                items={insights.knownFeatures}
                icon={CheckCircle2}
                iconColorClass="text-green-500"
                emptyIcon={ScanSearch}
                emptyTitle="Sin Características Destacadas"
                emptyDescription="La IA no identificó características de accesibilidad notables para este lugar."
              />
              <ListSection 
                title="Posibles Desafíos"
                items={insights.potentialChallenges}
                icon={AlertOctagon}
                iconColorClass="text-red-500"
                emptyIcon={ShieldOff}
                emptyTitle="Sin Desafíos Detectados"
                emptyDescription="La IA no encontró desafíos de accesibilidad específicos reportados."
              />
            </div>
            
            {(insights.tipsForVisitors && insights.tipsForVisitors.length > 0) && (
              <>
                <Separator className="bg-border/50"/>
                 <ListSection 
                    title="Consejos para Visitantes"
                    items={insights.tipsForVisitors}
                    icon={Lightbulb}
                    iconColorClass="text-amber-500"
                    emptyIcon={InfoIcon}
                    emptyTitle="Sin Consejos Adicionales"
                    emptyDescription="No hay consejos específicos de la IA para este lugar en este momento."
                />
              </>
            )}
          </CardContent>
          <CardFooter className="bg-card-foreground/5 border-t border-border/30 p-4 rounded-b-xl">
            <p className="text-xs text-muted-foreground/80 text-center w-full break-words min-w-0">
              <InfoIcon className="inline h-3.5 w-3.5 mr-1" />
              La información de accesibilidad es generada por IA y podría no ser exhaustiva o totalmente precisa. Se recomienda verificar directamente con el lugar.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
    

      

