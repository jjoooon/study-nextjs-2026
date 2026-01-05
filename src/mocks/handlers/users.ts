/**
 * User API 핸들러
 *
 * 이 파일은 User 관련 API 엔드포인트를 모킹합니다.
 * 모든 사용자 CRUD 작업을 처리합니다.
 */

import { http, HttpResponse, delay } from 'msw';
import { mockUsers } from '@/mocks/data/users';
import { User, CreateUserRequest, UpdateUserRequest } from '@/mocks/types';

export const usersHandlers = [
  // ========================================================================
  // GET /api/users - 사용자 목록 조회
  // ========================================================================
  http.get('/api/users', async ({ request }) => {
    // URL 파라미터 파싱 (페이지네이션)
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;

    // 네트워크 지연 시뮬레이션 (리얼한 UX)
    await delay(300);

    // 페이지네이션 로직
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = mockUsers.slice(startIndex, endIndex);

    // 정렬된 사용자 목록 반환 (apiSlice의 transformResponse와 일치)
    const sortedUsers = [...paginatedUsers].sort((a, b) => a.id - b.id);

    return HttpResponse.json(sortedUsers, {
      status: 200,
      headers: {
        'X-Total-Count': mockUsers.length.toString(),
        'X-Page': page.toString(),
        'X-Page-Size': pageSize.toString(),
      },
    });
  }),

  // ========================================================================
  // GET /api/users/:id - 사용자 상세 조회
  // ========================================================================
  http.get('/api/users/:id', async ({ params }) => {
    const { id } = params;
    const userId = Number(id);

    // 네트워크 지연 시뮬레이션
    await delay(200);

    // 사용자 찾기
    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(user, { status: 200 });
  }),

  // ========================================================================
  // POST /api/users - 사용자 생성
  // ========================================================================
  http.post('/api/users', async ({ request }) => {
    const body = (await request.json()) as CreateUserRequest;

    // 네트워크 지연 시뮬레이션
    await delay(400);

    // 새 사용자 생성
    const newUser: User = {
      id: Math.max(...mockUsers.map((u) => u.id)) + 1,
      name: body.name || 'New User',
      email: body.email || 'new@example.com',
      role: body.role || 'user',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 메모리에 추가 (실제 앱에서는 DB에 저장)
    mockUsers.push(newUser);

    // 사용자 객체 직접 반환 (apiSlice의 createUser mutation과 일치)
    return HttpResponse.json(newUser, { status: 201 });
  }),

  // ========================================================================
  // PATCH /api/users/:id - 사용자 업데이트
  // ========================================================================
  http.patch('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const userId = Number(id);
    const body = (await request.json()) as UpdateUserRequest;

    // 네트워크 지연 시뮬레이션
    await delay(350);

    // 사용자 찾기
    const userIndex = mockUsers.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // 사용자 업데이트
    const updatedUser: User = {
      ...mockUsers[userIndex],
      ...body,
      id: userId, // ID는 변경 불가
    };

    mockUsers[userIndex] = updatedUser;

    return HttpResponse.json(updatedUser, { status: 200 });
  }),

  // ========================================================================
  // DELETE /api/users/:id - 사용자 삭제
  // ========================================================================
  http.delete('/api/users/:id', async ({ params }) => {
    const { id } = params;
    const userId = Number(id);

    // 네트워크 지연 시뮬레이션
    await delay(300);

    // 사용자 찾기
    const userIndex = mockUsers.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // 사용자 삭제
    mockUsers.splice(userIndex, 1);

    return HttpResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  }),
];
