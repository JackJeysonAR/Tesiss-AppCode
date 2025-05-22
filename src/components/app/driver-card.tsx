// src/components/app/driver-card.tsx

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ShieldCheck, Smile, Clock, MapPin as MapPinIcon, CheckCircle, Car } from "lucide-react"; 
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator"; // Added import

interface DriverCardProps {
  name: string;
  imageUrl: string;
  rating: number;
  certifications: string[];
  ratingsBreakdown: {
    friendliness: number;
    punctuality: number;
    routeKnowledge: number;
  };
  vehicleModel: string;
  licensePlate: string;
  vehicleType?: string;
  vehicleFeatures?: string[];
}

// Custom Wheelchair accessible icon
const WheelchairAccessibleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
    <path d="m.913 14.708.558-1.15A3 3 0 0 1 4.1 11.5h8.8a3 3 0 0 1 2.628 2.058l.558 1.15a1 1 0 0 0 1.802-.868l-.558-1.15A5 5 0 0 0 12.9 9.5H4.1a5 5 0 0 0-4.372 6.76l.558 1.15a1 1 0 0 0 1.802-.868Z"/>
    <path d="M10.5 11.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
    <path d="M12.5 20.5a1 1 0 1 0 2 0v-3.62a1 1 0 0 0-.504-.864L10.5 13.5H6.4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1Z"/>
  </svg>
);


export function DriverCard({
  name,
  imageUrl,
  rating,
  certifications,
  ratingsBreakdown,
  vehicleModel,
  licensePlate,
  vehicleType,
  vehicleFeatures
}: DriverCardProps) {
  return (
    <Card className="shadow-xl bg-card border-border/70 rounded-xl overflow-hidden">
      <CardHeader className="p-4 border-b border-border/50">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20 border-2 border-primary rounded-lg shrink-0">
            <AvatarImage src={imageUrl} alt={name} data-ai-hint="driver portrait" className="rounded-md" />
            <AvatarFallback className="rounded-md text-2xl bg-muted text-muted-foreground">{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0"> {/* Crucial for text wrapping if name is long */}
            <CardTitle className="text-xl text-foreground break-words min-w-0">{name}</CardTitle>
            <div className="flex items-center mt-1">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1 shrink-0" />
              <span className="text-lg font-semibold text-foreground">{rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground ml-1.5 whitespace-nowrap">({Math.floor(Math.random()*100 + 50)} valoraciones)</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5"> {/* Reduced gap */}
              {certifications.map((cert, idx) => {
                const isAdapted = cert.toLowerCase().includes("adaptado") || cert.toLowerCase().includes("accesible");
                return (
                  <Badge 
                    key={idx} 
                    variant={isAdapted ? "default" : "secondary"} 
                    className={`
                      ${isAdapted ? 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary/70' 
                                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/90 border-secondary/70'} 
                      text-xs px-1.5 py-0.5 rounded-md whitespace-nowrap
                    `}
                  >
                    {isAdapted ? <WheelchairAccessibleIcon className="h-3 w-3 mr-1 stroke-primary-foreground" /> : <CheckCircle className="h-3 w-3 mr-1" />} 
                    {cert}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center">
            <Car className="h-4 w-4 mr-2 text-primary shrink-0" />
            Vehículo Asignado
          </h4>
          <div className="pl-6 space-y-1">
            <p className="text-foreground font-semibold break-words">{vehicleModel} - <span className="font-normal">{licensePlate}</span></p>
            {vehicleType && <p className="text-sm text-primary font-medium break-words">{vehicleType}</p>}
            {vehicleFeatures && vehicleFeatures.length > 0 && (
              <div className="mt-1">
                <p className="text-xs font-medium text-muted-foreground mb-0.5">Características Destacadas:</p>
                <ul className="space-y-0.5">
                  {vehicleFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground break-words flex-1 min-w-0">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <Separator className="bg-border/40"/>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Valoraciones Específicas:</h4>
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-foreground min-w-0 mr-2"> {/* min-w-0 para wrapping */}
                <Smile className="h-4 w-4 mr-2 text-primary shrink-0" /> 
                <span className="break-words">Amabilidad y Trato:</span>
              </div>
              <div className="flex items-center shrink-0">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4.5 w-4.5 ${i < ratingsBreakdown.friendliness ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-foreground min-w-0 mr-2">
                <Clock className="h-4 w-4 mr-2 text-primary shrink-0" /> 
                <span className="break-words">Puntualidad:</span>
              </div>
              <div className="flex items-center shrink-0">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4.5 w-4.5 ${i < ratingsBreakdown.punctuality ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-foreground min-w-0 mr-2">
                <MapPinIcon className="h-4 w-4 mr-2 text-primary shrink-0" /> 
                <span className="break-words">Conocimiento de Rutas Accesibles:</span>
              </div>
              <div className="flex items-center shrink-0">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4.5 w-4.5 ${i < ratingsBreakdown.routeKnowledge ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
