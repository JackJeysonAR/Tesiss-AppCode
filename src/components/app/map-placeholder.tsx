// src/components/app/map-placeholder.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MapPlaceholderProps {
  routeHighlighted?: boolean;
  className?: string;
}

export function MapPlaceholder({ routeHighlighted = false, className }: MapPlaceholderProps) {
  const imageUrl = routeHighlighted
    ? "https://picsum.photos/seed/maproute/390/400" // Adjusted width for typical mobile portrait
    : "https://picsum.photos/seed/mapmain/390/844"; // Adjusted for typical mobile portrait height
  const altText = routeHighlighted ? "Mapa con ruta destacada" : "Mapa interactivo de Huancayo";
  const hint = routeHighlighted ? "map route" : "city map";
  
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        src={imageUrl}
        alt={altText}
        fill={true}
        style={{ objectFit: 'cover' }}
        priority // Ensures the map background loads promptly
        data-ai-hint={hint}
        className="rounded-b-lg" // This applies to the <img> tag itself
      />
      {routeHighlighted && (
         <div 
           className="absolute inset-0"
           style={{
             backgroundImage: "linear-gradient(to bottom, hsla(var(--primary) / 0.2) 0%, hsla(var(--secondary) / 0.3) 50%, hsla(var(--accent) / 0.2) 100%)",
             mixBlendMode: "overlay"
           }}
          />
      )}
       <div className="absolute top-2 left-2 bg-card/80 p-1.5 px-2.5 rounded-md text-xs text-card-foreground backdrop-blur-sm shadow-md border border-border/50">
        Huancayo Centro
      </div>
    </div>
  );
}
