export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar skeleton */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </aside>

        {/* Main content skeleton */}
        <main className="flex-1 p-8">
          <div className="animate-pulse space-y-6">
            {/* Header skeleton */}
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>

            {/* Cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
              <div className="h-32 bg-gray-200 rounded-lg"></div>
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Content skeleton */}
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
