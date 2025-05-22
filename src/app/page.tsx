// src/app/page.tsx
"use client"; 

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPlaceholder } from "@/components/app/map-placeholder";
import { SOSButton } from "@/components/app/sos-button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Navigation, Loader2, Route, History, ShieldAlert, Accessibility as AccessibilityIcon, MapPinned, ChevronRight, Award, User, Activity, Crosshair } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [destination, setDestination] = useState("");
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const handleSearchTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast({
        title: "Destino Requerido",
        description: "Por favor, ingresa un destino.",
        variant: "destructive",
      });
      return;
    }
    setIsLoadingRoute(true);
    // Simulate API call for route search
    setTimeout(() => {
      setIsLoadingRoute(false);
      router.push(`/trip-detail?destination=${encodeURIComponent(destination)}`);
    }, 1500);
  };

  const handleUseCurrentLocation = () => {
    const mockLocation = "Mi Ubicación Actual (detectada)";
    setDestination(mockLocation);
    toast({
      title: "Ubicación Actual Aplicada",
      description: `Se ha establecido "${mockLocation}" como tu destino.`,
    });
  };

  const quickActions = [
    { title: "Historial de Viajes", description: "Revisa tus viajes pasados y gestiona tus recibos.", href: "/history", icon: History, color: "text-primary" },
    { title: "Info. Accesibilidad IA", description: "Consulta datos de accesibilidad de lugares públicos generados por IA.", href: "/accessibility-insights", icon: AccessibilityIcon, color: "text-secondary" },
    { title: "Mis Recompensas", description: "Descubre y canjea beneficios exclusivos por tu lealtad.", href: "/rewards", icon: Award, color: "text-accent" },
    { title: "Perfil y Ajustes", description: "Personaliza tu información, preferencias de viaje y configuración de la app.", href: "/profile", icon: User, color: "text-foreground" },
  ];

  return (
    <div className="relative flex flex-col h-full bg-background text-foreground">
      {/* Container for map and scrollable content. Takes up flexible space. */}
      <div className="relative flex-1 min-h-0"> {/* Added relative for absolute positioning of map */}
        <MapPlaceholder className="absolute inset-0 -z-10 w-full h-full" />
        
        {/* Scrollable content area, positioned over the map */}
        <div className="relative h-full overflow-y-auto pb-24"> {/* pb-24 for SOS button clearance */}
          <div className="p-4 space-y-6">
            <Card className="shadow-2xl bg-card/90 backdrop-blur-lg border-2 border-primary/30 rounded-xl overflow-hidden">
              <CardHeader className="p-5 pb-3 bg-gradient-to-br from-primary/10 via-card to-card">
                <CardTitle className="text-2xl text-primary flex items-center">
                  <MapPinned className="mr-3 h-7 w-7" />
                  Planifica tu Viaje Accesible
                </CardTitle>
                <CardDescription className="pt-1 text-muted-foreground">
                  Ingresa tu destino para encontrar la mejor ruta adaptada a tus necesidades en Huancayo.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-3">
                <form onSubmit={handleSearchTrip} className="space-y-4">
                  <div className="relative flex items-center gap-2">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      type="text"
                      placeholder="¿A dónde vamos hoy, Huancayo?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="flex-1 pl-11 pr-4 py-3 text-base bg-input border-border focus:ring-2 focus:ring-primary rounded-lg shadow-sm"
                      aria-label="Destino"
                    />
                     <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        onClick={handleUseCurrentLocation}
                        aria-label="Usar mi ubicación actual para destino"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Crosshair className="h-5 w-5" />
                      </Button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-lg py-3.5 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg shadow-lg hover:shadow-primary/40 transform hover:scale-[1.01] transition-all duration-200 ease-in-out"
                    disabled={isLoadingRoute}
                    variant="default"
                  >
                    {isLoadingRoute ? (
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    ) : (
                      <Navigation className="mr-2 h-6 w-6" />
                    )}
                    {isLoadingRoute ? "Buscando Ruta..." : "Buscar Viaje Accesible"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3 px-1 flex items-center">
                <Activity className="mr-2 h-6 w-6 text-secondary" />
                Explora más funciones
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.title} href={action.href} passHref>
                    <Card
                      className="shadow-lg bg-card/90 backdrop-blur-sm border-border hover:border-secondary/70 transition-all duration-200 cursor-pointer rounded-xl group hover:shadow-secondary/20 flex flex-col"
                    >
                      <CardContent className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex items-center mb-2">
                            <action.icon className={`h-7 w-7 mr-3 ${action.color || 'text-primary'}`} />
                            <h3 className={`text-md font-semibold text-foreground group-hover:${action.color === "text-foreground" ? "text-primary" : action.color} transition-colors`}>{action.title}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3 min-h-[2.25rem]">{action.description}</p>
                        </div>
                        <div className={`mt-auto flex items-center text-xs ${action.color === "text-foreground" ? "text-primary" : action.color} font-medium group-hover:underline`}>
                          Ver más <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                 <Card
                    onClick={() => toast({ title: "Botón SOS", description: "El botón SOS flotante está siempre disponible para emergencias.", duration: 5000 })}
                    className="shadow-lg bg-card/90 backdrop-blur-sm border-border hover:border-destructive/70 transition-all duration-200 cursor-pointer rounded-xl group hover:shadow-destructive/20 flex flex-col sm:col-span-2"
                  >
                    <CardContent className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center mb-2">
                          <ShieldAlert className="h-7 w-7 mr-3 text-destructive" />
                          <h3 className="text-md font-semibold text-foreground group-hover:text-destructive transition-colors">Acceso Rápido a SOS</h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3 min-h-[2.25rem]">El botón SOS flotante está siempre disponible para emergencias. Púlsalo para notificar a tus contactos.</p>
                      </div>
                      <div className="mt-auto flex items-center text-xs text-destructive font-medium group-hover:underline">
                        Más Información <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SOSButton />
    </div>
  );
}
