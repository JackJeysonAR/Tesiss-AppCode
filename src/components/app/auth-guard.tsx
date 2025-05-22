// src/components/app/auth-guard.tsx
"use client";

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppShell } from '@/components/app/app-shell';
import WelcomePage from '@/app/welcome/page'; 
import { Loader2 } from 'lucide-react';

// Mock authentication check
const checkAuth = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  return false;
};

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authState, setAuthState] = useState<'welcomeScreen' | 'authLoading' | 'ready'>('welcomeScreen');
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Effect for welcome screen timer
  useEffect(() => {
    if (authState === 'welcomeScreen') {
      const welcomeTimerId = setTimeout(() => {
        setAuthState('authLoading'); 
      }, 2500); 
      return () => clearTimeout(welcomeTimerId);
    }
  }, [authState]);

  // Effect for auth checking and redirection logic
  useEffect(() => {
    if (authState === 'authLoading') {
      setAuthState('ready');
      return; 
    }

    if (authState !== 'ready') {
      return;
    }

    const isAuthenticated = checkAuth();
    const publicPaths = ['/auth/login', '/auth/register', '/welcome'];
    const currentPath = pathname || "";
    const pathIsPublic = publicPaths.some(publicPath => currentPath.startsWith(publicPath));

    if (!isAuthenticated && !pathIsPublic) {
      router.push('/auth/login');
    } else if (isAuthenticated && pathIsPublic) {
      if (currentPath !== '/') {
        router.push('/');
        router.refresh(); // Crucial for AppShell to show up after login/register
      }
    }
    setInitialCheckDone(true); // Mark that the initial auth check and potential redirect have been processed.

  }, [authState, pathname, router]);


  // Render based on authState and initial check status
  if (authState === 'welcomeScreen') {
    return <WelcomePage />;
  }

  if (authState === 'authLoading' || !initialCheckDone) {
    // Show loader while auth is loading OR if the initial check (and potential redirect) hasn't finished yet
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Verificando tu sesión...</p>
      </div>
    );
  }

  // authState is 'ready' and initial check is done.
  const isAuthenticatedForRender = checkAuth();
  const publicPaths = ['/auth/login', '/auth/register', '/welcome'];
  const currentPathForRender = pathname || "";
  const pathIsPublicForRender = publicPaths.some(publicPath => currentPathForRender.startsWith(publicPath));

  if (isAuthenticatedForRender && !pathIsPublicForRender) {
    return <AppShell>{children}</AppShell>;
  }
  
  if (pathIsPublicForRender || !isAuthenticatedForRender) {
    return <>{children}</>;
  }
  
  // Fallback, should not be reached if logic is sound.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg">Cargando...</p>
    </div>
  );
}
