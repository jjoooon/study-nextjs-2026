/**
 * MDI (Multiple Document Interface) Helper 2 - In-Page Tab Version
 *
 * @description
 * 페이지 내에서 여러 문서/탭을 관리하는 유틸리티입니다.
 * iframe 기반 탭 UI를 구현하며, window.open 방식의 mdiHelper와 호환되는 API를 제공합니다.
 *
 * @packageDocumentation
 *
 * @example
 * ```ts
 * import { mdi } from '@/shared/utils/mdiHelper2';
 *
 * // 부모 문서 - 새 탭 열기
 * const doc = mdi.open('/sample/mdi2/child', {
 *   initialData: { productId: 123, mode: 'edit' },
 *   title: '상품 편집'
 * });
 *
 * // 부모 문서 - 자식 문서 READY 이벤트 대기
 * mdi.onMessage('READY', (msg) => {
 *   console.log('Child ready:', msg.payload);
 *   mdi.postMessage(doc.id, { type: 'INIT_DATA', payload: { id: 123 } });
 * });
 *
 * // 자식 문서 - 초기 데이터 수신
 * const options = mdi.getOpenOptions<{ productId: number; mode: string }>();
 * console.log('Initial data:', options?.initialData);
 * ```
 */

import logger from './logger';

const log = logger.getLogger('MDIHelper2');

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * MDI 문서 정보
 *
 * @description
 * 열린 MDI 문서의 메타데이터를 포함합니다.
 */
export interface MDIDocument {
  /** 문서 고유 ID (자동 생성됨) */
  id: string;
  /** 문서 URL (mdiDocId 쿼리 파라미터 포함) */
  url: string;
  /** 열린 시간 타임스탬프 */
  openedAt: number;
  /** 문서 표시 이름 (선택적) */
  name?: string;
}

/**
 * 미리 정의된 메시지 타입
 *
 * @description
 * - `UPDATE_DATA`: 데이터 업데이트 요청
 * - `REFRESH`: 문서 새로고침 요청
 * - `CLOSE`: 문서 닫기 알림
 * - `PING`: 연결 확인 요청
 * - `PONG`: PING에 대한 응답
 * - `READY`: 자식 문서 준비 완료 알림
 * - `RENAME`: 문서 이름 변경 알림
 * - `CUSTOM`: 사용자 정의 메시지
 */
export type MDIMessageType = 'UPDATE_DATA' | 'REFRESH' | 'CLOSE' | 'PING' | 'PONG' | 'READY' | 'RENAME' | 'CUSTOM';

/**
 * MDI 메시지 구조
 *
 * @template T - 페이로드 데이터 타입
 */
export interface MDIMessage<T = unknown> {
  /** 메시지 타입 */
  type: MDIMessageType | string;
  /** 메시지 페이로드 데이터 */
  payload?: T;
  /** 발신자 문서 ID (자동 추가됨) */
  senderId?: string;
  /** 메시지 타임스탬프 (자동 추가됨) */
  timestamp?: number;
}

/**
 * 메시지 핸들러 함수 타입
 *
 * @template T - 페이로드 데이터 타입
 */
export type MDIMessageHandler<T = unknown> = (message: MDIMessage<T>) => void;

/**
 * MDI 문서 열기 옵션
 *
 * @template T - 초기 데이터 타입
 */
export interface MDIOpenOptions<T = unknown> {
  /** 자식 문서에 전달할 초기 데이터 */
  initialData?: T;
  /** 문서 표시 이름 및 브라우저 제목 */
  title?: string;
}

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
 * 현재 문서 ID를 설정합니다 (내부용)
 *
 * @internal
 * @param docId - 설정할 문서 ID
 */
export function _setCurrentDocumentId(docId: string): void {
  currentDocumentId = docId;
}

/**
 * 현재 문서 ID를 반환합니다 (내부용)
 *
 * @internal
 * @returns 현재 문서 ID 또는 null
 */
export function _getCurrentDocumentId(): string | null {
  return currentDocumentId;
}

// ============================================================================
// INITIAL DATA HANDLING (sessionStorage)
// ============================================================================

/**
 * sessionStorage key prefix for initial data
 */
const INIT_DATA_KEY_PREFIX = 'mdi2-init-';

/**
 * 자식 문서를 위해 sessionStorage에 초기 데이터를 저장합니다 (내부용)
 *
 * @internal
 * @param documentId - MDI 문서 ID
 * @param data - 자식 문서에 전달할 초기 데이터
 */
function storeInitialData(documentId: string, data: unknown): void {
  if (typeof window === 'undefined') return;

  const key = `${INIT_DATA_KEY_PREFIX}${documentId}`;
  try {
    const serialized = JSON.stringify(data);
    sessionStorage.setItem(key, serialized);
    log.debug('Initial data stored', { documentId, key });
  } catch (error) {
    log.error('Failed to store initial data', { documentId, error });
  }
}

/**
 * URL에서 문서 ID를 추출하여 sessionStorage에서 열기 옵션을 가져옵니다.
 *
 * @description
 * 자식 문서에서 호출하여 부모가 전달한 초기 데이터와 제목을 가져옵니다.
 * 데이터를 읽은 후에는 sessionStorage에서 자동으로 삭제됩니다.
 *
 * @template T - 초기 데이터 타입
 * @param documentId - MDI 문서 ID (미제공 시 URL에서 자동 추출)
 * @returns 열기 옵션 또는 null
 *
 * @example
 * ```ts
 * // 자식 문서에서 URL 파라미터로부터 자동 추출
 * const options = mdi.getOpenOptions<{ productId: number; mode: string }>();
 * if (options) {
 *   console.log('Initial data:', options.initialData);
 *   console.log('Title:', options.title);
 * }
 *
 * // 또는 문서 ID를 직접 지정
 * const options = mdi.getOpenOptions('mdi2-document-123');
 * ```
 */
export function getOpenOptions<T = unknown>(documentId?: string): MDIOpenOptions<T> | null {
  if (typeof window === 'undefined') return null;

  // If documentId not provided, extract from URL
  if (!documentId) {
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    documentId = urlParams.get('mdiDocId') || hashParams.get('mdiDocId') || undefined;
  }

  if (!documentId) {
    log.warn('No document ID found in URL');
    return null;
  }

  const key = `${INIT_DATA_KEY_PREFIX}${documentId}`;
  try {
    const serialized = sessionStorage.getItem(key);
    if (!serialized) {
      log.debug('No initial data found', { documentId, key });
      return null;
    }

    const data = JSON.parse(serialized) as MDIOpenOptions<T>;
    // Remove after reading to prevent memory leaks
    sessionStorage.removeItem(key);
    log.info('Initial data retrieved and cleared', { documentId });
    return data;
  } catch (error) {
    log.error('Failed to retrieve initial data', { documentId, error });
    return null;
  }
}

/**
 * URL에 문서 ID 쿼리 파라미터를 추가합니다 (내부용)
 *
 * @internal
 * @param url - 원본 URL
 * @param documentId - 추가할 문서 ID
 * @returns mdiDocId 파라미터가 포함된 URL
 */
function appendDocumentIdToUrl(url: string, documentId: string): string {
  if (typeof window === 'undefined') return url;

  try {
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.set('mdiDocId', documentId);
    return urlObj.toString();
  } catch {
    // Relative URL인 경우
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}mdiDocId=${documentId}`;
  }
}

// ============================================================================
// CORE API
// ============================================================================

/**
 * 새 MDI 문서를 엽니다.
 *
 * @description
 * iframe 내에서 열릴 문서를 생성하고 등록합니다.
 * 초기 데이터는 sessionStorage를 통해 전달되며, URL에 mdiDocId 파라미터가 추가됩니다.
 *
 * @template T - 초기 데이터 타입
 * @param url - 열릴 문서의 URL
 * @param options - 열기 옵션 (초기 데이터, 제목 등)
 * @returns 생성된 MDIDocument 객체
 *
 * @example
 * ```ts
 * // 기본 사용
 * const doc = mdi.open('/sample/mdi2/child');
 *
 * // 초기 데이터 전달
 * const doc = mdi.open('/sample/mdi2/child', {
 *   initialData: { productId: 123, mode: 'edit' }
 * });
 *
 * // 초기 데이터와 제목 설정
 * const doc = mdi.open('/sample/mdi2/child', {
 *   initialData: { productId: 123, mode: 'edit' },
 *   title: '상품 상세 편집'
 * });
 *
 * // 자식 문서에서 데이터 수신
 * const options = mdi.getOpenOptions<{ productId: number; mode: string }>();
 * console.log(options?.initialData); // { productId: 123, mode: 'edit' }
 * ```
 */
export function open<T = unknown>(url: string, options?: MDIOpenOptions<T>): MDIDocument {
  const id = generateDocumentId();

  log.debug('Opening MDI document (in-page tab)', { id, url, options });

  // options 전체를 sessionStorage에 저장
  if (options !== undefined) {
    storeInitialData(id, options);
  }

  // URL에 document ID 추가 (자식 문서가 초기 데이터를 찾기 위해)
  const urlWithId = appendDocumentIdToUrl(url, id);

  // 문서 레지스트리에 등록
  const document: MDIDocument = {
    id,
    url: urlWithId,
    openedAt: Date.now(),
    name: options?.title,
  };

  documentRegistry.set(id, document);

  log.info('MDI document opened', { id, url: urlWithId, options });

  return document;
}

/**
 * MDI 문서를 닫습니다.
 *
 * @description
 * 지정된 문서를 레지스트리에서 제거하고 등록된 CLOSE 핸들러들을 호출합니다.
 *
 * @param mdiDocument - 닫을 MDIDocument 객체 또는 문서 ID
 * @returns 성공 시 true, 실패 시 false
 *
 * @example
 * ```ts
 * // 문서 객체로 닫기
 * mdi.close(docRef);
 *
 * // ID로 닫기
 * mdi.close('mdi2-document-123');
 * ```
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
 * 열린 모든 MDI 문서를 닫습니다.
 *
 * @description
 * 레지스트리의 모든 문서를 제거하고 각 문서에 등록된 CLOSE 핸들러들을 호출합니다.
 *
 * @example
 * ```ts
 * mdi.closeAll();
 * ```
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
 * 특정 문서에 메시지를 전송합니다.
 *
 * @description
 * 대상 문서에 등록된 해당 타입의 메시지 핸들러들을 호출합니다.
 * senderId와 timestamp는 자동으로 추가됩니다.
 *
 * @template T - 페이로드 데이터 타입
 * @param mdiDocument - 대상 MDIDocument 객체 또는 문서 ID
 * @param message - 전송할 메시지
 * @param _targetOrigin - 호환성을 위한 매개변수 (현재 버전에서는 사용하지 않음)
 *
 * @example
 * ```ts
 * mdi.postMessage(docRef, {
 *   type: 'UPDATE_DATA',
 *   payload: { id: 123, name: 'Product' }
 * });
 * ```
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
 * 부모 문서에게 메시지를 전송합니다 (자식 문서용).
 *
 * @description
 * 현재 문서가 자식 문서인 경우 부모 문서의 메시지 핸들러를 호출합니다.
 * senderId와 timestamp는 자동으로 추가됩니다.
 *
 * @template T - 페이로드 데이터 타입
 * @param message - 전송할 메시지
 *
 * @example
 * ```ts
 * // 자식 문서에서 부모에게 메시지 전송
 * mdi.postMessageToParent({
 *   type: 'DATA_UPDATED',
 *   payload: { message: 'Hello from child' }
 * });
 * ```
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
 * 열린 모든 문서에 메시지를 브로드캐스트합니다.
 *
 * @description
 * 등록된 모든 문서에 메시지를 전송합니다. 특정 문서를 제외할 수 있습니다.
 *
 * @template T - 페이로드 데이터 타입
 * @param message - 전송할 메시지
 * @param excludeId - 메시지 전송에서 제외할 문서 ID (선택적)
 *
 * @example
 * ```ts
 * // 모든 문서에 새로고침 요청
 * mdi.broadcast({
 *   type: 'REFRESH',
 *   payload: { timestamp: Date.now() }
 * });
 *
 * // 특정 문서 제외하고 전송
 * mdi.broadcast({ type: 'UPDATE' }, 'mdi2-document-123');
 * ```
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
 * 메시지 수신 핸들러를 등록합니다.
 *
 * @description
 * 특정 타입의 메시지를 수신할 때 호출될 핸들러를 등록합니다.
 * 여러 핸들러를 동일한 타입에 등록할 수 있습니다.
 *
 * @template T - 페이로드 데이터 타입
 * @param messageType - 수신할 메시지 타입
 * @param handler - 메시지 처리 함수
 * @returns 핸들러를 제거하는 정리(cleanup) 함수
 *
 * @example
 * ```ts
 * // READY 메시지 대기
 * const cleanup = mdi.onMessage('READY', (message) => {
 *   console.log('Child document ready:', message.payload);
 *   // 자식 문서 준비 완료, 데이터 전송
 *   mdi.postMessage(childDoc, { type: 'INIT_DATA', payload: { id: 123 } });
 * });
 *
 * // 나중에 핸들러 제거
 * cleanup();
 *
 * // React 컴포넌트에서 사용 시
 * useEffect(() => {
 *   const cleanup = mdi.onMessage('UPDATE', handleMessage);
 *   return cleanup;
 * }, []);
 * ```
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
 * 열린 모든 문서 목록을 반환합니다.
 *
 * @returns 등록된 모든 MDIDocument 배열
 *
 * @example
 * ```ts
 * const documents = mdi.getOpenDocuments();
 * documents.forEach(doc => console.log(doc.id, doc.name));
 * ```
 */
export function getOpenDocuments(): MDIDocument[] {
  return Array.from(documentRegistry.values());
}

/**
 * 열린 문서의 개수를 반환합니다.
 *
 * @returns 열린 문서 수
 *
 * @example
 * ```ts
 * console.log(`열린 문서: ${mdi.getDocumentCount()}개`);
 * ```
 */
export function getDocumentCount(): number {
  return getOpenDocuments().length;
}

/**
 * 특정 문서가 열려 있는지 확인합니다.
 *
 * @param mdiDocument - 확인할 MDIDocument 객체 또는 문서 ID
 * @returns 열려 있으면 true, 그렇지 않으면 false
 *
 * @example
 * ```ts
 * if (mdi.isDocumentOpen(docRef)) {
 *   console.log('문서가 열려 있습니다');
 * }
 * ```
 */
export function isDocumentOpen(mdiDocument: MDIDocument | string): boolean {
  const id = typeof mdiDocument === 'string' ? mdiDocument : mdiDocument.id;
  return documentRegistry.has(id);
}

/**
 * 문서를 포커스합니다 (현재 버전에서는 로그만 기록).
 *
 * @description
 * In-Page Tab 버전에서는 포커스 동작이 UI 레벨에서 처리되므로
 * 이 함수는 로그만 기록합니다.
 *
 * @param mdiDocument - 포커스할 MDIDocument 객체 또는 문서 ID
 *
 * @example
 * ```ts
 * mdi.focus(docRef);
 * ```
 */
export function focus(mdiDocument: MDIDocument | string): void {
  const id = typeof mdiDocument === 'string' ? mdiDocument : mdiDocument.id;
  if (documentRegistry.has(id)) {
    log.debug('Document focused', { id });
  }
}

/**
 * 문서 이름을 변경합니다.
 *
 * @description
 * 문서의 표시 이름을 변경하고 자식 문서에 RENAME 메시지를 전송합니다.
 *
 * @param mdiDocument - 이름을 변경할 MDIDocument 객체 또는 문서 ID
 * @param name - 새로운 문서 이름
 * @returns 성공 시 true, 실패 시 false
 *
 * @example
 * ```ts
 * // 문서 객체로 이름 변경
 * mdi.rename(docRef, '상세 정보');
 *
 * // ID로 이름 변경
 * mdi.rename('mdi2-document-123', '새 이름');
 * ```
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
 * MDI Helper 유틸리티 객체
 *
 * @description
 * 모든 MDI 기능을 제공하는 기본 내보내기 객체입니다.
 * named import로 개별 함수를 가져오거나 default import로 mdi 객체를 사용할 수 있습니다.
 *
 * @example
 * ```ts
 * // Default import
 * import mdi from '@/shared/utils/mdiHelper2';
 * mdi.open('/path');
 *
 * // Named import
 * import { mdi, open, close, onMessage } from '@/shared/utils/mdiHelper2';
 * const doc = open('/path');
 * onMessage('READY', handler);
 * ```
 */
export const mdi = {
  /** 새 문서 열기 */
  open,
  /** 문서 닫기 */
  close,
  /** 모든 문서 닫기 */
  closeAll,
  /** 특정 문서에 메시지 전송 */
  postMessage,
  /** 부모 문서에 메시지 전송 (자식 문서용) */
  postMessageToParent,
  /** 모든 문서에 메시지 브로드캐스트 */
  broadcast,
  /** 메시지 핸들러 등록 */
  onMessage,
  /** 열린 모든 문서 목록 반환 */
  getOpenDocuments,
  /** 열린 문서 개수 반환 */
  getDocumentCount,
  /** 문서가 열려 있는지 확인 */
  isDocumentOpen,
  /** 문서 포커스 */
  focus,
  /** 문서 이름 변경 */
  rename,
  /** 열기 옵션 가져오기 (자식 문서용) */
  getOpenOptions,
} as const;

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default mdi;
