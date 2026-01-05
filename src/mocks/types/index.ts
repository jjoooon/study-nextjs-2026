/**
 * Mock 타입 정의
 *
 * 이 파일은 MSW (Mock Service Worker)에서 사용하는 타입을 정의합니다.
 * 실제 애플리케이션의 타입과 일치하도록 유지하세요.
 */

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  role?: 'admin' | 'user' | 'moderator';
}

export type UpdateUserRequest = Partial<CreateUserRequest>;
