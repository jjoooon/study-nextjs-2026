/**
 * Mock 사용자 데이터
 *
 * 이 파일은 MSW 핸들러에서 사용하는 Mock 데이터를 정의합니다.
 * 개발 및 테스트 환경에서 사용됩니다.
 */

import { User } from '@/mocks/types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'moderator',
    status: 'active',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
];
