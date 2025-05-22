// src/components/app/wheel-taxi-logo.tsx
import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

interface WheelTaxiLogoProps extends SVGProps<SVGSVGElement> {}

export function WheelTaxiLogo({ className, ...props }: WheelTaxiLogoProps) {
  return (
    <svg
      className={cn("text-primary", className)} // Default class, can be overridden
      viewBox="0 0 64 64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M32 4C16.432 4 4 16.432 4 32s12.432 28 28 28 28-12.432 28-28S47.568 4 32 4zm0 52c-13.255 0-24-10.745-24-24S18.745 8 32 8s24 10.745 24 24-10.745 24-24 24z" />
      <path d="M32 16c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
      <path d="M46.668 34.668A1.994 1.994 0 0048 36v2c0 1.103-.897 2-2 2h-2v4h-4v-4h-4v4h-4v-4h-4v4H20v-4h-2c-1.103 0-2-.897-2-2v-2c0-.748.414-1.402.932-1.732l-2.735-6.38A2.004 2.004 0 0118 26h28a2.004 2.004 0 011.803 2.288l-2.735 6.38zM22 36h20v-4H22v4z" />
    </svg>
  );
}
