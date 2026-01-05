import { ReactNode } from 'react';

interface ContentLoaderProps {
  type?: 'spinner' | 'skeleton' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ContentLoader({
  type = 'spinner',
  size = 'md',
  className = '',
}: ContentLoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  if (type === 'skeleton') {
    return (
      <div className={`animate-pulse space-y-3 ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      ></div>
    </div>
  );
}

// Preset loaders for common use cases
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ContentLoader type="spinner" size="lg" />
    </div>
  );
}

export function CardLoader({ count = 1 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}

interface AsyncContentProps {
  children: ReactNode;
  loading?: boolean;
  error?: Error | null;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

export function AsyncContent({
  children,
  loading = false,
  error = null,
  fallback,
  errorFallback,
}: AsyncContentProps) {
  if (error) {
    return (
      errorFallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      )
    );
  }

  if (loading) {
    return fallback || <ContentLoader type="skeleton" />;
  }

  return <>{children}</>;
}
