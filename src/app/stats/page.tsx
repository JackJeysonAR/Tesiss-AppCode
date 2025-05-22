
// src/app/stats/page.tsx
"use client"; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Route, Award, Sparkles, CheckCircle, XCircle, Leaf, TrendingUp, ShieldCheck, Diamond } from "lucide-react";

// Dummy data for stats - replace with actual data fetching
const userGeneralStats = {
  totalTrips: 78,
  totalDistance: 210, // km
  loyaltyPoints: 320,
};

const userRidePreferences = {
  requiresRamp: true,
  serviceAnimalSpace: false,
  boardingAssistance: true,
  prefersQuietRide: true,
};

const userImpactStats = {
  ecoTrips: 15,
  co2Saved: 8.5, // kg
};

const userLoyaltyProgress = {
  currentTier: "Bronce",
  currentPoints: 320,
  pointsForNextTier: 500,
  nextTier: "Plata",
};

export default function StatsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6 bg-background overflow-hidden"> {/* Added overflow-hidden */}
      <Card className="shadow-lg border-border/70 rounded-xl bg-card">
        <CardHeader className="border-b border-border/50 p-4 md:p-5">
          <CardTitle className="flex items-center text-xl md:text-2xl font-semibold text-foreground">
            <BarChart3 className="mr-2.5 h-6 w-6 md:h-7 md:w-7 text-primary" />
            Mis Estadísticas
          </CardTitle>
          <CardDescription className="text-card-foreground/80 mt-1 text-sm break-words">
            Tu actividad y logros en WheelTaxi, presentados de forma clara.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Card 1: Resumen de Actividad */}
      <Card className="shadow-md border-border/60 rounded-xl bg-card">
        <CardHeader className="p-3 md:p-4 border-b border-border/40">
          <CardTitle className="flex items-center text-base md:text-lg font-semibold text-foreground">
            <Award className="mr-2 h-5 w-5 text-primary" />
            Resumen de Actividad
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="p-3 rounded-lg bg-card-foreground/5 border border-border/30 flex flex-col items-center text-center min-w-0">
            <Route className="h-7 w-7 text-primary mb-1.5" />
            <p className="text-xl font-bold text-foreground">{userGeneralStats.totalTrips}</p>
            <p className="text-xs text-muted-foreground mt-0.5 break-words">Viajes Totales</p>
          </div>
          <div className="p-3 rounded-lg bg-card-foreground/5 border border-border/30 flex flex-col items-center text-center min-w-0">
            <Sparkles className="h-7 w-7 text-primary mb-1.5" />
            <p className="text-xl font-bold text-foreground">{userGeneralStats.totalDistance} km</p>
            <p className="text-xs text-muted-foreground mt-0.5 break-words">Distancia Total</p>
          </div>
          <div className="p-3 rounded-lg bg-card-foreground/5 border border-border/30 flex flex-col items-center text-center min-w-0">
            <Diamond className="h-7 w-7 text-primary mb-1.5" />
            <p className="text-xl font-bold text-foreground">{userGeneralStats.loyaltyPoints}</p>
            <p className="text-xs text-muted-foreground mt-0.5 break-words">Puntos Lealtad</p>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Tus Preferencias de Viaje */}
      <Card className="shadow-md border-border/60 rounded-xl bg-card">
        <CardHeader className="p-3 md:p-4 border-b border-border/40">
          <CardTitle className="flex items-center text-base md:text-lg font-semibold text-foreground">
            <ShieldCheck className="mr-2 h-5 w-5 text-secondary" />
            Tus Preferencias de Viaje
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-4 space-y-2.5">
          <div className="flex items-center justify-between p-2.5 rounded-md bg-card-foreground/5 border border-border/30 min-w-0">
            <span className="text-xs text-muted-foreground break-words flex-1 mr-2">Requiere Rampa Vehicular:</span>
            <Badge variant={userRidePreferences.requiresRamp ? "default" : "outline"} className="text-xs py-0.5 px-2">
              {userRidePreferences.requiresRamp ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
              {userRidePreferences.requiresRamp ? "Sí" : "No"}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-md bg-card-foreground/5 border border-border/30 min-w-0">
            <span className="text-xs text-muted-foreground break-words flex-1 mr-2">Espacio Animal de Servicio:</span>
            <Badge variant={userRidePreferences.serviceAnimalSpace ? "default" : "outline"} className="text-xs py-0.5 px-2">
              {userRidePreferences.serviceAnimalSpace ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
              {userRidePreferences.serviceAnimalSpace ? "Sí" : "No"}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-md bg-card-foreground/5 border border-border/30 min-w-0">
            <span className="text-xs text-muted-foreground break-words flex-1 mr-2">Asistencia para Abordar:</span>
            <Badge variant={userRidePreferences.boardingAssistance ? "default" : "outline"} className="text-xs py-0.5 px-2">
              {userRidePreferences.boardingAssistance ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
              {userRidePreferences.boardingAssistance ? "Sí" : "No"}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-md bg-card-foreground/5 border border-border/30 min-w-0">
            <span className="text-xs text-muted-foreground break-words flex-1 mr-2">Prefiere Viaje Silencioso:</span>
            <Badge variant={userRidePreferences.prefersQuietRide ? "default" : "outline"} className="text-xs py-0.5 px-2">
              {userRidePreferences.prefersQuietRide ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
              {userRidePreferences.prefersQuietRide ? "Sí" : "No"}
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      {/* Card 3: Impacto y Sostenibilidad */}
      <Card className="shadow-md border-border/60 rounded-xl bg-card">
        <CardHeader className="p-3 md:p-4 border-b border-border/40">
          <CardTitle className="flex items-center text-base md:text-lg font-semibold text-foreground">
            <Leaf className="mr-2 h-5 w-5 text-green-500" /> {/* Consistent green for eco */}
            Impacto y Sostenibilidad
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="p-3 rounded-lg bg-card-foreground/5 border border-border/30 flex flex-col items-center text-center min-w-0">
            <Leaf className="h-7 w-7 text-green-500 mb-1.5" />
            <p className="text-xl font-bold text-foreground">{userImpactStats.ecoTrips}</p>
            <p className="text-xs text-muted-foreground mt-0.5 break-words">Viajes Eco Realizados</p>
          </div>
          <div className="p-3 rounded-lg bg-card-foreground/5 border border-border/30 flex flex-col items-center text-center min-w-0">
            <Sparkles className="h-7 w-7 text-green-500 mb-1.5" />
            <p className="text-xl font-bold text-foreground">{userImpactStats.co2Saved} kg</p>
            <p className="text-xs text-muted-foreground mt-0.5 break-words">Ahorro CO₂ (est.)</p>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Progreso de Lealtad */}
      <Card className="shadow-md border-border/60 rounded-xl bg-card">
        <CardHeader className="p-3 md:p-4 border-b border-border/40">
          <CardTitle className="flex items-center text-base md:text-lg font-semibold text-foreground">
            <TrendingUp className="mr-2 h-5 w-5 text-accent" />
            Progreso de Lealtad WheelTaxi
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-4 space-y-2">
          <div className="text-center sm:text-left min-w-0">
            <p className="text-xs text-muted-foreground break-words">Nivel Actual: <Badge variant="secondary" className="text-xs py-0.5 px-1.5">{userLoyaltyProgress.currentTier}</Badge></p>
            <p className="text-xs text-muted-foreground mt-1 break-words">
              Próximo Nivel: <span className="font-semibold text-accent">{userLoyaltyProgress.nextTier}</span> - <span className="text-foreground font-medium">{userLoyaltyProgress.currentPoints} / {userLoyaltyProgress.pointsForNextTier} PTS</span>
            </p>
          </div>
          <Progress 
            value={(userLoyaltyProgress.currentPoints / userLoyaltyProgress.pointsForNextTier) * 100} 
            aria-label={`Progreso a ${userLoyaltyProgress.nextTier}`}
            className="h-2.5 bg-muted" 
          />
           <p className="text-xs text-muted-foreground/80 text-center sm:text-right pt-1 break-words">
            Sigue viajando para desbloquear más beneficios.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

    