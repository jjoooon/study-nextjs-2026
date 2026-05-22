/**
import { type } from '../../redux/index';
 * 타시스템 연계 메세지
 */
export type EventMessage =
  // NCRM -> React NCRM MDI/팝업 생성
  | {
      type: 'ifr_sfi'; //(typeof EXT_TYPE)['IFR_SDI']
      eventName: 'openWindow';
      url: string;
      page: string;
      auth: string;
      popup: boolean;
      data: Record<string, unknown>;
    }
  // NCRM -> React 활성화 이벤트
  | {
      type: 'ifr_sdi';
      eventName: 'activeWindow';
    }
  // NCRM -> REACT 거래목록조회
  | {
      type: 'ifr_sdi';
      eventName: 'showBizList';
    }
  // REACT -> NCRM NCRM 타이틀변경
  | {
      type: 'REACT' | 'CORE';
      eventName: 'changeTitle';
    }
  // 업ㅁ화면내 마우스다운 이벤트 전송
  | {
      type: 'REACT';
      eventName: 'clickWindow';
    }
  | {
      type: 'REACT';
      eventName: 'resizeWindow';
      message: {
        width: number;
        height: number;
      };
    }
  // NCRM팝업 -> 부모창에 연계데이터 전달
  | {
      type: 'REACT';
      eventName: 'parentMsg';
      message: {
        data: Record<string, unknown>;
      };
    }
  // REACT 화면오픈
  | {
      type: 'CORE';
      eventName: 'openWindow';
      url: string;
      popup: boolean;
      message: {
        data: Record<string, unknown>;
      };
    }
  // NCRM 화면닫기
  | {
      type: 'REACT';
      eventName: 'closeWindow';
    }
  // 하단메세지바 : 화면설명
  | {
      type: 'PORTAL';
      eventName: 'openWindow';
      message: {
        type: string;
        param: string;
      };
    }
  // 하단메세지바 : 새창 띄우기
  | {
      type: 'REACT';
      eventName: 'newWindow';
    }
  // 포탈 인터페이스 : portal.openWindow
  | {
      type: 'PORTAL';
      eventName: 'openWindow';
      message: {
        type: string;
        param: string;
      };
    }
  // 팝업화면ID기반 publish origin 조회
  | {
      type: 'CORE';
      eventName: 'getPopupOrigin';
      scrId: string;
      origin?: 'HSP' | 'SFA' | 'LTP';
    }
  /**
   * AI 전송 이벤트 목록
   * LTP -> AI
   */
  | {
      eventName: 'SEND_UI_INFO_ID';
      [key: string]: unknown;
    }
  /**
   * AI 수신 이벤트 목록
   * AI -> LTP
   */
  | {
      eventName: 'GET_UI_INFO';
      requestId: string;
      conversationId: string;
      screenId: string;
    };
