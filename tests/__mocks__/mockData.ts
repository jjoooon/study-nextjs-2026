// Mock user data
export const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

export const mockUser = mockUsers[0];

// Mock auth data
export const mockAuthState = {
  isAuthenticated: true,
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  },
  token: 'mock-token-123',
  isLoading: false,
  error: null,
};

// Mock UI state
export const mockUIState = {
  sidebar: { isOpen: true },
  modal: { isOpen: false, type: null, data: null },
  toast: null,
  theme: 'light' as const,
};

// Mock dashboard state
export const mockDashboardState = {
  widgets: [
    { id: 'stats', type: 'stats' as const, position: 1, isVisible: true },
    { id: 'activity', type: 'activity' as const, position: 2, isVisible: true },
  ],
  isLoading: false,
  lastUpdated: '2024-01-01T00:00:00.000Z',
};

// Mock performance data
export const mockPerformanceData = {
  webVitals: {
    fcp: 1200,
    lcp: 2000,
    fid: 50,
    cls: 0.05,
    ttfb: 300,
    loadTime: 2500,
  },
  memory: {
    usedJSHeapSize: 50 * 1024 * 1024,
    totalJSHeapSize: 60 * 1024 * 1024,
    jsHeapSizeLimit: 2048 * 1024 * 1024,
    usagePercentage: 2.44,
  },
  bundle: {
    total: 250 * 1024,
    files: [
      { name: 'main.js', size: 150 * 1024, duration: 100 },
      { name: 'vendor.js', size: 100 * 1024, duration: 80 },
    ],
  },
};
