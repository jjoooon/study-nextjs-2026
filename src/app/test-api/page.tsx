'use client';

import { useEffect, useState } from 'react';

export default function TestAPIPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mswStatus, setMswStatus] = useState<string>('확인 중...');

  useEffect(() => {
    // MSW 상태 확인
    const checkMsw = async () => {
      try {
        const { worker } = await import('@/mocks/browser');
        const isRunning = worker !== undefined;
        setMswStatus(isRunning ? '✅ MSW 실행 중' : '❌ MSW 실행 안 됨');
      } catch (err) {
        setMswStatus(`❌ MSW 에러: ${err}`);
      }
    };

    checkMsw();

    // API 테스트
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">API 테스트 페이지</h1>

        {/* MSW 상태 */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">MSW 상태</h2>
          <p className="text-blue-700">{mswStatus}</p>
        </div>

        {/* API 요청 상태 */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API 요청: GET /api/users</h2>

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-gray-600">로딩 중...</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-900">❌ 에러 발생</h3>
              <p className="text-red-700 mt-2">{error}</p>
              <div className="mt-4 text-sm text-red-600">
                <p className="font-semibold">해결 방법:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>
                    개발 서버가 실행 중인지 확인 (<code className="bg-red-100 px-1 rounded">npm run dev</code>)
                  </li>
                  <li>브라우저 콘솔에서 [MSW] 메시지 확인</li>
                  <li>네트워크 탭에서 /api/users 요청 확인</li>
                </ol>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                <p className="text-green-700 font-semibold">✅ API 요청 성공!</p>
                <p className="text-green-600 text-sm">{users.length}명의 사용자를 불러왔습니다.</p>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">사용자 목록:</h3>
              <div className="space-y-2">
                {users.map((user) => (
                  <div key={user.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'moderator'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.role}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">ID: {user.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 디버깅 정보 */}
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">🔍 디버깅 팁</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              • <strong>개발자 도구 &gt; Console</strong>: [MSW] 메시지 확인
            </li>
            <li>
              • <strong>개발자 도구 &gt; Network</strong>: /api/users 요청 확인
            </li>
            <li>• MSW가 요청을 가로챘다면 Network 탭에서 요청이 보이지 않을 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
