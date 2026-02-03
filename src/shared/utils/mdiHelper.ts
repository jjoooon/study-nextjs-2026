/**
 * MDI (Multiple Document Interface) Helper
 *
 * 페이지 내에서 여러 문서/탭을 관리하는 유틸리티입니다.
 * window.open을 사용하여 새 탭으로 문서 열기/닫기를 구현하며,
 * 향후 탭 UI 기반 구현으로 확장 가능한 설계입니다.
 *
 * @example
 * ```ts
 * import { mdi } from '@/shared/utils/mdiHelper';
 *
 * // 부모 문서 - 초기 데이터와 함께 탭 열기
 * const doc = mdi.open('/products/detail', { initialData: { productId: 123 }, title: '상품 상세' });
 *
 * // 자식 문서 - 초기 데이터 수신
 * const options = mdi.getOpenOptions<{ productId: number }>();
 * const initialData = options?.initialData; // { productId: 123 }
 * ```
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
  /** 닫힘 감지 인터벌 ID (내부용) */
  _closeCheckInterval?: ReturnType<typeof setInterval>;
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

/**
 * MDI 문서 열기 옵션
 */
export interface MDIOpenOptions<T = unknown> {
  /** 자식 문서에 전달할 초기 데이터 */
  initialData?: T;
  /** 초기 문서 이름 (window title) */
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
 * 허용된 출처 목록 (보안: 비어있으면 현재 origin만 허용)
 */
const allowedOrigins = new Set<string>();

/**
 * 현재 origin (메시지 수신 시 검증용)
 */
const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';

// ============================================================================
// PRIVATE UTILITIES
// ============================================================================

/**
 * MDI 문서 추적을 위한 고유 ID를 생성합니다.
 *
 * @returns "mdi-document-{timestamp}-{random}" 형식의 고유 식별자 문자열
 */
function generateDocumentId(): string {
  return `mdi-document-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * 닫힌 문서의 리소스를 정리합니다 (내부용).
 *
 * @param id - 문서 ID
 * @param docInfo - 문서 정보
 */
function cleanupClosedDocument(id: string, docInfo: MDIDocument): void {
  if (docInfo._closeCheckInterval) {
    clearInterval(docInfo._closeCheckInterval);
  }
  documentRegistry.delete(id);
}

/**
 * 허용된 출처 추가
 *
 * @param origin - 허용할 origin (예: 'https://example.com')
 *
 * @example
 * mdi.addAllowedOrigin('https://trusted-site.com');
 */
export function addAllowedOrigin(origin: string): void {
  allowedOrigins.add(origin);
  log.info('Allowed origin added', { origin });
}

/**
 * 허용된 출처 제거
 *
 * @param origin - 제거할 origin
 */
export function removeAllowedOrigin(origin: string): void {
  allowedOrigins.delete(origin);
  log.info('Allowed origin removed', { origin });
}

// ============================================================================
// INITIAL DATA HANDLING (sessionStorage)
// ============================================================================

// sessionStorage key prefix for initial data
const INIT_DATA_KEY_PREFIX = 'mdi-init-';

/**
 * 자식 문서에 전달할 초기 데이터를 sessionStorage에 저장합니다.
 *
 * @param documentId - MDI 문서 ID
 * @param data - 자식 문서에 전달할 초기 데이터
 * @throws {Error} JSON 직렬화 또는 sessionStorage 저장 실패 시 (에러 로그만 기록)
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
 * sessionStorage에서 열기 옵션을 가져옵니다 (자식 문서에서 호출).
 *
 * @param documentId - URL에서 추출한 MDI 문서 ID (미입력 시 URL에서 자동 추출)
 * @returns 찾은 옵션 또는 null
 *
 * @example
 * // 자식 문서에서
 * const options = mdi.getOpenOptions<{ productId: number }>();
 * if (options) {
 *   console.log('Received initialData:', options.initialData);
 *   console.log('Received title:', options.title);
 * }
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
 * 출처를 검증하여 메시지 수신 허용 여부를 확인합니다 (보안).
 *
 * @param origin - 검증할 origin
 * @returns 허용된 출처인지 여부
 */
function isOriginAllowed(origin: string): boolean {
  if (allowedOrigins.size === 0) {
    return origin === currentOrigin;
  }
  return allowedOrigins.has(origin);
}

// ============================================================================
// CORE API
// ============================================================================

/**
 * 새 문서 열기
 *
 * @param url - 열 URL 또는 경로
 * @param options - 옵션 객체
 * @returns MDIDocument 객체
 *
 * @example
 * // 기본 사용
 * const doc = mdi.open('/products/detail?id=123');
 *
 * // 초기 데이터 전달
 * const doc = mdi.open('/products/detail', { initialData: { productId: 123, mode: 'edit' } });
 *
 * // 초기 데이터와 제목 설정
 * const doc = mdi.open('/products/detail', {
 *   initialData: { productId: 123, mode: 'edit' },
 *   title: '상품 상세 편집'
 * });
 *
 * // 자식 문서에서 데이터 수신
 * // const options = mdi.getOpenOptions<{ productId: number; mode: string }>();
 * // const initialData = options?.initialData; // { productId: 123, mode: 'edit' }
 */
export function open<T = unknown>(url: string, options?: MDIOpenOptions<T>): MDIDocument {
  const id = generateDocumentId();

  log.debug('Opening MDI document (new tab)', { id, url, options });

  // options 전체를 sessionStorage에 저장
  if (options !== undefined) {
    storeInitialData(id, options);
  }

  // URL에 document ID 추가 (child가 초기 데이터를 찾기 위해)
  const urlWithId = appendDocumentIdToUrl(url, id);

  // window.open 호출 - 무조건 _blank로 새 탭
  const tabRef = window.open(urlWithId, '_blank');

  if (!tabRef) {
    log.error('Failed to open document (popup blocked?)');
    throw new Error('팝업이 차단되었습니다. 팝업을 허용해주세요.');
  }

  // 문서 닫힘 감지 인터벌 생성
  const closeCheckInterval = setInterval(() => {
    if (tabRef.closed) {
      clearInterval(closeCheckInterval);
      log.debug('Document closed by user', { id });
      documentRegistry.delete(id);
    }
  }, 1000);

  // 문서 레지스트리에 등록 (인터벌 참조 포함)
  const document: MDIDocument = {
    id,
    tabRef,
    url,
    openedAt: Date.now(),
    name: options?.title,
    _closeCheckInterval: closeCheckInterval,
  };

  documentRegistry.set(id, document);

  log.info('MDI document opened', { id, url, options });

  return document;
}

/**
 * URL에 document ID를 추가합니다 (내부용).
 *
 * @param url - 기본 URL
 * @param documentId - 추가할 문서 ID
 * @returns document ID가 추가된 URL
 */
function appendDocumentIdToUrl(url: string, documentId: string): string {
  try {
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.set('mdiDocId', documentId);
    return urlObj.toString();
  } catch (error) {
    // Relative URL인 경우 fallback 처리
    log.debug('URL parsing failed, treating as relative URL', { url, error });
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}mdiDocId=${documentId}`;
  }
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

  cleanupClosedDocument(id, docInfo);
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

  documentRegistry.forEach((docInfo, id) => {
    if (docInfo.tabRef && !docInfo.tabRef.closed) {
      docInfo.tabRef.close();
      closedCount += 1;
    }
    cleanupClosedDocument(id, docInfo);
  });

  log.info('All MDI documents closed', { count: closedCount });
}

/**
 * 특정 문서에 메시지 전송
 *
 * @param mdiDocument - 대상 MDIDocument 객체 또는 ID
 * @param message - 전송할 메시지
 * @param targetOrigin - 대상 origin (기본: 현재 origin, 보안을 위해 '*' 사용 지양)
 *
 * @example
 * mdi.postMessage(docRef, {
 *   type: 'UPDATE_DATA',
 *   payload: { id: 123, name: 'Product' }
 * }, window.location.origin);
 */
export function postMessage<T = unknown>(
  mdiDocument: MDIDocument | string,
  message: MDIMessage<T>,
  targetOrigin = currentOrigin
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
    targetOrigin,
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
    messageHandlers.set(messageType, new Set<MDIMessageHandler>());
  }

  const handlers = messageHandlers.get(messageType);
  if (handlers) {
    handlers.add(handler as MDIMessageHandler);
  }

  log.debug('Message handler registered', { messageType });

  // 정리 함수 반환
  return () => {
    const cleanupHandlers = messageHandlers.get(messageType);
    if (cleanupHandlers) {
      cleanupHandlers.delete(handler as MDIMessageHandler);
      log.debug('Message handler unregistered', { messageType });
    }
  };
}

/**
 * postMessage 이벤트를 처리합니다 (내부용).
 *
 * window.message 이벤트 리스너에서 호출되며,
 * origin 검증 및 메시지 형식 검증을 수행합니다.
 *
 * @param event - 수신한 메시지 이벤트
 */
function handleMessage(event: MessageEvent): void {
  // 보안: origin 검증
  if (!isOriginAllowed(event.origin)) {
    log.warn('Message rejected: origin not allowed', { origin: event.origin });
    return;
  }

  const message = event.data;

  // 메시지 형식 검증 (type guard)
  if (!isValidMDIMessage(message)) {
    return;
  }

  const { type } = message;

  // PING/PONG 자동 응답
  if (type === 'PING') {
    // event.source가 Window 객체인지 검증
    if (isWindowSource(event.source)) {
      event.source.postMessage({ type: 'PONG', senderId: message.senderId }, event.origin);
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

    log.debug('Message handled', { type, handlerCount: handlers.size, origin: event.origin });
  }
}

/**
 * MDI 메시지 형식 유효성을 검증하는 타입 가드입니다.
 *
 * @param data - 검증할 데이터
 * @returns MDIMessage 형식인지 여부
 */
function isValidMDIMessage(data: unknown): data is MDIMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    typeof (data as MDIMessage).type === 'string'
  );
}

/**
 * event.source가 Window 객체인지 확인하는 타입 가드입니다.
 *
 * @param source - 검증할 event.source
 * @returns Window 객체인지 여부
 */
function isWindowSource(source: unknown): source is Window {
  return (
    source !== null &&
    source !== window &&
    typeof source === 'object' &&
    'postMessage' in source &&
    typeof (source as Window).postMessage === 'function'
  );
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
  // 닫힌 문서 제거 및 정리
  const closedDocuments: string[] = [];

  documentRegistry.forEach((docInfo, id) => {
    if (docInfo.tabRef?.closed) {
      closedDocuments.push(id);
    }
  });

  closedDocuments.forEach((id) => {
    const docInfo = documentRegistry.get(id);
    if (docInfo) {
      cleanupClosedDocument(id, docInfo);
    }
  });

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
  addAllowedOrigin,
  removeAllowedOrigin,
  getOpenOptions,
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default mdi;
