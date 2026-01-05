'use client';

import { useEffect, useState } from 'react';

interface Stat {
  id: number;
  label: string;
  value: string;
  change: string;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setStats([
        { id: 1, label: 'Total Users', value: '1,234', change: '+12%' },
        { id: 2, label: 'Active Sessions', value: '456', change: '+5%' },
        { id: 3, label: 'Revenue', value: '$12,345', change: '+18%' },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
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
