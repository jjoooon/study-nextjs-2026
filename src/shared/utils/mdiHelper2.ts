/**
 * MDI (Multiple Document Interface) Helper 2 - In-Page Tab Version
 *
 * @description
 * - 페이지 내에서 여러 문서/탭을 관리하는 유틸리티
 * - React 컴포넌트로 탭 UI를 구현 (window.open 대신)
 * - 기존 mdiHelper와 호환되는 API 제공
 *
 * @usage
 * import { mdi } from '@/shared/utils/mdiHelper2';
 *
 * // 부모 문서 - 탭 열기
 * const doc = mdi.open('child');
 *
 * // 부모 문서 - 자식 문서 READY 이벤트 대기
 * mdi.onMessage('READY', (msg) => {
 *   mdi.postMessage(doc.id, { type: 'INIT_DATA', payload: { id: 123 } });
 * });
 *
 * // 자식 문서 - 부모에게 메시지 전송
 * mdi.postMessageToParent({ type: 'DATA_UPDATED' });
 */

import logger from './logger';

const log = logger.getLogger('MDIHelper2');

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * MDI 문서 정보 (In-Page Tab 버전)
 */
export interface MDIDocument {
  /** 문서 고유 ID */
  id: string;
  /** React 컴포넌트 타입 (내부용) */
  tabRef: string | null;
  /** 문서 URL 또는 컴포넌트 타입 */
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

/**
 * 부모 문서 ID (자식 문서용)
 * null이면 현재 문서가 부모 또는 루트 문서임
 */
let currentDocumentId: string | null = null;

// ============================================================================
// PRIVATE UTILITIES
// ============================================================================

/**
 * 문서 ID 생성
 */
function generateDocumentId(): string {
  return `mdi2-document-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * 현재 문서 ID 설정 (자식 문서용)
 */
export function _setCurrentDocumentId(docId: string): void {
  currentDocumentId = docId;
}

/**
 * 현재 문서 ID 가져오기
 */
export function _getCurrentDocumentId(): string | null {
  return currentDocumentId;
}

// ============================================================================
// CORE API
// ============================================================================

/**
 * 새 문서 열기 (In-Page Tab)
 *
 * @param url - 열 문서의 컴포넌트 타입 또는 URL
 * @returns MDIDocument 객체
 *
 * @example
 * const doc = mdi.open('child');
 */
export function open(url: string): MDIDocument {
  const id = generateDocumentId();

  log.debug('Opening MDI document (in-page tab)', { id, url });

  // 문서 레지스트리에 등록
  const document: MDIDocument = {
    id,
    tabRef: url, // 컴포넌트 타입 저장
    url,
    openedAt: Date.now(),
  };

  documentRegistry.set(id, document);

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
 * mdi.close('mdi2-document-123');
 */
export function close(mdiDocument: MDIDocument | string): boolean {
  const id = typeof mdiDocument === 'string' ? mdiDocument : mdiDocument.id;
  const docInfo = documentRegistry.get(id);

  if (!docInfo) {
    log.warn('Document not found in registry', { id });
    return false;
  }

  // 닫힌 문서에게 알림
  const handlers = messageHandlers.get('CLOSE');
  if (handlers) {
    handlers.forEach((handler) => {
      try {
        handler({ type: 'CLOSE', senderId: id, timestamp: Date.now() } as MDIMessage);
      } catch (error) {
        log.error('CLOSE handler error', { id, error });
      }
    });
  }

  documentRegistry.delete(id);
  log.info('MDI document closed', { id });

  return true;
}

/**
 * 모든 문서 닫기
 *
 * @example
 * mdi.closeAll();
 */
export function closeAll(): void {
  const closedCount = documentRegistry.size;

  documentRegistry.forEach((docInfo) => {
    // 닫힌 문서에게 알림
    const handlers = messageHandlers.get('CLOSE');
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler({ type: 'CLOSE', senderId: docInfo.id, timestamp: Date.now() } as MDIMessage);
        } catch (error) {
          log.error('CLOSE handler error', { id: docInfo.id, error });
        }
      });
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
 * @param _targetOrigin - 호환성을 위한 매개변수 (In-Page 버전에서는 사용하지 않음)
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
  _targetOrigin?: string
): void {
  const id = typeof mdiDocument === 'string' ? mdiDocument : mdiDocument.id;
  const docInfo = documentRegistry.get(id);

  if (!docInfo) {
    log.warn('Document not found for postMessage', { id });
    return;
  }

  // 메시지 형식 검증
  if (!message || typeof message !== 'object' || !message.type) {
    log.warn('Invalid message format', { id });
    return;
  }

  const messageWithMeta: MDIMessage<T> = {
    ...message,
    senderId: currentDocumentId || 'parent',
    timestamp: Date.now(),
  };

  // 메시지 핸들러 실행 (대상 문서가 현재 컨텍스트에서 처리)
  const handlers = messageHandlers.get(message.type);
  if (handlers) {
    handlers.forEach((handler) => {
      try {
        handler(messageWithMeta);
      } catch (error) {
        log.error('Message handler error', { type: message.type, error });
      }
    });

    log.debug('Message posted', {
      from: currentDocumentId || 'parent',
      to: id,
      type: message.type,
    });
  }
}

/**
 * 부모 문서에게 메시지 전송 (자식 문서용)
 *
 * @param message - 전송할 메시지
 *
 * @example
 * mdi.postMessageToParent({
 *   type: 'DATA_UPDATED',
 *   payload: { message: 'Hello from child' }
 * });
 */
export function postMessageToParent<T = unknown>(message: MDIMessage<T>): void {
  if (!currentDocumentId) {
    log.warn('postMessageToParent called from non-child document');
    return;
  }

  // 메시지 형식 검증
  if (!message || typeof message !== 'object' || !message.type) {
    log.warn('Invalid message format for postMessageToParent');
    return;
  }

  const messageWithMeta: MDIMessage<T> = {
    ...message,
    senderId: currentDocumentId,
    timestamp: Date.now(),
  };

  // 부모의 메시지 핸들러 실행
  const handlers = messageHandlers.get(message.type);
  if (handlers) {
    handlers.forEach((handler) => {
      try {
        handler(messageWithMeta);
      } catch (error) {
        log.error('Message handler error', { type: message.type, error });
      }
    });

    log.debug('Message posted to parent', {
      from: currentDocumentId,
      type: message.type,
    });
  }
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

// ============================================================================
// QUERY API
// ============================================================================

/**
 * 열린 모든 문서 목록 반환
 */
export function getOpenDocuments(): MDIDocument[] {
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
  return documentRegistry.has(id);
}

/**
 * 문서 포커스 (In-Page 버전에서는 선택만 처리)
 */
export function focus(mdiDocument: MDIDocument | string): void {
  const id = typeof mdiDocument === 'string' ? mdiDocument : mdiDocument.id;
  if (documentRegistry.has(id)) {
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
 * mdi.rename('mdi2-document-123', '새 이름');
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
  postMessage(id, { type: 'RENAME', payload: { name } });

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
  postMessageToParent,
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
