'use client';

import { useEffect, useState } from 'react';

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setActivities([
        { id: 1, user: 'John Doe', action: 'Created a new project', time: '2 minutes ago' },
        { id: 2, user: 'Jane Smith', action: 'Updated profile', time: '15 minutes ago' },
        { id: 3, user: 'Bob Johnson', action: 'Completed task', time: '1 hour ago' },
      ]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div className="p-6 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {activity.user.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{' '}
                <span className="text-gray-600">{activity.action}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
