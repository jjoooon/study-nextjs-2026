'use client';

import { useGetDashboardStatsQuery } from '@/features/dashboard/store/apiSlice';

interface Stat {
  id: number;
  label: string;
  value: string;
  change: string;
}

/**
 * Dashboard Statistics Component
 *
 * RTK Query를 사용하여 통계 데이터를 가져옵니다
 */
export default function DashboardStats() {
  // ✅ RTK Query 사용
  const { data: stats, isLoading, isError } = useGetDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">Failed to load statistics</p>
      </div>
    );
  }

  // ✅ API 데이터 객체를 UI에 맞는 배열로 변환
  const statsArray: Stat[] = stats ? [
    {
      id: 1,
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: `+${stats.growthRate}%`,
    },
    {
      id: 2,
      label: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total`,
    },
    {
      id: 3,
      label: 'Total Posts',
      value: stats.totalPosts.toLocaleString(),
      change: `↑ ${Math.round(stats.totalPosts / stats.activeUsers)} per user`,
    },
    {
      id: 4,
      label: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: `+${Math.round(stats.revenue / stats.totalUsers)} per user`,
    },
  ] : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsArray.map((stat) => (
        <div
          key={stat.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
          <p className="text-sm text-green-600 mt-2">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}
