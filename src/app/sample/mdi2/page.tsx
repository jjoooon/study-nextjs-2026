'use client';

/**
 * MDI (Multiple Document Interface) Helper Sample Page - In-Page Tab Version
 *
 * @description
 * mdiHelper2의 기능을 체험할 수 있는 샘플 페이지
 * - 페이지 내 탭으로 문서 열기/닫기
 * - 초기 데이터와 함께 문서 열기 (sessionStorage 기반)
 * - 문서 간 메시지 전송
 * - 브로드캐스트
 * - 메시지 수신 핸들링
 *
 * @usage
 * 1. "새 문서 열기" 버튼으로 child 컴포넌트를 새 탭으로 엽니다
 * 2. "초기 데이터와 함께 열기"로 자식 문서에 데이터를 전달합니다
 * 3. 열린 문서 목록에서 개별 문서를 제어할 수 있습니다
 * 4. 메시지 전송/브로드캐스트로 문서 간 통신을 테스트합니다
 */

import { useCallback, useEffect, useState } from 'react';

import { MDITabPanel } from './components/MDITabPanel';
import log from '@/shared/utils/logger';
import { mdi } from '@/shared/utils/mdiHelper2';
import type { MDIDocument, MDIMessage } from '@/shared/utils/mdiHelper2';

const logger = log.getLogger('Sample');

interface MessageLog {
  id: string;
  type: string;
  direction: 'sent' | 'received';
  timestamp: string;
  payload?: unknown;
}

export default function Page() {
  const [openDocuments, setOpenDocuments] = useState<MDIDocument[]>([]);
  const [messageLogs, setMessageLogs] = useState<MessageLog[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [renamingDocId, setRenamingDocId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newDocumentUrl, setNewDocumentUrl] = useState('/sample/mdi2/child');
  const [reloadOnTabSwitch, setReloadOnTabSwitch] = useState(false); // 탭 전환 시 리로드 여부 (default: false)
  const [initialDataProductId, setInitialDataProductId] = useState('123'); // 초기 데이터 예시 - Product ID
  const [initialDataMode, setInitialDataMode] = useState('edit'); // 초기 데이터 예시 - Mode

  // payload를 안전하게 문자열로 변환하는 헬퍼 함수
  const formatPayload = useCallback((payload: unknown): string => {
    if (typeof payload === 'string') return payload;
    if (payload === null) return 'null';
    if (payload === undefined) return 'undefined';
    return JSON.stringify(payload);
  }, []);

  // 로그 추가
  const addLog = useCallback((type: string, direction: 'sent' | 'received', payload?: unknown) => {
    const log: MessageLog = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type,
      direction,
      timestamp: new Date().toLocaleTimeString(),
      payload,
    };
    setMessageLogs((prev) => [log, ...prev].slice(0, 50)); // 최대 50개
  }, []);

  // 열린 문서 목록 주기적 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setOpenDocuments(mdi.getOpenDocuments());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // 메시지 핸들러 등록
  useEffect(() => {
    const handlers = [
      // READY 메시지 수신
      mdi.onMessage('READY', (msg: MDIMessage) => {
        addLog('READY', 'received', msg.payload);
      }),

      // DATA_UPDATED 메시지 수신
      mdi.onMessage('DATA_UPDATED', (msg: MDIMessage) => {
        addLog('DATA_UPDATED', 'received', msg.payload);
      }),

      // PING 메시지 수신 -> PONG 응답
      mdi.onMessage('PING', (msg: MDIMessage) => {
        addLog('PING', 'received', msg.payload);
        // 발신자에게 PONG 응답
        if (msg.senderId) {
          mdi.postMessage(msg.senderId, { type: 'PONG' });
          addLog('PONG', 'sent');
        }
      }),
    ];

    // iframe 자식 문서로부터의 window.postMessage 메시지 수신 처리
    const handleWindowMessage = (event: MessageEvent) => {
      const message = event.data as { type: string; payload?: unknown };
      if (!message || !message.type) {
        return;
      }

      // mdiHelper2의 내부 메시지 시스템에 전달하여 로그 표시
      addLog(message.type, 'received', message.payload);

      // PING 메시지에 자동 응답
      if (message.type === 'PING') {
        // iframe의 contentWindow에 PONG 전송
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach((iframe) => {
          try {
            if (iframe.contentWindow) {
              iframe.contentWindow.postMessage({ type: 'PONG', payload: { timestamp: Date.now() } }, '*');
            }
          } catch (error) {
            // CORS 등의 이유로 접근 불가능한 경우 무시
            logger.warn('Cannot send message to iframe:', error);
          }
        });
        addLog('PONG', 'sent');
      }
    };

    window.addEventListener('message', handleWindowMessage);

    // 컴포넌트 언마운트 시 정리
    return () => {
      handlers.forEach((cleanup) => cleanup());
      window.removeEventListener('message', handleWindowMessage);
    };
  }, [addLog]);

  // 새 문서 열기
  const handleOpenDocument = (url: string = 'child', withInitialData: boolean = false) => {
    try {
      let doc;
      if (withInitialData) {
        // 초기 데이터와 함께 열기
        doc = mdi.open(url, {
          initialData: {
            productId: parseInt(initialDataProductId, 10) || 123,
            mode: initialDataMode || 'view',
            message: `초기 데이터가 전달되었습니다 (${new Date().toLocaleTimeString()})`,
            timestamp: Date.now(),
          },
          title: '새탭',
        });
        addLog('DOCUMENT_OPENED_WITH_INITIAL_DATA', 'sent', { documentId: doc.id, url: doc.url });
      } else {
        // 기본 열기
        doc = mdi.open(url);
        addLog('DOCUMENT_OPENED', 'sent', { documentId: doc.id, url: doc.url });
      }
      setSelectedDocId(doc.id);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  // 문서 닫기
  const handleCloseDocument = (docId: string) => {
    mdi.close(docId);
    addLog('DOCUMENT_CLOSED', 'sent', { documentId: docId });
    if (selectedDocId === docId) {
      setSelectedDocId(null);
    }
  };

  // 모든 문서 닫기
  const handleCloseAll = () => {
    mdi.closeAll();
    addLog('ALL_DOCUMENTS_CLOSED', 'sent');
    setSelectedDocId(null);
  };

  // 메시지 전송
  const handleSendMessage = () => {
    if (!selectedDocId) {
      alert('문서를 선택해주세요.');
      return;
    }

    // iframe에 메시지 전송
    const iframes = document.querySelectorAll('iframe');
    let messageSent = false;

    iframes.forEach((iframe) => {
      try {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: 'UPDATE_DATA',
              payload: { message: `Hello from parent at ${new Date().toLocaleTimeString()}` },
            },
            '*'
          );
          messageSent = true;
        }
      } catch (error) {
        logger.warn('Cannot send message to iframe:', error);
      }
    });

    if (messageSent) {
      addLog('UPDATE_DATA', 'sent', { documentId: selectedDocId });
    } else {
      // mdiHelper2의 내부 메시지 시스템도 사용 (fallback)
      mdi.postMessage(selectedDocId, {
        type: 'UPDATE_DATA',
        payload: { message: `Hello from parent at ${new Date().toLocaleTimeString()}` },
      });
      addLog('UPDATE_DATA', 'sent', { documentId: selectedDocId, via: 'mdiHelper2' });
    }
  };

  // 브로드캐스트
  const handleBroadcast = () => {
    // 모든 iframe에 메시지 전송
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      try {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: 'REFRESH',
              payload: { timestamp: Date.now() },
            },
            '*'
          );
        }
      } catch (error) {
        logger.warn('Cannot send broadcast to iframe:', error);
      }
    });

    // mdiHelper2의 내부 메시지 시스템도 사용
    mdi.broadcast({
      type: 'REFRESH',
      payload: { timestamp: Date.now() },
    });
    addLog('REFRESH', 'sent', { broadcast: true });
  };

  // 문서 포커스
  const handleFocus = (docId: string) => {
    mdi.focus(docId);
    setSelectedDocId(docId);
    addLog('FOCUS', 'sent', { documentId: docId });
  };

  // 로그 지우기
  const handleClearLogs = () => {
    setMessageLogs([]);
  };

  // 이름 변경 시작
  const handleStartRename = (docId: string, currentName?: string) => {
    setRenamingDocId(docId);
    setNewName(currentName || '');
  };

  // 이름 변경 취소
  const handleCancelRename = () => {
    setRenamingDocId(null);
    setNewName('');
  };

  // 이름 변경 저장
  const handleSaveRename = (docId: string) => {
    if (newName.trim()) {
      mdi.rename(docId, newName.trim());
      setOpenDocuments(mdi.getOpenDocuments()); // 목록 갱신
      addLog('DOCUMENT_RENAMED', 'sent', { documentId: docId, newName: newName.trim() });
    }
    handleCancelRename();
  };

  // 이름 변경 엔터키 처리
  const handleRenameKeyDown = (e: React.KeyboardEvent, docId: string) => {
    if (e.key === 'Enter') {
      handleSaveRename(docId);
    } else if (e.key === 'Escape') {
      handleCancelRename();
    }
  };

  const selectedDoc = openDocuments.find((d) => d.id === selectedDocId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MDI (Multiple Document Interface) Helper - In-Page Tab Version
          </h1>
          <p className="text-gray-600">페이지 내 탭으로 문서를 열고, 문서 간 메시지 통신을 테스트합니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Controls & Documents */}
          <div className="lg:col-span-1 space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">동작</h2>
              <div className="flex flex-col gap-3">
                {/* URL 입력 및 열기 버튼 */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDocumentUrl}
                    onChange={(e) => setNewDocumentUrl(e.target.value)}
                    placeholder="/sample/mdi2/child"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleOpenDocument(newDocumentUrl);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleOpenDocument(newDocumentUrl)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    열기
                  </button>
                </div>

                {/* 초기 데이터 입력 영역 */}
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm font-medium text-gray-700 mb-2">초기 데이터 전달 (선택적)</div>
                  <div className="flex gap-2 mb-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">Product ID</label>
                      <input
                        type="number"
                        value={initialDataProductId}
                        onChange={(e) => setInitialDataProductId(e.target.value)}
                        placeholder="123"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">Mode</label>
                      <select
                        value={initialDataMode}
                        onChange={(e) => setInitialDataMode(e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                      >
                        <option value="view">View</option>
                        <option value="edit">Edit</option>
                        <option value="create">Create</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenDocument(newDocumentUrl, true)}
                    className="w-full px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    초기 데이터와 함께 열기
                  </button>
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!selectedDoc}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  선택 문서에 메시지 전송
                </button>

                <button
                  onClick={handleBroadcast}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  브로드캐스트 (모든 문서)
                </button>

                <button
                  onClick={handleCloseAll}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  모든 문서 닫기
                </button>

                <button
                  onClick={handleClearLogs}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  로그 지우기
                </button>

                {/* 탭 전환 시 리로드 옵션 */}
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                  <span className="text-sm text-gray-700">탭 전환 시 리로드</span>
                  <button
                    onClick={() => setReloadOnTabSwitch(!reloadOnTabSwitch)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      reloadOnTabSwitch ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block w-3 h-3 rounded-full bg-white transition-transform ${
                        reloadOnTabSwitch ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Open Documents */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">열린 문서</h2>
                <span className="text-sm text-gray-500">{openDocuments.length}개 열림</span>
              </div>

              {openDocuments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">열린 문서가 없습니다.</p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {openDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      role="button"
                      tabIndex={0}
                      className={`flex items-center justify-between p-3 border rounded-lg transition-colors cursor-pointer ${
                        selectedDocId === doc.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handleFocus(doc.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFocus(doc.id);
                        }
                      }}
                    >
                      <div
                        role="none"
                        className="flex-1 min-w-0"
                        onClick={(e) => renamingDocId === doc.id && e.stopPropagation()}
                      >
                        {renamingDocId === doc.id ? (
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => handleRenameKeyDown(e, doc.id)}
                            onBlur={() => handleSaveRename(doc.id)}
                            className="px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <>
                            <div className="font-medium text-gray-900 truncate">{doc.name || doc.url}</div>
                            <div className="text-xs text-gray-500 truncate">ID: {doc.id.slice(-8)}</div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (renamingDocId === doc.id) {
                              handleSaveRename(doc.id);
                            } else {
                              handleStartRename(doc.id, doc.name);
                            }
                          }}
                          className="px-2 py-1 text-xs bg-indigo-200 text-indigo-800 rounded hover:bg-indigo-300 transition-colors"
                        >
                          {renamingDocId === doc.id ? '저장' : '이름'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCloseDocument(doc.id);
                          }}
                          className="px-2 py-1 text-xs bg-red-200 text-red-800 rounded hover:bg-red-300 transition-colors"
                        >
                          닫기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Document Info */}
            {selectedDoc && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">선택된 문서 정보</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="w-24 text-gray-500">ID:</span>
                    <span className="font-mono text-gray-900 text-xs break-all">{selectedDoc.id}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gray-500">이름:</span>
                    <span className="text-gray-900 truncate">{selectedDoc.name || '(설정되지 않음)'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gray-500">URL:</span>
                    <span className="text-gray-900 text-xs">{selectedDoc.url}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gray-500">열린 시간:</span>
                    <span className="text-gray-900">{new Date(selectedDoc.openedAt).toLocaleString()}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gray-500">상태:</span>
                    <span className="text-green-600">열림</span>
                  </div>
                </div>
              </div>
            )}

            {/* Message Logs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">메시지 로그</h2>
                <button onClick={handleClearLogs} className="text-sm text-gray-500 hover:text-gray-700">
                  지우기
                </button>
              </div>

              {messageLogs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">메시지가 없습니다.</p>
              ) : (
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {messageLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`text-xs p-2 rounded ${
                        log.direction === 'sent' ? 'bg-green-50 text-green-900' : 'bg-blue-50 text-blue-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px]">{log.timestamp}</span>
                        <span className="font-semibold">{log.type}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white bg-opacity-50">
                          {log.direction === 'sent' ? '전송' : '수신'}
                        </span>
                      </div>
                      {log.payload != null && (
                        <div className="mt-1 text-[10px] opacity-75 break-all">{formatPayload(log.payload)}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Tab Panels */}
          <div className="lg:col-span-2">
            <MDITabPanel
              documents={openDocuments}
              selectedDocId={selectedDocId}
              onSelectDoc={handleFocus}
              onCloseDoc={handleCloseDocument}
              reloadOnTabSwitch={reloadOnTabSwitch}
            />
          </div>
        </div>

        {/* Usage Guide */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">사용 가이드</h3>
          <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
            <li>
              <strong>새 문서 열기</strong>: 버튼 클릭 시 child 컴포넌트가 페이지 내 새 탭으로 열립니다
            </li>
            <li>
              <strong>초기 데이터와 함께 열기</strong>: Product ID와 Mode를 설정하고 &quot;초기 데이터와 함께 열기&quot;
              버튼을 클릭하면 자식 문서에 초기 데이터가 전달됩니다
            </li>
            <li>
              <strong>자식 문서에서 초기 데이터 수신</strong>: 자식 문서에서{' '}
              <code className="bg-white px-1 rounded">mdi.getInitialData()</code>를 호출하여 초기 데이터를 받습니다
            </li>
            <li>
              <strong>문서 이름 변경</strong>: &quot;이름&quot; 버튼으로 문서에 별칭을 지정할 수 있습니다 (Enter: 저장,
              Esc: 취소)
            </li>
            <li>
              <strong>자식 문서 READY</strong>: 자식 문서가 준비되면 부모에게 READY 메시지를 보냅니다
            </li>
            <li>
              <strong>메시지 전송</strong>: 선택된 문서에 UPDATE_DATA 메시지를 전송합니다
            </li>
            <li>
              <strong>브로드캐스트</strong>: 모든 열린 문서에 REFRESH 메시지를 전송합니다
            </li>
            <li>
              <strong>문서 닫기</strong>: 개별 문서나 모든 문서를 닫을 수 있습니다
            </li>
          </ol>

          {/* Code Example */}
          <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
            <div className="text-xs text-gray-500 mb-2">코드 예시:</div>
            <pre className="text-xs text-blue-900 overflow-x-auto">
              {`// 부모 문서 - 초기 데이터와 함께 열기
const doc = mdi.open('child', {
  initialData: {
    productId: 123,
    mode: 'edit',
    message: 'Hello from parent',
    timestamp: Date.now()
  }
});

// 자식 문서 - 초기 데이터 수신
const initialData = mdi.getInitialData<{
  productId: number;
  mode: string;
  message: string;
  timestamp: number;
}>();
logger.log(initialData); // { productId: 123, mode: 'edit', ... }`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
