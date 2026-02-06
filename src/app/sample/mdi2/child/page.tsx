'use client';

/**
 * MDI2 Child Document Sample
 *
 * @description
 * 부모 문서에서 iframe으로 열리는 자식 문서
 * - 준비 완료 시 READY 메시지 전송 (window.parent.postMessage 사용)
 * - 부모로부터 메시지 수신
 * - 메시지에 따른 UI 업데이트
 * - 초기 데이터 수신 (mdi.getInitialData() 사용)
 *
 * @usage
 * 부모 문서에서 mdi.open('/sample/mdi2/child', { initialData: { productId: 123, mode: 'edit' } })로 열립니다
 */

import { useEffect, useState } from 'react';

import log from '@/shared/utils/logger';
import { mdi } from '@/shared/utils/mdiHelper2';
import type { MDIOpenOptions } from '@/shared/utils/mdiHelper2';

const logger = log.getLogger('Sample');

interface ReceivedMessage {
  id: string;
  type: string;
  payload: unknown;
  timestamp: string;
}

interface InitialData {
  productId?: number;
  mode?: string;
  message?: string;
  timestamp?: number;
}

export default function ChildPage() {
  const [isReady, setIsReady] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([]);
  const [parentMessage, setParentMessage] = useState<string>('');
  const [documentName, setDocumentName] = useState<string>('');
  // Lazy initialization to avoid setState in effect
  const [mdiOptions] = useState<MDIOpenOptions<InitialData> | null>(() => {
    if (typeof window === 'undefined') return null;
    return mdi.getOpenOptions<InitialData>();
  });
  // initialData는 옵션에서 추출 (하위 호환성)
  const initialData = mdiOptions?.initialData;

  // payload를 안전하게 문자열로 변환하는 헬퍼 함수
  const formatPayload = (payload: unknown): string => {
    if (typeof payload === 'string') return payload;
    if (payload === null) return 'null';
    if (payload === undefined) return 'undefined';
    return JSON.stringify(payload, null, 2);
  };

  // 부모 문서에 메시지 전송 헬퍼 함수
  const sendToParent = <T = unknown,>(message: { type: string; payload?: T }): void => {
    // iframe 내에서는 window.parent.postMessage를 사용하여 부모와 통신
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(message, '*');
    }
  };

  // 초기화 및 메시지 핸들러 설정
  useEffect(() => {
    // 초기 데이터 로그 (lazy init으로 이미 state에 설정됨)
    if (mdiOptions) {
      logger.log('[MDI2 Child] MDI options received:', mdiOptions);
    }

    // title이 있으면 문서 제목 설정
    if (mdiOptions?.title) {
      document.title = mdiOptions.title;
      setDocumentName(mdiOptions.title);
    }

    // 부모 문서에 준비 완료 알림
    const notifyReady = () => {
      sendToParent({
        type: 'READY',
        payload: {
          documentId: 'mdi2-child',
          hasInitialData: !!initialData,
          mdiOptions,
        },
      });
      setIsReady(true);
    };

    // 약간 지연 후 READY 전송 (실제 초기화 시뮬레이션)
    const timer = setTimeout(notifyReady, 500);

    // 메시지 수신 핸들러
    const handleMessage = (event: MessageEvent) => {
      // 보안: 같은 origin에서 온 메시지만 처리
      // 개발 환경에서는 '*'를 허용하지만 프로덕션에서는 구체적인 origin을 지정하는 것이 좋음
      const message = event.data as { type: string; payload?: unknown; senderId?: string };

      if (!message || !message.type) {
        return;
      }

      const { type, payload } = message;

      // 수신한 메시지 처리
      const receivedMessage: ReceivedMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type,
        payload,
        timestamp: new Date().toLocaleTimeString(),
      };
      setReceivedMessages((prev) => [receivedMessage, ...prev].slice(0, 20));

      // 특정 메시지 타입별 처리
      if (type === 'UPDATE_DATA' && payload && typeof payload === 'object' && 'message' in payload) {
        setParentMessage((payload as { message: string }).message);
      }

      if (type === 'RENAME' && payload && typeof payload === 'object' && 'name' in payload) {
        const newName = (payload as { name: string }).name;
        setDocumentName(newName);
        document.title = newName;
      }

      // PING 메시지에 자동 응답
      if (type === 'PING') {
        sendToParent({ type: 'PONG', payload: { from: 'mdi2-child', timestamp: Date.now() } });
      }
    };

    // 메시지 리스너 등록
    window.addEventListener('message', handleMessage);

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearTimeout(timer);
      window.removeEventListener('message', handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mdiOptions는 lazy init으로 mount 시에만 설정됨, 추가 의존성 불필요

  // 부모에게 데이터 업데이트 전송
  const handleSendToParent = () => {
    sendToParent({
      type: 'DATA_UPDATED',
      payload: { message: `Hello from mdi2-child at ${new Date().toLocaleTimeString()}` },
    });
  };

  // 부모에게 PING 전송
  const handlePing = () => {
    sendToParent({ type: 'PING', payload: { from: 'mdi2-child' } });
  };

  // 문서 이름이 변경되면 브라우저 탭 제목 업데이트
  useEffect(() => {
    if (documentName) {
      document.title = documentName;
    }
  }, [documentName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-sm font-medium text-gray-600">
              {isReady ? '부모와 연결됨 (iframe)' : '연결 중...'}
            </span>
            {documentName && (
              <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded text-xs font-medium">{documentName}</span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MDI2 자식 문서</h1>
          <p className="text-gray-600">iframe을 통해 부모 문서와 메시지를 주고받습니다</p>
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
              <span className="text-gray-500">통신 방식:</span>
              <span className="ml-2 font-semibold text-teal-600">window.parent.postMessage</span>
            </div>
          </div>

          {parentMessage && (
            <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
              <div className="text-xs text-gray-500 mb-1">마지막 받은 메시지:</div>
              <div className="text-sm text-teal-900">{parentMessage}</div>
            </div>
          )}
        </div>

        {/* Initial Data Card */}
        {initialData && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">초기 데이터</h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  mdi.getInitialData()
                </span>
                {mdiOptions?.title && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                    Title: {mdiOptions.title}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {initialData.productId !== undefined && (
                <div className="flex">
                  <span className="w-32 text-gray-500">Product ID:</span>
                  <span className="font-mono text-gray-900">{initialData.productId}</span>
                </div>
              )}
              {initialData.mode && (
                <div className="flex">
                  <span className="w-32 text-gray-500">Mode:</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    {initialData.mode}
                  </span>
                </div>
              )}
              {initialData.message && (
                <div className="flex">
                  <span className="w-32 text-gray-500">Message:</span>
                  <span className="text-gray-900">{initialData.message}</span>
                </div>
              )}
              {initialData.timestamp && (
                <div className="flex">
                  <span className="w-32 text-gray-500">Timestamp:</span>
                  <span className="text-gray-900">{new Date(initialData.timestamp).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">부모에게 전송</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSendToParent}
              disabled={!isReady}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              데이터 업데이트 전송
            </button>
            <button
              onClick={handlePing}
              disabled={!isReady}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    <span className="px-2 py-0.5 text-xs font-semibold rounded bg-teal-100 text-teal-800">
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
        <div className="mt-8 bg-teal-50 border border-teal-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-teal-900 mb-3">작동 방식</h3>
          <ul className="space-y-2 text-sm text-teal-800 list-disc list-inside">
            <li>이 페이지는 부모 문서의 iframe 내에서 열리는 자식 문서입니다</li>
            <li>
              <code className="bg-white px-1 rounded">window.parent.postMessage</code>를 사용하여 부모와 통신합니다
            </li>
            <li>
              <code className="bg-white px-1 rounded">mdi.getInitialData()</code>로 부모가 전달한 초기 데이터를 받습니다
              (sessionStorage 기반)
            </li>
            <li>페이지 로드 후 0.5초 뒤 부모에게 READY 신호를 보냅니다</li>
            <li>부모로부터 UPDATE_DATA, REFRESH, RENAME, PING 메시지를 받을 수 있습니다</li>
            <li>PING을 받으면 자동으로 PONG 응답을 보냅니다</li>
            <li>데이터 업데이트 버튼으로 부모에게 메시지를 보낼 수 있습니다</li>
          </ul>

          {/* Code Example */}
          <div className="mt-4 p-4 bg-white rounded-lg border border-teal-200">
            <div className="text-xs text-gray-500 mb-2">코드 예시:</div>
            <pre className="text-xs text-teal-900 overflow-x-auto">
              {`// 자식 문서에서 초기 데이터 수신
interface InitialData {
  productId?: number;
  mode?: string;
  message?: string;
  timestamp?: number;
}

const initialData = mdi.getInitialData<InitialData>();
if (initialData) {
  logger.log('Product ID:', initialData.productId);
  logger.log('Mode:', initialData.mode);
}`}
            </pre>
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-yellow-900 mb-2">참고사항</h4>
          <p className="text-xs text-yellow-800">
            이 페이지는 iframe 기반 MDI2 시스템에서 사용됩니다. <span className="font-mono">/sample/mdi/child</span>는{' '}
            <code className="bg-white px-1 rounded">window.open()</code> 기반 MDI 시스템을 위한 자식 문서입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
