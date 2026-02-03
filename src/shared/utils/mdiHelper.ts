/**
 * MDI (Multiple Document Interface) Helper
 *
 * @description
 * - 페이지 내에서 여러 문서/탭을 관리하는 유틸리티
 * - window.open을 사용하여 새 탭으로 문서 열기/닫기 구현
 * - 향후 탭 UI 기반 구현으로 확장 가능한 설계
 *
 * @usage
 * import { mdi } from '@/shared/utils/mdiHelper';
 *
 * // 부모 문서 - 탭 열기
 * const doc = mdi.open('/products/detail?id=123');
 *
 * // 부모 문서 - 자식 문서 READY 이벤트 대기
 * mdi.onMessage('READY', (msg) => {
 *   mdi.postMessage(doc, { type: 'INIT_DATA', payload: { id: 123 } });
 * });
 *
 * // 자식 문서 - 준비 완료 알림
 * window.opener.postMessage({ type: 'READY' }, '*');
 */

import logger from './logger';

const log = logger.getLogger('MDIHelper');

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * MDI 문서 정보
 */
export interface MDIDocument {
  /** 문서 고유 ID */
  id: string;
  /** Window 객체 참조 (내부용) */
  tabRef: Window | null;
  /** 문서 URL */
  url: string;
  /** 열린 시간戳 */
  openedAt: number;
  /** 문서 이름 (선택적) */
  name?: string;
}

/**
 * 메시지 이벤트 타입
 */
export type MDIMessageType = 'UPDATE_DATA' | 'REFRESH' | 'CLOSE' | 'PING' | 'PONG' | 'READY' | 'RENAME' | 'CUSTOM';

/**
 * MDI 메시지 구조
 */
export interface MDIMessage<T = unknown> {
  /** 메시지 타입 */
  type: MDIMessageType | string;
  /** 메시지 페이로드 */
  payload?: T;
  /** 발신자 문서 ID */
  senderId?: string;
  /** 메시지 타임스탬프 */
  timestamp?: number;
}

/**
 * 메시지 핸들러 타입
 */
export type MDIMessageHandler<T = unknown> = (message: MDIMessage<T>) => void;

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * 열린 문서 관리 Map
 */
const documentRegistry = new Map<string, MDIDocument>();

/**
 * 메시지 핸들러 관리 Map
 */
const messageHandlers = new Map<string, Set<MDIMessageHandler>>();

// ============================================================================
// PRIVATE UTILITIES
// ============================================================================

/**
 * 문서 ID 생성
 */
function generateDocumentId(): string {
  return `mdi-document-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ============================================================================
// CORE API
// ============================================================================

/**
 * 새 문서 열기
 *
 * @param url - 열 URL 또는 경로
 * @returns MDIDocument 객체
 *
 * @example
 * const doc = mdi.open('/products/detail?id=123');
 */
export function open(url: string): MDIDocument {
  const id = generateDocumentId();

  log.debug('Opening MDI document (new tab)', { id, url });

  // window.open 호출 - 무조건 _blank로 새 탭
  const tabRef = window.open(url, '_blank');

  if (!tabRef) {
    log.error('Failed to open document (popup blocked?)');
    throw new Error('팝업이 차단되었습니다. 팝업을 허용해주세요.');
  }

  // 문서 레지스트리에 등록
  const document: MDIDocument = {
    id,
    tabRef,
    url,
    openedAt: Date.now(),
  };

  documentRegistry.set(id, document);

  // 문서 닫힘 감지
  const checkClosed = setInterval(() => {
    if (tabRef.closed) {
      clearInterval(checkClosed);
      log.debug('Document closed by user', { id });
      documentRegistry.delete(id);
    }
  }, 1000);

  log.info('MDI document opened', { id, url });

  return document;
}

/**
 * 문서 닫기
 *
 * @param mdiDocument - 닫을 MDIDocument 객체 또는 ID
 * @returns 성공 여부
 *
 * @example
 * mdi.close(docRef);
 * // 또는
 * mdi.close('mdi-document-123');
 */
export function close(mdiDocument: MDIDocument | string): boolean {
  const id = typeof mdiDocument === 'string' ? mdiDocument : mdiDocument.id;
  const docInfo = documentRegistry.get(id);

  if (!docInfo) {
    log.warn('Document not found in registry', { id });
    return false;
  }

  if (docInfo.tabRef && !docInfo.tabRef.closed) {
    docInfo.tabRef.close();
    log.info('MDI document closed', { id });
  }

  documentRegistry.delete(id);
  return true;
}

/**
 * 모든 문서 닫기
 *
 * @example
 * mdi.closeAll();
 */
export function closeAll(): void {
  let closedCount = 0;

  documentRegistry.forEach((docInfo) => {
    if (docInfo.tabRef && !docInfo.tabRef.closed) {
      docInfo.tabRef.close();
      closedCount += 1;
    }
  });

  documentRegistry.clear();

  log.info('All MDI documents closed', { count: closedCount });
}

/**
 * 특정 문서에 메시지 전송
 *
 * @param mdiDocument - 대상 MDIDocument 객체 또는 ID
 * @param message - 전송할 메시지
 * @param targetOrigin - 대상 origin (기본: '*')
 *
 * @example
 * mdi.postMessage(docRef, {
 *   type: 'UPDATE_DATA',
 *   payload: { id: 123, name: 'Product' }
 * });
 */
export function postMessage<T = unknown>(
  mdiDocument: MDIDocument | string,
  message: MDIMessage<T>,
  targetOrigin = '*'
): void {
  const id = typeof mdiDocument === 'string' ? mdiDocument : mdiDocument.id;
  const docInfo = documentRegistry.get(id);

  if (!docInfo) {
    log.warn('Document not found for postMessage', { id });
    return;
  }

  if (!docInfo.tabRef || docInfo.tabRef.closed) {
    log.warn('Target document is closed', { id });
    return;
  }

  const messageWithMeta: MDIMessage<T> = {
    ...message,
    senderId: id,
    timestamp: Date.now(),
  };

  docInfo.tabRef.postMessage(messageWithMeta, targetOrigin);

  log.debug('Message posted', {
    from: id,
    to: docInfo.url,
    type: message.type,
  });
}

/**
 * 열린 모든 문서에 메시지 브로드캐스트
 *
 * @param message - 전송할 메시지
 * @param excludeId - 제외할 문서 ID
 *
 * @example
 * mdi.broadcast({
 *   type: 'REFRESH',
 *   payload: { timestamp: Date.now() }
 * });
 */
export function broadcast<T = unknown>(message: MDIMessage<T>, excludeId?: string): void {
  documentRegistry.forEach((docInfo, id) => {
    if (id !== excludeId) {
      postMessage(id, message);
    }
  });

  log.debug('Message broadcasted', {
    type: message.type,
    exclude: excludeId,
    recipientCount: documentRegistry.size - (excludeId ? 1 : 0),
  });
}

// ============================================================================
// MESSAGE HANDLING
// ============================================================================

/**
 * 메시지 수신 핸들러 등록
 *
 * @param messageType - 수신할 메시지 타입
 * @param handler - 메시지 처리 함수
 * @returns 정리 함수
 *
 * @example
 * // READY 메시지 대기
 * const cleanup = mdi.onMessage('READY', (message) => {
 *   console.log('Child document ready:', message.payload);
 *   // 자식 문서 준비 완료, 데이터 전송
 *   mdi.postMessage(childDoc, { type: 'INIT_DATA', payload: { id: 123 } });
 * });
 *
 * // 나중에 제거
 * cleanup();
 */
export function onMessage<T = unknown>(
  messageType: MDIMessageType | string,
  handler: MDIMessageHandler<T>
): () => void {
  if (!messageHandlers.has(messageType)) {
    messageHandlers.set(messageType, new Set());
  }

  messageHandlers.get(messageType)!.add(handler as MDIMessageHandler);

  log.debug('Message handler registered', { messageType });

  // 정리 함수 반환
  return () => {
    const handlers = messageHandlers.get(messageType);
    if (handlers) {
      handlers.delete(handler as MDIMessageHandler);
      log.debug('Message handler unregistered', { messageType });
    }
  };
}

/**
 * 메시지 수신 처리 (내부용)
 *
 * @description
 * window.message 이벤트 리스너에서 호출
 */
function handleMessage(event: MessageEvent): void {
  const message = event.data as MDIMessage;

  if (!message || !message.type) {
    return;
  }

  const { type } = message;

  // PING/PONG 자동 응답
  if (type === 'PING') {
    if (event.source && typeof event.source.postMessage === 'function') {
      event.source.postMessage({ type: 'PONG', senderId: message.senderId }, { targetOrigin: event.origin });
    }
    return;
  }

  // 등록된 핸들러 실행
  const handlers = messageHandlers.get(type);
  if (handlers) {
    handlers.forEach((handler) => {
      try {
        handler(message);
      } catch (error) {
        log.error('Message handler error', { type, error });
      }
    });

    log.debug('Message handled', { type, handlerCount: handlers.size });
  }
}

// 메시지 리스너 등록 (최초 1회만)
if (typeof window !== 'undefined') {
  window.addEventListener('message', handleMessage);
  log.debug('Global message listener registered');
}

// ============================================================================
// QUERY API
// ============================================================================

/**
 * 열린 모든 문서 목록 반환
 */
export function getOpenDocuments(): MDIDocument[] {
  // 닫힌 문서 제거
  const closedDocuments: string[] = [];

  documentRegistry.forEach((docInfo, id) => {
    if (docInfo.tabRef?.closed) {
      closedDocuments.push(id);
    }
  });

  closedDocuments.forEach((id) => documentRegistry.delete(id));

  return Array.from(documentRegistry.values());
}

/**
 * 열린 문서 개수 반환
 */
export function getDocumentCount(): number {
  return getOpenDocuments().length;
}

/**
 * 특정 문서가 열려있는지 확인
 */
export function isDocumentOpen(mdiDocument: MDIDocument | string): boolean {
  const id = typeof mdiDocument === 'string' ? mdiDocument : mdiDocument.id;
  const docInfo = documentRegistry.get(id);

  if (!docInfo) {
    return false;
  }

  return !docInfo.tabRef?.closed;
}

/**
 * 문서 포커스
 */
export function focus(mdiDocument: MDIDocument | string): void {
  const id = typeof mdiDocument === 'string' ? mdiDocument : mdiDocument.id;
  const docInfo = documentRegistry.get(id);

  if (docInfo?.tabRef && !docInfo.tabRef.closed) {
    docInfo.tabRef.focus();
    log.debug('Document focused', { id });
  }
}

/**
 * 문서 이름 변경
 *
 * @param mdiDocument - 이름을 변경할 MDIDocument 객체 또는 ID
 * @param name - 새로운 이름
 * @returns 성공 여부
 *
 * @example
 * mdi.rename(docRef, '상세 정보');
 * // 또는
 * mdi.rename('mdi-document-123', '새 이름');
 */
export function rename(mdiDocument: MDIDocument | string, name: string): boolean {
  const id = typeof mdiDocument === 'string' ? mdiDocument : mdiDocument.id;
  const docInfo = documentRegistry.get(id);

  if (!docInfo) {
    log.warn('Document not found in registry', { id });
    return false;
  }

  const oldName = docInfo.name;
  docInfo.name = name;

  // 자식 문서에 이름 변경 알림
  if (docInfo.tabRef && !docInfo.tabRef.closed) {
    postMessage(id, { type: 'RENAME', payload: { name } });
  }

  log.info('MDI document renamed', { id, oldName, newName: name });

  return true;
}

// ============================================================================
// UTILITY OBJECT
// ============================================================================

/**
 * MDI Helper Utility Object
 */
export const mdi = {
  open,
  close,
  closeAll,
  postMessage,
  broadcast,
  onMessage,
  getOpenDocuments,
  getDocumentCount,
  isDocumentOpen,
  focus,
  rename,
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default mdi;
