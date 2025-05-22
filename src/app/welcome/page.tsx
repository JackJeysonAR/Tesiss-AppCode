// src/app/welcome/page.tsx
"use client";

import { WheelTaxiLogo } from '@/components/app/wheel-taxi-logo';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-slate-900/90 text-foreground p-4">
      <div className="text-center space-y-6">
        <WheelTaxiLogo className="h-24 w-24 md:h-32 md:w-32 text-primary animate-pulse" />
        <h1 className="text-5xl md:text-6xl font-bold text-primary tracking-tight">
          WheelTaxi
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Tu viaje accesible en Huancayo.
        </p>
        <div className="flex items-center justify-center pt-4">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
          <p className="ml-4 text-lg text-foreground">Cargando tu experiencia...</p>
        </div>
      </div>
      <footer className="absolute bottom-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} WheelTaxi. Todos los derechos reservados.</p>
        <p>Innovación para la movilidad inclusiva.</p>
      </footer>
    </div>
  );
}
