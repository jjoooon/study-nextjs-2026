'use client';

/**
 * MDI (Multiple Document Interface) Helper Sample Page
 *
 * @description
 * mdiHelper의 기능을 체험할 수 있는 샘플 페이지
 * - 새 문서 열기/닫기
 * - 문서 간 메시지 전송
 * - 브로드캐스트
 * - 메시지 수신 핸들링
 *
 * @usage
 * 1. "새 문서 열기" 버튼으로 /sample/mdi/child 페이지를 새 탭으로 엽니다
 * 2. 열린 문서 목록에서 개별 문서를 제어할 수 있습니다
 * 3. 메시지 전송/브로드캐스트로 문서 간 통신을 테스트합니다
 */

import { useEffect, useState } from 'react';

import { mdi } from '@/shared/utils/mdiHelper';
import type { MDIDocument, MDIMessage } from '@/shared/utils/mdiHelper';

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
  const [initialProduct, setInitialProduct] = useState('');
  const [initialMode, setInitialMode] = useState('view');

  // payload를 안전하게 문자열로 변환하는 헬퍼 함수
  const formatPayload = (payload: unknown): string => {
    if (typeof payload === 'string') return payload;
    if (payload === null) return 'null';
    if (payload === undefined) return 'undefined';
    return JSON.stringify(payload);
  };

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

    // 컴포넌트 언마운트 시 정리
    return () => {
      handlers.forEach((cleanup) => cleanup());
    };
  }, []);

  // 로그 추가
  const addLog = (type: string, direction: 'sent' | 'received', payload?: unknown) => {
    const log: MessageLog = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type,
      direction,
      timestamp: new Date().toLocaleTimeString(),
      payload,
    };
    setMessageLogs((prev) => [log, ...prev].slice(0, 50)); // 최대 50개
  };

  // 새 문서 열기
  const handleOpenDocument = () => {
    try {
      // 초기 데이터와 함께 열기
      const doc = mdi.open('/sample/mdi/child', {
        initialData: {
          product: initialProduct || 'Sample Product',
          mode: initialMode,
          timestamp: Date.now(),
        },
        title: '새탭',
      });
      setSelectedDocId(doc.id);
      addLog('DOCUMENT_OPENED', 'sent', {
        documentId: doc.id,
        url: doc.url,
        initialData: { product: initialProduct, mode: initialMode },
      });
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

    mdi.postMessage(selectedDocId, {
      type: 'UPDATE_DATA',
      payload: { message: `Hello from parent at ${new Date().toLocaleTimeString()}` },
    });
    addLog('UPDATE_DATA', 'sent', { documentId: selectedDocId });
  };

  // 브로드캐스트
  const handleBroadcast = () => {
    mdi.broadcast({
      type: 'REFRESH',
      payload: { timestamp: Date.now() },
    });
    addLog('REFRESH', 'sent', { broadcast: true });
  };

  // 문서 포커스
  const handleFocus = (docId: string) => {
    mdi.focus(docId);
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MDI (Multiple Document Interface) Helper</h1>
          <p className="text-gray-600">새 탭으로 문서를 열고, 문서 간 메시지 통신을 테스트합니다.</p>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">동작</h2>

          {/* Initial Data Input */}
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="text-sm font-semibold text-amber-900 mb-3">초기 데이터 설정</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs text-gray-600 mb-1">제품명</label>
                <input
                  type="text"
                  value={initialProduct}
                  onChange={(e) => setInitialProduct(e.target.value)}
                  placeholder="예: Sample Product"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="w-40">
                <label className="block text-xs text-gray-600 mb-1">모드</label>
                <select
                  value={initialMode}
                  onChange={(e) => setInitialMode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="view">보기 (view)</option>
                  <option value="edit">편집 (edit)</option>
                  <option value="create">생성 (create)</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-amber-700 mt-2">
              💡 설정된 초기 데이터는 sessionStorage를 통해 자식 문서로 전달됩니다
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleOpenDocument}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              새 문서 열기 (초기 데이터 포함)
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!selectedDoc}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              선택 문서에 메시지 전송
            </button>

            <button
              onClick={handleBroadcast}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              브로드캐스트 (모든 문서)
            </button>

            <button
              onClick={handleCloseAll}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              모든 문서 닫기
            </button>

            <button
              onClick={handleClearLogs}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              로그 지우기
            </button>
          </div>
        </div>

        {/* Open Documents */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">열린 문서</h2>
            <span className="text-sm text-gray-500">{openDocuments.length}개 열림</span>
          </div>

          {openDocuments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">열린 문서가 없습니다.</p>
          ) : (
            <div className="space-y-2">
              {openDocuments.map((doc) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  key={doc.id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                    selectedDocId === doc.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDocId(doc.id)}
                >
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                  <div className="flex-1" onClick={(e) => renamingDocId === doc.id && e.stopPropagation()}>
                    {renamingDocId === doc.id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => handleRenameKeyDown(e, doc.id)}
                        onBlur={() => handleSaveRename(doc.id)}
                        className="px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <>
                        <div className="font-medium text-gray-900">{doc.name || doc.url}</div>
                        <div className="text-sm text-gray-500">
                          {doc.name && doc.name !== doc.url && `${doc.url} · `}
                          ID: {doc.id.slice(-12)} | opened: {new Date(doc.openedAt).toLocaleTimeString()}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (renamingDocId === doc.id) {
                          handleSaveRename(doc.id);
                        } else {
                          handleStartRename(doc.id, doc.name);
                        }
                      }}
                      className="px-3 py-1 text-sm bg-indigo-200 text-indigo-800 rounded hover:bg-indigo-300 transition-colors"
                    >
                      {renamingDocId === doc.id ? '저장' : '이름 변경'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFocus(doc.id);
                      }}
                      className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                      포커스
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseDocument(doc.id);
                      }}
                      className="px-3 py-1 text-sm bg-red-200 text-red-800 rounded hover:bg-red-300 transition-colors"
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
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">선택된 문서 정보</h2>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="w-32 text-gray-500">ID:</span>
                <span className="font-mono text-gray-900">{selectedDoc.id}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-500">이름:</span>
                <span className="text-gray-900">{selectedDoc.name || '(설정되지 않음)'}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-500">URL:</span>
                <span className="text-gray-900">{selectedDoc.url}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-500">열린 시간:</span>
                <span className="text-gray-900">{new Date(selectedDoc.openedAt).toLocaleString()}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-500">상태:</span>
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
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {messageLogs.map((log) => (
                <div
                  key={log.id}
                  className={`text-sm p-2 rounded ${
                    log.direction === 'sent' ? 'bg-green-50 text-green-900' : 'bg-blue-50 text-blue-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{log.timestamp}</span>
                    <span className="font-semibold">{log.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white bg-opacity-50">
                      {log.direction === 'sent' ? '전송' : '수신'}
                    </span>
                  </div>
                  {log.payload != null && <div className="mt-1 text-xs opacity-75">{formatPayload(log.payload)}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Usage Guide */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">사용 가이드</h3>
          <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
            <li>
              <strong>초기 데이터 설정</strong>: 제품명과 모드를 설정한 후 &quot;새 문서 열기&quot;를 클릭하면 초기
              데이터가 자식 문서로 전달됩니다
            </li>
            <li>
              <strong>새 문서 열기</strong>: 버튼 클릭 시 /sample/mdi/child 페이지가 새 탭으로 열립니다
            </li>
            <li>
              <strong>문서 이름 변경</strong>: &quot;이름 변경&quot; 버튼으로 문서에 별칭을 지정할 수 있습니다 (Enter:
              저장, Esc: 취소)
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
          <div className="mt-4 p-3 bg-white rounded border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>💡 초기 데이터 전달 방식:</strong> sessionStorage를 사용하여 부모→자식으로 데이터를 전달합니다.
              자식 문서는 <code className="px-1 py-0.5 bg-blue-100 rounded">mdi.getInitialData()</code>로 데이터를
              조회합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
