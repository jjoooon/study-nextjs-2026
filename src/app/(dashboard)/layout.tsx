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
        {/* Sidebar placeholder */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-4">
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100">
              Dashboard
            </a>
            <a href="/settings" className="block px-4 py-2 rounded hover:bg-gray-100">
              Settings
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
