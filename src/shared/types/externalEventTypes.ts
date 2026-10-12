import {
  ChangeTitleType,
  CloseWindowType,
  MouseEventType,
  NewWindowType,
  OpenWindowType,
  OriginType,
  ParentMsgType,
  PopupOriginType,
  ResizePopupType,
} from '../constants/external';

/**
 * 타시스템 연계 메세지
 */
export type ExternalEventMessage =
  /**
   * NCRM -> React
   * 1. React MDI or Popup open
   * 2. MDI 활성화 이벤트 : TODO: React는 무엇을 해야 하는지?
   * 3. React 거래목록 조회 팝업 호출
   */
  // 1. NCRM MDI or Popup open
  | {
      type: 'ifr_sdi';
      eventName: 'openwindow';
      url?: string;
      page?: string;
      auth?: string; // 버튼권한정보
      popup?: boolean; // NCRM팝업 내 REACT화면 오픈 여부
      flip?: boolean; // 접힘 여부
      data?: Record<string, unknown>;
    }
  // 2. MDI 활성화 이벤트
  | {
      type: 'ifr_sdi';
      eventName: 'activeWindow';
    }
  // 3. React 거래목록 조회 팝업 호출
  | {
      type: 'ifr_sdi';
      eventName: 'showBizList';
    }
  /**
   * React -> NCRM
   * 1. 타이틀 변경
   * 2. 마우스다운 이벤트 전달
   * 3. 팝업 사이즈 전달
   * 4. NCRM 팝업 부모창 연계 데이터 전달 TODO: 언제 호출하는 것인지 확인 필요
   * 5. NCRM/React 화면 오픈, 포탈화면설정 오픈
   * 6. NCRM 화면 닫기
   * 7. 새창 띄우기
   */
  // 1. 타이틀 변경
  | {
      type: ChangeTitleType;
      eventName: 'changeTitle';
      title: string;
    }
  // 2. 마우스다운 이벤트 전달
  | {
      type: MouseEventType;
      eventName: 'clickWindow';
    }
  // 3. 팝업 사이즈 전달
  | {
      type: ResizePopupType;
      eventName: 'resizeWindow';
      message: {
        width: number;
        height: number;
      };
    }
  // 4. NCRM 팝업 부모창 연계 데이터 전달
  | {
      type: ParentMsgType;
      eventName: 'parentMsg';
      message: {
        data: Record<string, unknown>;
      };
    }
  // 5. NCRM/React 화면/팝업 오픈, Portal 화면설정 오픈
  | {
      type: OpenWindowType;
      eventName: 'openWindow';
      url?: string;
      param?: Record<string, unknown>;
      message?: {
        external?: boolean;
        popup?: boolean;
        modalinfo?: string;
        flip?: boolean; // 접힘 여부
        title?: string; // 팝업타이틀 직접 지정
        tran?: string;
        features?: Record<string, unknown>;
        data?: Record<string, unknown>;
        type?: string;
        param?: string;
      };
    }
  // 6. NCRM 화면 닫기
  | { type: CloseWindowType; eventName: 'closeWindow' }
  | {
      type: PopupOriginType;
      eventName: 'getPopupOrigin';
      scrId: string;
      origin?: OriginType; // HSP(스마트포탈), SFA(영업포탈), LTP(신가입설계)
    }
  // 7. 새창 띄우기
  | { type: NewWindowType; eventName: 'newWindow' }
  | {
      type: 'PORTAL';
      eventName: 'openNSPForm';
      message: {
        type: string;
        param: Record<string, unknown>;
      };
    }
  // 8. flip 화면 접기
  | { type: 'LTP'; eventName: 'flipWindow' }
  | {
      type: 'CORE' | 'LTP';
      eventName: 'callFunction' | 'responseFunction';
      targetId: string;
      windowType?: string;
      screenID?: string;
      functionName?: string;
      functionParam?: any[];
      callbackParam?: any;
    }
  /**
   * React -> AI
   */
  // UI Control Patch Start: AI/UI controller 연동 이벤트 계약 보강
  | {
      eventName: 'SEND_UI_INFO';
      requestId?: string;
      conversationId?: string;
      screenId?: string;
      data: Record<string, unknown>;
    }
  | { eventName: 'SEND_UI_INFO_ID'; [key: string]: unknown }
  | {
      eventName: 'UI_CONTROL_RESULT';
      requestId?: string;
      screenId?: string;
      results: Array<{
        index: number;
        type: string;
        status: 'success' | 'error';
        error?: {
          code: string;
          message: string;
        };
      }>;
    }
  /**
   * AI -> React
   */
  | {
      eventName: 'GET_UI_INFO';
      requestId: string;
      conversationId: string;
      screenId: string;
      /** [UI Control Patch] plan-snapshot 저장 시 SEND_UI_INFO_ID.aiQuery 로 그대로 회신할 발화 (선택) */
      aiQuery?: string;
    }
  // [UI Control Patch] 채팅 시작 시 경량 uiInfoId 요청 - plan-snapshot 저장 후 GET_UI_INFO_ID(light) 회신
  | {
      eventName: 'GET_UI_INFO_ID';
      requestId?: string;
      screenId?: string;
      /** [2026-10-06] 채팅이 요청한 발화 (선택) - AI 질문하기 저장값(reqAiQuery 미존재 시) 으로 회신 payload.aiQuery 에 채운다 */
      aiQuery?: string;
    }
  | {
      eventName: 'EXECUTE_COMMANDS';
      commands: Array<Record<string, unknown>>;
      requestId?: string;
      screenId?: string;
    };
// UI Control Patch End: 머지 시 AI/UI controller 계약 패치 구간 식별용
