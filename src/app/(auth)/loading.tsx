export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Logo skeleton */}
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>

            {/* Form skeleton */}
            <div className="space-y-4 mt-6">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
