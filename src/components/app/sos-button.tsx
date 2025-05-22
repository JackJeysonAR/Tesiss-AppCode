
"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SOSButton() {
  const { toast } = useToast();

  const handleSOS = () => {
    toast({
      title: "SOS Activado",
      description: "Tu ubicación y ruta han sido enviadas a tus contactos de emergencia.",
      variant: "destructive",
    });
    // Add actual SOS logic here (e.g., API call)
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-xl" // Adjusted bottom position
      onClick={handleSOS}
      aria-label="Botón de Emergencia SOS"
    >
      <AlertTriangle className="w-8 h-8" />
    </Button>
  );
}
