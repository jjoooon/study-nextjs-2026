export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
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
