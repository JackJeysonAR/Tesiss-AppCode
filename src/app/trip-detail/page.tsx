
// src/app/trip-detail/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DriverCard } from "@/components/app/driver-card";
import { MapPlaceholder } from "@/components/app/map-placeholder";
import { SOSButton } from "@/components/app/sos-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Phone, TrendingUp, BarChartHorizontalBig, Loader2, XCircle, Info, Route, MapPin as MapPinIcon, Clock, ShieldAlert, Car, BellRing, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ToastAction } from "@/components/ui/toast";

type TripStatus = "en_camino" | "llegando_pronto" | "ha_llegado" | "viaje_iniciado";

interface TripStatusInfo {
  text: string;
  icon: React.ElementType;
  colorClass: string;
}

const tripStatusDetails: Record<TripStatus, TripStatusInfo> = {
  en_camino: { text: "Conductor en camino", icon: Car, colorClass: "text-primary" },
  llegando_pronto: { text: "Vehículo llegando pronto", icon: BellRing, colorClass: "text-amber-500" },
  ha_llegado: { text: "¡Tu WheelTaxi ha llegado!", icon: CheckCircle2, colorClass: "text-green-500" },
  viaje_iniciado: { text: "Viaje en curso hacia tu destino", icon: Route, colorClass: "text-blue-500" },
};


export default function TripDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const destinationParam = searchParams.get("destination");
  const [destination, setDestination] = useState("Av. Giráldez 742 (Destino Ejemplo)");

  const [isLoadingEta, setIsLoadingEta] = useState(true);
  const [tripEta, setTripEta] = useState<number | null>(null); // Initialized to null
  const [isLoadingFare, setIsLoadingFare] = useState(true);
  const [fareDetails, setFareDetails] = useState<{base: string, distance: string, time: string, accessibility: string, total: string} | null>(null); // Initialized to null
  const [tripStatus, setTripStatus] = useState<TripStatus>("en_camino");
  const [showStartTripButton, setShowStartTripButton] = useState(false);


  useEffect(() => {
    if (destinationParam) {
      setDestination(decodeURIComponent(destinationParam));
    }
  }, [destinationParam]);

  const driverData = {
    name: "Carlos Villena Rojas",
    imageUrl: "https://picsum.photos/seed/driverCVR/200/200",
    rating: 4.9,
    certifications: ["Conducción Segura Avanzada", "Primeros Auxilios Nivel II", "Vehículo Súper-Adaptado Cert."],
    ratingsBreakdown: {
      friendliness: 5,
      punctuality: 4,
      routeKnowledge: 5,
    },
    vehicleModel: "Toyota Sienta Maxi-Accesible",
    licensePlate: "WXZ-789",
    vehicleType: "Accesible Plus (XL)", 
    vehicleFeatures: ["Rampa Eléctrica Bidireccional", "Anclajes ISO-FIX para Silla de Ruedas", "Espacio Adicional para Acompañante", "Sistema de Climatización Independiente"],
  };

  // Effect for client-side initialization of random values and ETA countdown
  useEffect(() => {
    // Initialize ETA client-side
    const initialRandomEta = Math.floor(Math.random() * 6) + 7;
    setTripEta(initialRandomEta);
    setIsLoadingEta(false);

    // Initialize Fare client-side (can be delayed if desired)
    const fareCalculationTimer = setTimeout(() => {
        const base = (Math.random() * 5 + 3.5);
        const distance = (Math.random() * 7 + 2.5);
        const time = (Math.random() * 4 + 1.5);
        const accessibility = (Math.random() * 3 + 1.2);
        const total = base + distance + time + accessibility;

        setFareDetails({
            base: `S/ ${base.toFixed(2)}`,
            distance: `S/ ${distance.toFixed(2)}`,
            time: `S/ ${time.toFixed(2)}`,
            accessibility: `S/ ${accessibility.toFixed(2)}`,
            total: `S/ ${total.toFixed(2)}`,
        });
        setIsLoadingFare(false);
    }, 2200); // Delay for fare calculation

    // ETA Countdown interval
    let etaCountdownInterval: NodeJS.Timeout | undefined;
    if (tripStatus !== "viaje_iniciado" && tripStatus !== "ha_llegado" && initialRandomEta > 0) {
        etaCountdownInterval = setInterval(() => {
            setTripEta((currentEta) => {
                if (currentEta === null || currentEta === 0) {
                    if (etaCountdownInterval) clearInterval(etaCountdownInterval);
                    return currentEta;
                }
                if (currentEta === 1) {
                    if (etaCountdownInterval) clearInterval(etaCountdownInterval);
                    return 0;
                }
                return currentEta - 1;
            });
        }, 7000); // Accelerated for demo
    }

    return () => {
        clearTimeout(fareCalculationTimer);
        if (etaCountdownInterval) clearInterval(etaCountdownInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array: runs once on mount on the client.

  // Effect to handle trip status changes based on ETA
  useEffect(() => {
    // Condition for "llegando_pronto"
    if (tripEta !== null && tripEta > 0 && tripEta <= 2 && tripStatus === "en_camino") {
      setTripStatus("llegando_pronto");
      toast({
        title: "¡Tu WheelTaxi está muy cerca!",
        description: `${driverData.name} llegará en aproximadamente ${tripEta} minuto(s).`,
        className: "bg-amber-500/20 border-amber-500 text-amber-700 dark:text-amber-400 dark:border-amber-600 dark:bg-amber-900/30",
        duration: 7000,
      });
    }
    // Condition for "ha_llegado"
    else if (tripEta === 0 && tripStatus !== "ha_llegado" && tripStatus !== "viaje_iniciado") {
      setTripStatus("ha_llegado");
      setShowStartTripButton(true);
      toast({
        title: "¡Tu WheelTaxi ha llegado!",
        description: `${driverData.name} te está esperando en tu ubicación.`,
        className: "bg-green-500/20 border-green-500 text-green-700 dark:text-green-400 dark:border-green-600 dark:bg-green-900/30",
        duration: 10000,
      });
    }
  }, [tripEta, tripStatus, toast, driverData.name, destination]);


  const handleStartTrip = () => {
    setTripStatus("viaje_iniciado");
    setShowStartTripButton(false);
    // Clear any existing ETA interval if trip is started manually
    // The main interval cleanup in the mount effect will also handle this on unmount
    setTripEta(0); // Set ETA to 0 or some other indicator that trip is active
    toast({
      title: "¡Viaje Iniciado!",
      description: `Tu viaje a ${destination} ha comenzado. ¡Buen viaje!`,
      className: "bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400 dark:border-blue-600 dark:bg-blue-900/30",
      duration: 7000,
    });
  };

  const handleSendMessage = () => {
    toast({
      title: "Mensaje Enviado",
      description: `Tu mensaje (simulado) ha sido enviado a ${driverData.name}.`,
      action: <ToastAction altText="Entendido">Entendido</ToastAction>,
    });
  };

  const handleCallDriver = () => {
    toast({
      title: "Llamando al Conductor",
      description: `Iniciando llamada (simulada) con ${driverData.name}...`,
    });
  };

  const handleCancelTrip = () => {
    toast({
      title: "Viaje Cancelado",
      description: "Tu viaje ha sido cancelado exitosamente.",
      variant: "destructive",
    });
    router.push("/");
  };

  const CurrentTripStatusIcon = tripStatusDetails[tripStatus].icon;


  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* Mapa y Destino */}
      <div className="h-1/3 md:h-2/5 relative">
        <MapPlaceholder routeHighlighted className="absolute inset-0" />
        <div className="absolute top-3 left-3 bg-card/90 p-2.5 rounded-lg shadow-md backdrop-blur-sm border border-border/70 max-w-[calc(100%-3rem)]"> {/* Asegurar que no toque el borde */}
            <p className="text-xs text-muted-foreground flex items-center">
              <MapPinIcon className="h-3.5 w-3.5 mr-1.5 text-primary shrink-0"/>
              {tripStatus === "viaje_iniciado" ? "Destino Final:" : "En camino a:"}
            </p>
            <p className="font-semibold text-sm text-foreground truncate break-words">
              {destination}
            </p>
        </div>
      </div>

      {/* Contenido Principal Desplazable */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-28">
        <DriverCard {...driverData} />

        {/* Nueva Tarjeta: Estado del Viaje y ETA */}
        <Card className="shadow-lg bg-card border-border/70 rounded-xl">
          <CardHeader className="p-4 border-b border-border/50">
            <CardTitle className="text-lg flex items-center font-semibold text-foreground">
              <Clock className="mr-2.5 h-5 w-5 text-primary" />
              Estado del Viaje
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Tiempo Estimado de Llegada (ETA):</p>
              {isLoadingEta || tripEta === null ? (
                <Skeleton className="h-7 w-20 bg-muted/70 rounded-md" />
              ) : (
                <p className={`text-2xl font-bold ${tripEta === 0 ? tripStatusDetails[tripStatus].colorClass : 'text-foreground'}`}>
                  {tripEta > 0 ? `${tripEta} min` : (tripStatus === "ha_llegado" || tripStatus === "viaje_iniciado" ? "Ahora" : `${tripEta} min`)}
                </p>
              )}
            </div>
            <Separator className="bg-border/40"/>
            <div className="flex items-center">
              <CurrentTripStatusIcon className={`mr-3 h-7 w-7 ${tripStatusDetails[tripStatus].colorClass} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Estado Actual:</p>
                <p className={`text-md font-semibold ${tripStatusDetails[tripStatus].colorClass} break-words`}>
                  {tripStatusDetails[tripStatus].text}
                </p>
              </div>
            </div>
            {tripStatus === 'ha_llegado' && showStartTripButton && (
              <Button onClick={handleStartTrip} className="w-full mt-3 bg-green-600 hover:bg-green-700 text-primary-foreground rounded-lg py-3 text-base">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Iniciar Viaje
              </Button>
            )}
             {tripStatus === 'viaje_iniciado' && (
              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-md text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">¡Disfruta tu viaje a {destination}!</p>
                <p className="text-xs text-muted-foreground mt-1">Puedes seguir el progreso en el mapa (simulado).</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-card border-border/70 rounded-xl">
           <CardHeader className="p-3 border-b border-border/50 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base flex items-center text-foreground">
              <BarChartHorizontalBig className="mr-2 h-5 w-5 text-primary" />
              Detalle de Tarifa Estimada
            </CardTitle>
            {(isLoadingFare || fareDetails === null) && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
          </CardHeader>
          <CardContent className="p-4 text-sm space-y-1.5">
            {isLoadingFare || fareDetails === null ? (
              <>
                <div className="flex justify-between"><Skeleton className="h-4 w-24 bg-muted/70 rounded" /> <Skeleton className="h-4 w-12 bg-muted/70 rounded" /></div>
                <div className="flex justify-between"><Skeleton className="h-4 w-32 bg-muted/70 rounded" /> <Skeleton className="h-4 w-10 bg-muted/70 rounded" /></div>
                <div className="flex justify-between"><Skeleton className="h-4 w-28 bg-muted/70 rounded" /> <Skeleton className="h-4 w-10 bg-muted/70 rounded" /></div>
                <div className="flex justify-between"><Skeleton className="h-4 w-40 bg-muted/70 rounded" /> <Skeleton className="h-4 w-8 bg-muted/70 rounded" /></div>
                <Separator className="my-2 bg-border/50" />
                <div className="flex justify-between font-bold text-base"><Skeleton className="h-5 w-32 bg-muted/70 rounded" /> <Skeleton className="h-5 w-16 bg-muted/70 rounded" /></div>
              </>
            ) : fareDetails ? (
              <>
                <div className="flex justify-between"><span>Tarifa Base:</span> <span className="font-medium">{fareDetails.base}</span></div>
                <div className="flex justify-between"><span>Distancia (aprox.):</span> <span className="font-medium">{fareDetails.distance}</span></div>
                <div className="flex justify-between"><span>Tiempo (aprox.):</span> <span className="font-medium">{fareDetails.time}</span></div>
                <div className="flex justify-between"><span>Cargo por Accesibilidad:</span> <span className="font-medium">{fareDetails.accessibility}</span></div>
                <Separator className="my-2 bg-border/50" />
                <div className="flex justify-between font-bold text-base text-primary"><span>Total Estimado:</span> <span>{fareDetails.total}</span></div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-4">
                <Info className="mx-auto h-6 w-6 mb-1" />
                No se pudo cargar el detalle de la tarifa.
              </div>
            )}
          </CardContent>
        </Card>

        {tripStatus !== "viaje_iniciado" && (
          <>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button variant="outline" className="py-3 text-base border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary-foreground rounded-lg" onClick={handleSendMessage}>
                <MessageSquare className="mr-2 h-5 w-5" /> Mensaje
              </Button>
              <Button variant="outline" className="py-3 text-base border-accent text-accent hover:bg-accent/10 hover:text-accent-foreground rounded-lg" onClick={handleCallDriver}>
                <Phone className="mr-2 h-5 w-5" /> Llamar
              </Button>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full py-3 text-base mt-2 rounded-lg">
                  <XCircle className="mr-2 h-5 w-5" /> Cancelar Viaje
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-card border-border/70">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-foreground">¿Estás seguro de cancelar el viaje?</AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    Si cancelas, podríamos aplicar una tarifa de cancelación dependiendo de qué tan cerca esté el conductor.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-md">No, continuar viaje</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelTrip} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md">
                    Sí, cancelar viaje
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>

      <SOSButton />
    </div>
  );
}
