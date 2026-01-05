'use client';

import { useGetUsersQuery } from '@/features/users';

// 에러 메시지 추출 유틸리티
function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'status' in error) {
    const err = error as { status: number; data?: { message?: string } };
    return err.data?.message || '사용자 목록을 불러오는데 실패했습니다.';
  }
  return '알 수 없는 에러가 발생했습니다.';
}

export default function UserList() {
  // 최적화된 쿼리 훅 사용
  const {
    data: users,
    isLoading,
    error,
    // 추가 상태들 (선택적 사용)
    isFetching,
    refetch,
    // 캐시 상태
    status,
  } = useGetUsersQuery(undefined, {
    // 개별 컴포넌트에서 리패치 전략을 오버라이드 가능
    refetchOnMountOrArgChange: true,
    // 폴링 간격 (필요한 경우)
    pollingInterval: 0, // 비활성화
  });

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          {/* 스피너 */}
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">사용자 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태 (개선된 에러 메시지)
  if (error) {
    const errorMessage = getErrorMessage(error);

    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold text-red-900">사용자 목록을 불러올 수 없습니다</h3>
          </div>
          <p className="text-sm text-red-700">{errorMessage}</p>
          <button
            onClick={() => refetch()}
            className="self-start px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm font-medium"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 빈 상태
  if (!users || !Array.isArray(users) || users.length === 0) {
    return (
      <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <svg
          className="w-12 h-12 text-gray-400 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <p className="text-gray-600">사용자가 없습니다</p>
      </div>
    );
  }

  // 사용자 목록
  return (
    <div className="space-y-4">
      {/* 리패칭 인디케이터 (백그라운드에서 새로고침될 때 표시) */}
      {isFetching && !isLoading && (
        <div className="flex items-center gap-2 text-xs text-blue-600">
          <div className="w-3 h-3 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <span>업데이트 중...</span>
        </div>
      )}

      {/* 사용자 카드 목록 */}
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 bg-white border border-gray-300 rounded-lg hover:shadow-md hover:bg-gray-50 transition-all duration-200 cursor-default"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
            {/* 사용자 ID 뱃지 */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              ID: {user.id}
            </span>
          </div>
        </div>
      ))}

      {/* 캐시 상태 정보 (개발 모드) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600 font-mono">
          <div>상태: {status}</div>
          <div>사용자 수: {users.length}</div>
          {isFetching && <div className="text-blue-600">리패칭 중...</div>}
        </div>
      )}
    </div>
  );
}
