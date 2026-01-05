import { Suspense as ReactSuspense, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SuspenseBoundary({
  children,
  fallback,
}: SuspenseBoundaryProps) {
  return (
    <ReactSuspense
      fallback={
        fallback || (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )
      }
    >
      {children}
    </ReactSuspense>
  );
}

// Alias for easier import
export const Suspense = SuspenseBoundary;
