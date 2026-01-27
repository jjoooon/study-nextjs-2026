'use client';

import { useGetRecentActivityQuery } from '@/features/dashboard/services/dashboardService';

/**
 * Recent Activity Component
 *
 * RTK Query를 사용하여 최근 활동 데이터를 가져옵니다
 */
export default function RecentActivity() {
  // ✅ RTK Query 사용
  const { data: activities, isLoading, isError } = useGetRecentActivityQuery();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">Failed to load recent activity</p>
      </div>
    );
  }

  // ✅ 타임스탬프를 상대 시간으로 변환하는 헬퍼 함수
  const formatRelativeTime = (timestamp: string): string => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-xs border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div className="p-6 space-y-4">
        {activities?.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">{activity.user.name.charAt(0)}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user.name}</span>{' '}
                <span className="text-gray-600">{activity.message}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
