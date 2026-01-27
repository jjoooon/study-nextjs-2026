'use client';

import { useMemo } from 'react';

import { useGetDashboardStatsQuery } from '@/features/dashboard/services/dashboardService';

interface Stat {
  id: number;
  label: string;
  value: string;
  change: string;
}

/**
 * Dashboard Statistics Component
 *
 * Vercel React Best Practices - rerender-memo 규칙 적용
 *
 * @description
 * RTK Query로 통계 데이터를 가져오고 useMemo로 비용 계산 캐싱
 *
 * @optimization
 * - useMemo로 statsArray 계산 캐싱
 * - stats 변경 시에만 재계산
 * - 불필요한 toLocaleString() 및 Math.round() 호출 방지
 */
export default function DashboardStats() {
  // ✅ RTK Query 사용
  const { data: stats, isLoading, isError } = useGetDashboardStatsQuery();

  // ✅ Vercel Best Practices - rerender-memo
  // stats 변경 시에만 statsArray 재계산
  const statsArray: Stat[] = useMemo(
    () =>
      stats
        ? [
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
          ]
        : [],
    [stats] // stats 객체가 변경될 때만 재계산
  );

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

  // ✅ Vercel Best Practices - rendering-conditional-render
  // 삼항 연산자로 명시적 처리 (빈 배열 체크)
  return statsArray.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsArray.map((stat) => (
        <div key={stat.id} className="bg-white p-6 rounded-lg shadow-xs border border-gray-200">
          <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
          <p className="text-sm text-green-600 mt-2">{stat.change}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <p className="text-gray-600">통계 데이터가 없습니다.</p>
    </div>
  );
}
