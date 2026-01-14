'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    // TODO: Implement actual authentication check
    // const isAuthenticated = checkAuth();
    // if (!isAuthenticated) {
    //   router.push('/login');
    // }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
