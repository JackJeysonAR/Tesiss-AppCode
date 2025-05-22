
// src/app/rewards/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Award, Star, Leaf, CalendarCheck, Users, Zap, MessageSquarePlus, Crown, Info, Gift } from "lucide-react";

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ElementType;
  iconColor: string;
  cta: string;
  availability?: string;
}

const newAvailableRewards: Reward[] = [
  {
    id: "eco-discount",
    title: "Eco-Viaje Descuento",
    description: "10% off al elegir un vehículo eléctrico/híbrido. ¡Ayuda al planeta!",
    points: 120,
    icon: Leaf,
    iconColor: "text-green-500", // Consistent with existing theme for eco-friendly
    cta: "Aplicar Eco-Descuento",
    availability: "Sujeto a disponibilidad de vehículos eco.",
  },
  {
    id: "early-book-bonus",
    title: "Reserva Anticipada Plus",
    description: "Gana 50 Puntos extra al programar tu viaje con 24h+ de antelación.",
    points: 75,
    icon: CalendarCheck,
    iconColor: "text-blue-500", // Consistent with calendar/planning
    cta: "Activar Bono",
    availability: "Aplica a futuras reservas.",
  },
  {
    id: "referral-bonus",
    title: "Amigo WheelTaxi",
    description: "Recibe 100 Puntos por cada amigo invitado que complete su primer viaje.",
    points: 0, // Action, no point cost
    icon: Users,
    iconColor: "text-orange-500", // Consistent with social/referral
    cta: "Invitar Amigos",
  },
  {
    id: "weekly-rider",
    title: "Viajero Frecuente Semanal",
    description: "Completa 5+ viajes en una semana (Lun-Dom) y recibe 75 Puntos extra.",
    points: 200, // Point cost to "activate" or indicates a goal
    icon: Zap,
    iconColor: "text-yellow-500", // Consistent with energy/frequency
    cta: "Ver Progreso",
  },
  {
    id: "feedback-star",
    title: "Feedback Estrella",
    description: "Gana 30 Puntos por cada reseña detallada y útil post-viaje.",
    points: 50, // Point cost / reward value
    icon: MessageSquarePlus,
    iconColor: "text-purple-500", // Consistent with communication/feedback
    cta: "Dejar Reseña",
    availability: "Después de cada viaje.",
  },
  {
    id: "gold-status",
    title: "Nivel Oro WheelTaxi",
    description: "Alcanza 1000 Puntos y disfruta 5% off permanente y sorpresas.",
    points: 1000, // High point cost for a status
    icon: Crown,
    iconColor: "text-amber-500", // Gold/Amber for premium status
    cta: "Ver Beneficios Oro",
    availability: "Acumula 1000 Puntos Totales",
  },
];

export default function RewardsPage() {
  const { toast } = useToast();
  const userPoints = 280; // Ejemplo de puntos del usuario

  const handleClaimReward = (reward: Reward) => {
    if (reward.id === "referral-bonus" || reward.id === "feedback-star" || reward.id === "weekly-rider" || reward.id === "gold-status") {
       toast({
        title: `Acción: ${reward.title}`,
        description: `Serás redirigido para ${reward.description.toLowerCase().split(" gana")[0].split(" recibe")[0].split(" y disfruta")[0]}. (Función no implementada)`,
      });
      return;
    }

    if (userPoints < reward.points) {
      toast({
        title: "Puntos Insuficientes",
        description: `Necesitas ${reward.points - userPoints} puntos más para "${reward.title}".`,
        variant: "destructive",
      });
      return;
    }
    // Simular canje
    toast({
      title: "¡Recompensa Canjeada!",
      description: `Has canjeado "${reward.title}". Los puntos se deducirán de tu cuenta. (Simulación)`,
    });
  };

  return (
    <div className="p-4 h-full overflow-y-auto space-y-6 bg-background overflow-hidden">
      <Card className="shadow-xl border-border/70 rounded-xl bg-card overflow-hidden">
        <CardHeader className="border-b border-border/50 p-4 md:p-5">
          <CardTitle className="flex items-center text-xl md:text-2xl font-semibold text-foreground">
            <Award className="mr-2 md:mr-3 h-6 w-6 md:h-7 md:w-7 text-primary" />
            Mis Recompensas WheelTaxi
          </CardTitle>
          <CardDescription className="text-card-foreground/80 break-words text-sm">
            Tu lealtad tiene premio. Descubre y canjea beneficios exclusivos.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-5">
          <Card className="mb-6 bg-primary/10 border-2 border-primary/40 p-3 md:p-4 rounded-lg shadow-md">
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center justify-between gap-3">
              <div className="flex-1 sm:min-w-0">
                <p className="text-xs sm:text-sm text-primary font-semibold">Mis Puntos de Lealtad</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary flex items-center justify-center sm:justify-start">
                  <Star className="w-5 h-5 sm:w-6 sm:w-6 mr-1 sm:mr-1.5 fill-primary" /> {userPoints}
                  <span className="text-lg sm:text-xl ml-1">PTS</span>
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto sm:shrink-0 border-primary text-primary hover:bg-primary/20 hover:text-primary-foreground rounded-md py-1.5 px-3 text-xs">
                Ver Historial de Puntos
              </Button>
            </div>
          </Card>
        </CardContent>
      </Card>

      <div className="min-w-0">
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4 px-1 min-w-0">Recompensas Disponibles</h2>
        {newAvailableRewards.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:gap-5">
            {newAvailableRewards.map((reward) => {
              const IconComponent = reward.icon;
              const canClaim = reward.id === "referral-bonus" || reward.id === "feedback-star" || reward.id === "weekly-rider" || reward.id === "gold-status" || userPoints >= reward.points;
              const isActionType = reward.id === "referral-bonus" || reward.id === "feedback-star" || reward.id === "weekly-rider" || reward.id === "gold-status";

              return (
                <Card
                  key={reward.id}
                  className={`overflow-hidden shadow-lg bg-card border border-border/60 rounded-xl hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 ease-in-out flex flex-col ${!canClaim && !isActionType ? "opacity-70" : ""}`}
                >
                  <CardHeader className={`flex flex-row items-center gap-3 p-3 md:p-4 border-b ${reward.iconColor.replace('text-','border-')}/30 bg-card-foreground/5`}>
                    <IconComponent className={`h-7 w-7 ${reward.iconColor} shrink-0`} />
                    <CardTitle className="text-sm md:text-base font-semibold text-foreground break-words leading-tight flex-1 min-w-0">
                      {reward.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 md:p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm text-muted-foreground break-words leading-relaxed mb-1.5">
                        {reward.description}
                      </p>
                      {reward.availability && (
                        <p className="text-xs text-accent italic mb-1.5 break-words">
                          {reward.availability}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-1.5 md:pt-2">
                      <Badge
                        variant={isActionType ? "default" : (canClaim ? "default" : "outline")}
                        className={`text-xs py-0.5 px-2 ${
                          isActionType ? `bg-accent text-accent-foreground border-accent/50` :
                          (canClaim ? `${reward.iconColor.replace('text-','bg-').replace('-500','/20')} ${reward.iconColor} border-2 ${reward.iconColor.replace('text-','border-')}/50`
                                    : 'border-muted text-muted-foreground bg-muted/30')
                        }`}
                      >
                        {isActionType ? (
                            <Gift className="w-3 h-3 mr-1" />
                        ): (
                            <Star className={`w-3 h-3 mr-1 ${canClaim && !isActionType ? reward.iconColor.replace('text-', 'fill-') : 'fill-muted-foreground'}`} />
                        )}
                        {isActionType ? "Acción" : `${reward.points} PTS`}
                      </Badge>
                      <Button
                        size="sm"
                        variant={canClaim ? "default" : "outline"}
                        className={`
                          py-1.5 px-3 text-xs rounded-md shadow-sm
                          ${canClaim ? (isActionType ? 'bg-accent hover:bg-accent/80 text-accent-foreground' : 'bg-primary hover:bg-primary/80 text-primary-foreground')
                                    : 'border-muted text-muted-foreground bg-card hover:bg-muted/50'}
                          disabled:opacity-60
                        `}
                        onClick={() => handleClaimReward(reward)}
                        disabled={!isActionType && !canClaim}
                        aria-label={`${canClaim ? reward.cta : 'Puntos insuficientes para'} ${reward.title}`}
                      >
                        {canClaim ? reward.cta : "Insuficiente"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-10 bg-card border border-border/50 rounded-lg p-6">
            <Info className="mx-auto h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4 text-primary" />
            <p className="text-lg md:text-xl font-semibold mb-1 md:mb-2">¡Vaya! Aún no hay recompensas.</p>
            <p className="text-xs md:text-sm">Sigue viajando y acumulando puntos. Pronto aparecerán beneficios aquí.</p>
          </div>
        )}
      </div>

      <Card className="mt-6 md:mt-8 shadow-lg border-border/70 rounded-xl bg-card overflow-hidden">
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-base md:text-lg font-semibold text-foreground">¿Cómo ganar más puntos?</CardTitle>
        </CardHeader>
        <CardContent className="text-xs md:text-sm text-muted-foreground space-y-1 p-3 md:p-4 pt-0">
          <p>✓ Completa viajes con WheelTaxi.</p>
          <p>✓ Participa en promociones especiales.</p>
          <p>✓ Invita amigos a unirse a WheelTaxi.</p>
          <p>✓ ¡Mantente atento a nuevas formas de ganar!</p>
          <p className="text-xs text-muted-foreground/80 pt-1 md:pt-2">Consulta términos y condiciones.</p>
        </CardContent>
      </Card>
    </div>
  );
}
