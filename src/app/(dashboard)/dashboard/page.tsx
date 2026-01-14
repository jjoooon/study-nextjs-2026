'use client';

/**
 * Dashboard Page with Dynamic Reducer Pattern
 *
 * 이 페이지는 Dynamic Reducer Pattern을 사용하여 Dashboard feature를 보여줍니다.
 *
 * @architecture
 * - 지연 로딩: Dashboard 리듀서가 필요할 때만 로드
 * - Code Splitting: 초기 번들 크기 최적화
 * - Conditional Rendering: 리듀서 주입 후에만 컴포넌트 렌더링
 *
 * @benefits
 * - 초기 로딩 속도 향상
 * - 번들 크기 감소
 * - 불필요한 방어 로직 제거
 * - 깨끗한 코드 구조
 */

import { useEffect, useState } from 'react';

import { dashboardReducer, DashboardStats, RecentActivity, useDashboard } from '@/features/dashboard';
import type { Widget } from '@/features/dashboard/types';
import { useInjectReducer } from '@/store/reducers/hooks';

/**
 * Dashboard 컴포넌트 (실제 내용)
 * 리듀서가 주입된 후에만 렌더링됩니다.
 */
function DashboardContent() {
  const [injectionTime, setInjectionTime] = useState<number | null>(null);
  const [hasLogged, setHasLogged] = useState(false);

  // Injection time 측정 (development mode에서만)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !hasLogged) {
      const startTime = performance.now();
      const timer = requestAnimationFrame(() => {
        const endTime = performance.now();
        setInjectionTime(endTime - startTime);
        setHasLogged(true);
        console.log('[Dashboard] Reducer injection time:', `${(endTime - startTime).toFixed(2)}ms`);
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [hasLogged]);

  const { widgets, isLoading, lastUpdated, toggleWidget, refetchData } = useDashboard();

  const handleFetchData = async () => {
    await refetchData();
  };

  const statsWidget = widgets.find((w: Widget) => w.id === 'stats');
  const activityWidget = widgets.find((w: Widget) => w.id === 'activity');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard (Dynamic Reducer Pattern)</h1>
          <p className="text-gray-600">
            이 페이지는 공통 <code className="bg-gray-100 px-2 py-1 rounded">useInjectReducer</code> hook을 사용하여
            Dashboard feature를 보여줍니다.
          </p>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Reducer Injected:</span>
              <span className="font-semibold text-green-600">✅ Yes</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Injection Time:</span>
              <span className="font-semibold text-blue-600">
                {injectionTime ? `${injectionTime.toFixed(2)}ms` : '-'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Loading Status:</span>
              <span className={`font-semibold ${isLoading ? 'text-yellow-600' : 'text-gray-600'}`}>
                {isLoading ? '⏳ Loading...' : '✅ Ready'}
              </span>
            </div>
          </div>

          {lastUpdated && (
            <div className="mt-4 text-sm text-gray-500">Last Updated: {new Date(lastUpdated).toLocaleString()}</div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleFetchData}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Loading...' : 'Fetch Dashboard Data'}
            </button>

            {statsWidget && (
              <button
                onClick={() => toggleWidget('stats')}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                {statsWidget.isVisible ? 'Hide' : 'Show'} Stats Widget
              </button>
            )}

            {activityWidget && (
              <button
                onClick={() => toggleWidget('activity')}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                {activityWidget.isVisible ? 'Hide' : 'Show'} Activity Widget
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="space-y-6">
          {/* Stats Widget */}
          {statsWidget?.isVisible && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Statistics Widget</h2>
              <DashboardStats />
            </div>
          )}

          {/* Activity Widget */}
          {activityWidget?.isVisible && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity Widget</h2>
              <RecentActivity />
            </div>
          )}
        </div>

        {/* Technical Details */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">🔧 Technical Details</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              <strong>Dynamic Reducer Injection:</strong> 공통{' '}
              <code className="bg-blue-100 px-1 rounded">useInjectReducer</code> hook을 사용하여 필요할 때만 로드
            </li>
            <li>
              <strong>Conditional Rendering:</strong> 리듀서 주입 후에만 컴포넌트 렌더링 (방어 로직 불필요)
            </li>
            <li>
              <strong>RTK Query Integration:</strong>{' '}
              <code className="bg-blue-100 px-1 rounded">dashboardApiSlice</code>로 API 데이터 fetching 및 캐싱
            </li>
            <li>
              <strong>Separation of Concerns:</strong> UI 상태(dashboardSlice)와 API 데이터(dashboardApiSlice) 분리
            </li>
            <li>
              <strong>Code Splitting:</strong> 초기 번들 크기를 최적화합니다.
            </li>
            <li>
              <strong>MSW Integration:</strong> API 요청이 Mock Service Worker로 처리됩니다.
            </li>
            <li>
              <strong>Performance:</strong> Injection Time은 리듀서 로드에 걸린 시간을 나타냅니다.
            </li>
          </ul>
        </div>

        {/* Widget Configuration */}
        <div className="mt-6 bg-gray-100 border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Current Widget Configuration</h3>
          <div className="space-y-2">
            {widgets.map((widget: Widget) => (
              <div key={widget.id} className="flex items-center justify-between text-sm">
                <span className="font-medium">{widget.id}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Type: {widget.type}</span>
                  <span className="text-gray-600">Position: {widget.position}</span>
                  <span className={`font-semibold ${widget.isVisible ? 'text-green-600' : 'text-red-600'}`}>
                    {widget.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 메인 페이지 컴포넌트
 * 리듀서를 주입하고 준비되면 실제 컨텐츠를 렌더링합니다.
 */
export default function Page() {
  const [isReady, setIsReady] = useState(false);

  // 1️⃣ UI 리듀서만 동적 주입 (dashboardApi는 이미 초기에 로드됨)
  useInjectReducer('dashboard', dashboardReducer, {
    priority: 22,
    ejectOnUnmount: false,
  });

  // 2️⃣ 리듀서 주입 후 렌더링
  useEffect(() => {
    // 다음 tick에서 컴포넌트 렌더링
    const timer = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // 로딩 상태 표시
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // 3️⃣ 준비되면 실제 컨텐츠 렌더링
  return <DashboardContent />;
}
