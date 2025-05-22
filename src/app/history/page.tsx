
// src/app/history/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, MapPin, CalendarDays, DollarSign, ChevronRight, Info, UserCircle, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

// Dummy data, in a real app this would come from an API
const travelHistory = [
  { id: "1", destination: "Av. Real 123, El Tambo", date: "15 Julio 2025", time: "10:30 AM", amount: "12.50", driver: "Carlos V." },
  { id: "2", destination: "Clínica Ortega, San Carlos", date: "10 Julio 2025", time: "02:15 PM", amount: "9.00", driver: "Luisa M." },
  { id: "3", destination: "Mercado Mayorista, Chilca", date: "05 Julio 2025", time: "09:00 AM", amount: "15.00", driver: "Juan P." },
  { id: "4", destination: "Parque de la Identidad Wanka", date: "01 Julio 2025", time: "04:45 PM", amount: "7.50", driver: "Sofia R." },
];


export default function HistoryPage() {
  const router = useRouter(); // Initialize useRouter

  const goToEvaluateTrip = (trip: typeof travelHistory[0]) => {
    router.push(
      `/evaluate-trip?tripId=${encodeURIComponent(trip.id)}&destination=${encodeURIComponent(trip.destination)}&date=${encodeURIComponent(trip.date + " " + trip.time)}&driverName=${encodeURIComponent(trip.driver)}`
    );
  };

  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <Card className="shadow-lg border-border/70 rounded-xl bg-card overflow-hidden">
        <CardHeader className="border-b border-border/50 pb-4 p-5">
          <CardTitle className="flex items-center text-2xl font-semibold text-foreground">
            <History className="mr-3 h-7 w-7 text-primary" />
            Historial de Viajes
          </CardTitle>
          <CardDescription className="text-card-foreground/80">Consulta tus viajes anteriores y deja tu evaluación.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {travelHistory.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Info className="mx-auto h-12 w-12 mb-3 text-primary" />
              <p className="text-lg mb-1">Aún no tienes viajes registrados.</p>
              <p className="text-sm mb-3">Tu historial aparecerá aquí una vez que completes tu primer viaje.</p>
              <Link href="/" passHref>
                <Button variant="default">Realizar mi primer viaje</Button>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border/50">
              {travelHistory.map((trip) => (
                <li key={trip.id} className="hover:bg-card-foreground/5 transition-colors group">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <p className="font-semibold text-foreground truncate flex items-center text-base group-hover:text-primary transition-colors">
                          <MapPin className="mr-2 h-4 w-4 text-primary shrink-0" /> {trip.destination}
                        </p>
                        <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="flex items-center"><CalendarDays className="mr-1 h-3.5 w-3.5" /> {trip.date} - {trip.time}</span>
                          <span className="flex items-center"><DollarSign className="mr-1 h-3.5 w-3.5" /> S/ {trip.amount}</span>
                          <span className="flex items-center"><UserCircle className="mr-1 h-3.5 w-3.5" /> Conductor: {trip.driver}</span>
                        </div>
                      </div>
                      {/* <ChevronRight className="h-5 w-5 text-muted-foreground ml-2 shrink-0 group-hover:text-primary transition-colors" /> */}
                    </div>
                     <Button 
                        onClick={() => goToEvaluateTrip(trip)} 
                        variant="outline" 
                        size="sm"
                        className="mt-3 w-full sm:w-auto text-sm border-primary text-primary hover:bg-primary/10"
                        aria-label={`Evaluar viaje a ${trip.destination} el ${trip.date}`}
                      >
                        <Star className="mr-2 h-4 w-4" /> Evaluar Viaje
                      </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
    
    