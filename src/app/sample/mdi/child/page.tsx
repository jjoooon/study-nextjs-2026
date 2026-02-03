'use client';

/**
 * MDI Child Document Sample
 *
 * @description
 * 부모 문서에서 열리는 자식 문서
 * - 준비 완료 시 READY 메시지 전송
 * - 부모로부터 메시지 수신
 * - 메시지에 따른 UI 업데이트
 *
 * @usage
 * 부모 문서에서 mdi.open('/sample/mdi/child')로 열립니다
 */

import { useEffect, useState } from 'react';

import type { MDIMessage } from '@/shared/utils/mdiHelper';
import { mdi } from '@/shared/utils/mdiHelper';

interface ReceivedMessage {
  id: string;
  type: string;
  payload: unknown;
  timestamp: string;
}

export default function ChildPage() {
  const [isReady, setIsReady] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([]);
  const [parentMessage, setParentMessage] = useState<string>('');
  const [documentName, setDocumentName] = useState<string>('');

  // payload를 안전하게 문자열로 변환하는 헬퍼 함수
  const formatPayload = (payload: unknown): string => {
    if (typeof payload === 'string') return payload;
    if (payload === null) return 'null';
    if (payload === undefined) return 'undefined';
    return JSON.stringify(payload, null, 2);
  };

  // 초기화 및 메시지 핸들러 설정
  useEffect(() => {
    // 부모 문서에 준비 완료 알림
    const notifyReady = () => {
      if (window.opener) {
        window.opener.postMessage({ type: 'READY', payload: { documentId: 'child' } }, '*');
      }
      setIsReady(true);
    };

    // 약간 지연 후 READY 전송 (실제 초기화 시뮬레이션)
    const timer = setTimeout(notifyReady, 500);

    // 메시지 핸들러 등록
    const cleanupUpdateData = mdi.onMessage('UPDATE_DATA', (msg: MDIMessage) => {
      const message: ReceivedMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type: 'UPDATE_DATA',
        payload: msg.payload,
        timestamp: new Date().toLocaleTimeString(),
      };
      setReceivedMessages((prev) => [message, ...prev].slice(0, 20));

      if (msg.payload && typeof msg.payload === 'object' && 'message' in msg.payload) {
        setParentMessage((msg.payload as { message: string }).message);
      }
    });

    const cleanupRefresh = mdi.onMessage('REFRESH', (msg: MDIMessage) => {
      const message: ReceivedMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type: 'REFRESH',
        payload: msg.payload,
        timestamp: new Date().toLocaleTimeString(),
      };
      setReceivedMessages((prev) => [message, ...prev].slice(0, 20));
    });

    const cleanupInitData = mdi.onMessage('INIT_DATA', (msg: MDIMessage) => {
      const message: ReceivedMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type: 'INIT_DATA',
        payload: msg.payload,
        timestamp: new Date().toLocaleTimeString(),
      };
      setReceivedMessages((prev) => [message, ...prev].slice(0, 20));
    });

    const cleanupRename = mdi.onMessage('RENAME', (msg: MDIMessage) => {
      const message: ReceivedMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type: 'RENAME',
        payload: msg.payload,
        timestamp: new Date().toLocaleTimeString(),
      };
      setReceivedMessages((prev) => [message, ...prev].slice(0, 20));

      if (msg.payload && typeof msg.payload === 'object' && 'name' in msg.payload) {
        const newName = (msg.payload as { name: string }).name;
        setDocumentName(newName);
        document.title = newName;
      }
    });

    const cleanupPong = mdi.onMessage('PONG', (msg: MDIMessage) => {
      const message: ReceivedMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type: 'PONG',
        payload: msg.payload,
        timestamp: new Date().toLocaleTimeString(),
      };
      setReceivedMessages((prev) => [message, ...prev].slice(0, 20));
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearTimeout(timer);
      cleanupUpdateData();
      cleanupRefresh();
      cleanupInitData();
      cleanupRename();
      cleanupPong();
    };
  }, []);

  // 부모에게 메시지 전송
  const handleSendToParent = () => {
    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'DATA_UPDATED',
          payload: { message: `Hello from child at ${new Date().toLocaleTimeString()}` },
        },
        '*'
      );
    } else {
      alert('부모 문서를 찾을 수 없습니다.');
    }
  };

  // 부모에게 PING 전송
  const handlePing = () => {
    if (window.opener) {
      window.opener.postMessage({ type: 'PING', payload: { from: 'child' } }, '*');
    }
  };

  // 문서 이름이 변경되면 브라우저 탭 제목 업데이트
  useEffect(() => {
    if (documentName) {
      document.title = documentName;
    }
  }, [documentName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-sm font-medium text-gray-600">{isReady ? '부모와 연결됨' : '연결 중...'}</span>
            {documentName && (
              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                {documentName}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MDI 자식 문서</h1>
          <p className="text-gray-600">부모 문서와 메시지를 주고받습니다</p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">상태</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">연결 상태:</span>
              <span className={`ml-2 font-semibold ${isReady ? 'text-green-600' : 'text-yellow-600'}`}>
                {isReady ? '연결됨' : '연결 중'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">부모 창:</span>
              <span className={`ml-2 font-semibold ${window.opener ? 'text-green-600' : 'text-red-600'}`}>
                {window.opener ? '있음' : '없음'}
              </span>
            </div>
          </div>

          {parentMessage && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">마지막 받은 메시지:</div>
              <div className="text-sm text-blue-900">{parentMessage}</div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">부모에게 전송</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSendToParent}
              disabled={!isReady}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              데이터 업데이트 전송
            </button>
            <button
              onClick={handlePing}
              disabled={!isReady}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              PING 전송
            </button>
          </div>
        </div>

        {/* Received Messages */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">수신 메시지</h2>
            <span className="text-sm text-gray-500">{receivedMessages.length}개</span>
          </div>

          {receivedMessages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">수신한 메시지가 없습니다.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {receivedMessages.map((msg) => (
                <div key={msg.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                      {msg.type}
                    </span>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                  {msg.payload !== undefined && msg.payload !== null && (
                    <div className="text-sm text-gray-700 font-mono text-xs break-all">
                      {formatPayload(msg.payload)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">작동 방식</h3>
          <ul className="space-y-2 text-sm text-purple-800 list-disc list-inside">
            <li>이 페이지는 부모 문서에서 열린 자식 문서입니다</li>
            <li>페이지 로드 후 0.5초 뒤 부모에게 READY 신호를 보냅니다</li>
            <li>부모로부터 UPDATE_DATA, REFRESH, INIT_DATA 메시지를 받을 수 있습니다</li>
            <li>데이터 업데이트 버튼으로 부모에게 메시지를 보낼 수 있습니다</li>
            <li>PING 버튼으로 부모에게 PING을 보내고 PONG 응답을 받을 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
