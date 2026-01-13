/**
 * Dashboard Mock Data
 *
 * Dashboard API 응답을 모킹하기 위한 데이터입니다.
 */

export const dashboardData = {
  stats: {
    totalUsers: 1250,
    activeUsers: 890,
    totalPosts: 3420,
    revenue: 45600,
    growthRate: 12.5,
  },
  recentActivity: [
    {
      id: '1',
      type: 'user',
      message: '새로운 사용자가 가입했습니다',
      timestamp: '2026-01-13T10:30:00Z',
      user: {
        name: '홍길동',
        email: 'hong@example.com',
      },
    },
    {
      id: '2',
      type: 'post',
      message: '새로운 게시글이 작성되었습니다',
      timestamp: '2026-01-13T09:15:00Z',
      user: {
        name: '김철수',
        email: 'kim@example.com',
      },
    },
    {
      id: '3',
      type: 'comment',
      message: '댓글이 추가되었습니다',
      timestamp: '2026-01-13T08:45:00Z',
      user: {
        name: '이영희',
        email: 'lee@example.com',
      },
    },
  ],
  widgets: [
    {
      id: 'stats',
      type: 'stats',
      position: 1,
      isVisible: true,
    },
    {
      id: 'activity',
      type: 'activity',
      position: 2,
      isVisible: true,
    },
  ],
};
