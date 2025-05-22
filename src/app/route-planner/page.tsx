// src/app/route-planner/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { suggestAccessibleRoutes, type SuggestAccessibleRoutesOutput, type SuggestAccessibleRoutesInput } from "@/ai/flows/suggest-accessible-routes";
import { MapIcon, Route, Navigation, Loader2, AlertCircle, CheckCircle2, LocateFixed, MapPin, Clock, TrendingUp, ShieldAlert, TrafficCone, StarIcon, ListOrdered, Lightbulb, Crosshair } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const routePlannerSchema = z.object({
  startLocation: z.string().min(3, { message: "La ubicación de inicio debe tener al menos 3 caracteres." }).max(100),
  endLocation: z.string().min(3, { message: "La ubicación de destino debe tener al menos 3 caracteres." }).max(100),
  currentConditions: z.string().max(200, { message: "Las condiciones no deben exceder los 200 caracteres." }).optional(),
});

type RoutePlannerFormValues = z.infer<typeof routePlannerSchema>;

const ResultItem: React.FC<{ icon: React.ElementType; label: string; value: string | React.ReactNode; valueClassName?: string }> = ({ icon: Icon, label, value, valueClassName }) => (
  <div className="flex items-start space-x-3 p-3 bg-card-foreground/5 rounded-lg border border-border/30">
    <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-sm font-semibold text-foreground break-words ${valueClassName}`}>{value}</p>
    </div>
  </div>
);

const ListResult: React.FC<{ icon: React.ElementType; title: string; items: string[]; emptyText: string; itemIcon?: React.ElementType; itemIconColor?: string }> = ({ icon: TitleIcon, title, items, emptyText, itemIcon: ItemIcon, itemIconColor }) => (
    <div>
        <h3 className="text-md font-semibold text-foreground mb-2 flex items-center">
            <TitleIcon className="h-5 w-5 mr-2 text-primary" />
            {title}
        </h3>
        {items && items.length > 0 ? (
            <ul className="space-y-2 pl-1">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start p-2.5 bg-card-foreground/5 rounded-md border border-border/30 shadow-sm">
                        {ItemIcon ? <ItemIcon className={`h-4 w-4 ${itemIconColor || 'text-muted-foreground'} mr-2.5 mt-0.5 shrink-0`} /> : <Route className="h-4 w-4 text-muted-foreground mr-2.5 mt-0.5 shrink-0" />}
                        <span className="text-sm text-muted-foreground break-words flex-1 min-w-0">{item}</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-sm text-muted-foreground italic p-2.5 bg-card-foreground/10 rounded-md border border-border/30">{emptyText}</p>
        )}
    </div>
);


export default function RoutePlannerPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [routeOutput, setRouteOutput] = useState<SuggestAccessibleRoutesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RoutePlannerFormValues>({
    resolver: zodResolver(routePlannerSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      currentConditions: "",
    },
  });

  const handleUseCurrentLocationForStart = () => {
    const mockLocation = "Mi Ubicación Actual (detectada)";
    form.setValue("startLocation", mockLocation);
    toast({
      title: "Ubicación Actual Aplicada",
      description: `Se ha establecido "${mockLocation}" como tu punto de partida.`,
    });
  };

  async function onSubmit(data: RoutePlannerFormValues) {
    setIsLoading(true);
    setRouteOutput(null);
    setError(null);
    try {
      const result = await suggestAccessibleRoutes(data);
      setRouteOutput(result);
      toast({
        title: "Ruta Accesible Encontrada",
        description: "Se ha generado una sugerencia de ruta optimizada.",
      });
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "Ocurrió un error desconocido.";
      setError(`No se pudo planificar la ruta: ${errorMessage}`);
      toast({
        title: "Error en Planificación",
        description: `Detalles: ${errorMessage}. Intenta de nuevo.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const renderAccessibilityScore = (score: number) => {
    const fullStars = Math.round(score / 20); // Score is 0-100, map to 0-5 stars
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-6 w-6 ${i < fullStars ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`}
          />
        ))}
        <span className="ml-2 text-lg font-semibold text-foreground tabular-nums">
          {score}<span className="text-sm text-muted-foreground">/100</span>
        </span>
      </div>
    );
  };


  return (
    <div className="p-4 md:p-6 space-y-6 h-full overflow-y-auto">
      <Card className="shadow-xl border-border/70 rounded-xl bg-card">
        <CardHeader className="border-b border-border/50 p-5">
          <div className="flex items-center gap-3 mb-1">
            <MapIcon className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-semibold text-foreground break-words">
              Planificador de Rutas Inteligente (IA)
            </CardTitle>
          </div>
          <CardDescription className="text-card-foreground/80 pl-11 break-words">
            Encuentra la ruta más accesible y eficiente para tu viaje en Huancayo.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="startLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground">
                      <LocateFixed className="mr-2 h-4 w-4" />Punto de Partida
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="Ej: Plaza Constitución, Huancayo" {...field} className="flex-1 bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                      </FormControl>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        onClick={handleUseCurrentLocationForStart}
                        aria-label="Usar mi ubicación actual para punto de partida"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Crosshair className="h-5 w-5" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />Destino
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Real Plaza, El Tambo" {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-muted-foreground">
                      <TrafficCone className="mr-2 h-4 w-4" />Condiciones Actuales (Opcional)
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ej: Tráfico ligero, obras en Calle Real altura del óvalo, evento en el parque..." {...field} className="bg-input border-border/70 focus:ring-primary rounded-md text-foreground resize-y min-h-[80px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-base py-3 rounded-md" variant="default" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Navigation className="mr-2 h-5 w-5" />}
                {isLoading ? "Planificando Ruta..." : "Buscar Ruta Accesible"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="shadow-lg border-border/70 rounded-xl bg-card overflow-hidden">
          <CardHeader className="p-5 border-b border-border/50 bg-card-foreground/5">
            <div className="flex items-center gap-3">
                <Route className="h-7 w-7 text-muted-foreground/50" />
                <Skeleton className="h-8 w-3/4 bg-muted/60 rounded" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Skeleton className="h-20 w-full bg-muted/50 rounded-lg" />
                <Skeleton className="h-20 w-full bg-muted/50 rounded-lg" />
                <Skeleton className="h-20 w-full bg-muted/50 rounded-lg" />
            </div>
            <Separator className="bg-border/50"/>
            <div className="space-y-3">
                <Skeleton className="h-6 w-1/3 bg-muted/60 rounded" /> 
                <Skeleton className="h-10 w-full bg-muted/50 rounded-lg" />
                <Skeleton className="h-10 w-full bg-muted/50 rounded-lg" />
                <Skeleton className="h-10 w-5/6 bg-muted/50 rounded-lg" />
            </div>
             <Separator className="bg-border/50"/>
             <div className="space-y-3">
                <Skeleton className="h-6 w-1/2 bg-muted/60 rounded" />
                <Skeleton className="h-10 w-full bg-muted/50 rounded-lg" />
                <Skeleton className="h-10 w-5/6 bg-muted/50 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      )}

      {error && !isLoading && (
        <Alert variant="destructive" className="shadow-lg border-destructive/70 rounded-xl">
          <AlertCircle className="h-6 w-6" />
          <AlertTitle className="text-lg font-semibold break-words">Error en Planificación</AlertTitle>
          <AlertDescription className="mt-1 break-words">{error}</AlertDescription>
        </Alert>
      )}

      {routeOutput && !isLoading && (
        <Card className="shadow-xl border-primary/40 rounded-xl bg-card overflow-hidden">
          <CardHeader className="p-5 border-b border-primary/30 bg-card-foreground/5">
             <div className="flex items-center gap-3">
                <Route className="h-7 w-7 text-primary" />
                <CardTitle className="text-xl font-semibold text-primary break-words flex-1 min-w-0">
                  Ruta Sugerida a {form.getValues("endLocation") || "tu Destino"}
                </CardTitle>
            </div>
            <CardDescription className="text-primary/80 break-words mt-0.5 pl-10">
              Análisis de ruta accesible generado por IA.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                <ResultItem icon={Clock} label="Tiempo Estimado" value={routeOutput.estimatedTime} />
                <ResultItem icon={LocateFixed} label="Distancia Total" value={routeOutput.distance} />
                <ResultItem icon={TrendingUp} label="Puntaje de Accesibilidad" value={renderAccessibilityScore(routeOutput.accessibilityScore)} valueClassName="pt-1"/>
            </div>
            
            <Separator className="bg-border/50"/>

            <ListResult
                icon={ListOrdered}
                title="Descripción de la Ruta (Paso a Paso)"
                items={typeof routeOutput.routeDescription === 'string' ? routeOutput.routeDescription.split('\n').map(s => s.trim()).filter(s => s.length > 0) : []}
                emptyText="No se proporcionó una descripción detallada de la ruta."
                itemIcon={Navigation}
                itemIconColor="text-secondary"
            />
            
            {(routeOutput.obstacles && routeOutput.obstacles.length > 0) && (
              <>
                <Separator className="bg-border/50"/>
                <ListResult
                    icon={ShieldAlert}
                    title="Posibles Obstáculos en la Ruta"
                    items={routeOutput.obstacles}
                    emptyText="No se identificaron obstáculos específicos."
                    itemIcon={TrafficCone}
                    itemIconColor="text-destructive"
                />
              </>
            )}
             <CardFooter className="bg-card-foreground/5 border-t border-border/30 p-4 rounded-b-xl mt-4 -mx-6 -mb-6">
                <p className="text-xs text-muted-foreground/80 text-center w-full break-words min-w-0">
                <Lightbulb className="inline h-3.5 w-3.5 mr-1" />
                Esta ruta es una sugerencia generada por IA. Verifica siempre las condiciones reales antes de viajar.
                </p>
            </CardFooter>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
