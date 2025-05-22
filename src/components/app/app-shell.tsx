
// src/components/app/app-shell.tsx
"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; 
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, History, Award, BarChart2, MessageSquare, User, Settings, LogOut, HelpCircle, Info, Accessibility as AccessibilityIcon, Route as RouteIcon, Star } from "lucide-react"; 
import Link from "next/link";
import { useToast } from "@/hooks/use-toast"; 
import { WheelTaxiLogo } from "@/components/app/wheel-taxi-logo";

const navItems = [
  { href: "/", label: "Inicio", icon: Home, tooltip: "Pantalla Principal" },
  { href: "/route-planner", label: "Planificar Ruta", icon: RouteIcon, tooltip: "Generar rutas accesibles" },
  { href: "/history", label: "Historial", icon: History, tooltip: "Ver viajes pasados y evaluar" },
  { href: "/rewards", label: "Recompensas", icon: Award, tooltip: "Mis beneficios" },
  { href: "/stats", label: "Estadísticas", icon: BarChart2, tooltip: "Tu actividad" },
  { href: "/accessibility-insights", label: "Info. Accesibilidad", icon: AccessibilityIcon, tooltip: "Consultar accesibilidad de lugares (IA)" },
];

const accountManagementItems = [
  { href: "/profile", label: "Mi Perfil", icon: User, tooltip: "Editar perfil" },
  { href: "/settings", label: "Configuración", icon: Settings, tooltip: "Ajustes de la app" },
];

const supportItems = [
 { href: "/support", label: "Soporte", icon: MessageSquare, tooltip: "Ayuda y contacto" },
 { href: "/faq", label: "FAQ", icon: HelpCircle, tooltip: "Preguntas Frecuentes"}
];


export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [userName, setUserName] = useState("Usuario");
  const [userInitial, setUserInitial] = useState("U");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem("userName");
      const storedEmail = localStorage.getItem("userEmail");
      
      let displayName = "Usuario";
      if (storedName) {
        displayName = storedName;
      } else if (storedEmail) {
        displayName = storedEmail.split('@')[0]; // Use part before @ from email if name not set
      }
      
      setUserName(displayName);
      setUserInitial(displayName.substring(0, 1).toUpperCase() || "U");
    }
  }, [pathname]); // Re-run on pathname change in case user details are updated on profile page for example


  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
    }
    toast({
      title: "Sesión Cerrada",
      description: "Has cerrado sesión exitosamente. Serás redirigido.",
    });
    router.push("/auth/login"); 
    router.refresh(); 
  };
  

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-slate-900/95"> 
        <div
          className="relative flex w-full bg-card shadow-2xl overflow-hidden h-screen md:max-h-[calc(100vh-4rem)] md:max-w-[390px] md:rounded-xl md:border border-border/30" 
        >
          <Sidebar side="left" collapsible="icon" variant="sidebar"> 
            <SidebarHeader className="p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage src={`https://picsum.photos/seed/${userInitial}/100/100?grayscale`} alt={userName} data-ai-hint="user avatar" />
                  <AvatarFallback className="text-lg bg-sidebar-accent text-sidebar-accent-foreground">{userInitial}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="text-lg font-semibold text-sidebar-foreground truncate" title={userName}>{userName}</p>
                  <Link href="/profile" className="text-xs text-primary hover:underline">
                    Ver Perfil
                  </Link>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent className="p-2 flex-grow"> 
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <Link href={item.href} passHref legacyBehavior>
                      <SidebarMenuButton
                        isActive={pathname === item.href || (item.href === "/history" && pathname.startsWith("/evaluate-trip"))}
                        className="text-base"
                        tooltip={item.tooltip}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              
              <SidebarMenu className="mt-4 pt-4 border-t border-sidebar-border">
                 <p className="px-2 text-xs text-sidebar-foreground/70 mb-1 group-data-[collapsible=icon]:hidden">Cuenta</p>
                 {accountManagementItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <Link href={item.href} passHref legacyBehavior>
                      <SidebarMenuButton
                        isActive={pathname === item.href}
                        className="text-base"
                        tooltip={item.tooltip}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>

               <SidebarMenu className="mt-4 pt-4 border-t border-sidebar-border">
                 <p className="px-2 text-xs text-sidebar-foreground/70 mb-1 group-data-[collapsible=icon]:hidden">Ayuda</p>
                 {supportItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <Link href={item.href} passHref legacyBehavior>
                      <SidebarMenuButton
                        isActive={pathname === item.href}
                        className="text-base"
                        tooltip={item.tooltip}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>

            </SidebarContent>
            <SidebarFooter className="p-2 border-t border-sidebar-border">
               <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton className="text-base w-full" variant="destructive" onClick={handleLogout} tooltip="Cerrar tu sesión">
                      <LogOut className="h-5 w-5" />
                      <span>Cerrar Sesión</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="flex flex-col !p-0 min-w-0">
            <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 bg-card/80 backdrop-blur-md border-b border-border">
              <SidebarTrigger className="text-foreground hover:text-primary" />
              <Link href="/" className="flex items-center gap-2 group">
                <WheelTaxiLogo className="h-7 w-7 text-primary"/>
                <h1 className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">WheelTaxi</h1>
              </Link>
              <div className="w-8"> </div> {/* Spacer for centering title */}
            </header>
            <main className="flex-1 overflow-y-auto bg-background min-w-0"> 
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
    
    