import { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ContentLoader } from '@/shared/components';

// Lazy load dashboard widgets for code splitting
const DashboardStats = dynamic(
  () => import('@/features/dashboard').then(m => ({ default: m.DashboardStats })),
  {
    loading: () => <ContentLoader type="skeleton" />,
    ssr: true,
  }
);

const RecentActivity = dynamic(
  () => import('@/features/dashboard').then(m => ({ default: m.RecentActivity })),
  {
    loading: () => <ContentLoader type="skeleton" />,
  }
);

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal dashboard',
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg text-gray-700 mb-8">
        Welcome to your dashboard. This is a protected route.
      </p>

      <div className="space-y-6">
        {/* Stats section - loaded separately */}
        <Suspense fallback={<ContentLoader type="skeleton" />}>
          <DashboardStats />
        </Suspense>

        {/* Activity section - loaded separately */}
        <Suspense fallback={<ContentLoader type="skeleton" />}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  );
}
