/**
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { EventMessage } from '../types/externalTypes';
import { sendMessage } from './iframe/iframeBridgeUtil';

export interface ChatbotOpenOptions {
  /** 창을 열거나 복원할 때 적용할 최소화 상태 (기본값: false - 최소화 해제) */
  minimized?: boolean;
}

export interface ChatbotController {
  open: (options?: ChatbotOpenOptions) => void;
  close: () => void;
  setMinimized: (minimized: boolean) => void;
}

const controllers = new Set<ChatbotController>();

function getActiveController(): ChatbotController | null {
  let active: ChatbotController | null = null;
  controllers.forEach((controller) => {
    active = controller;
  });
  return active;
}

export const chatbotUtils = {
  iframeRef: null as HTMLIFrameElement | null,

  setRef(ref: HTMLIFrameElement | null) {
    this.iframeRef = ref;
  },
  sendMessage(message: EventMessage) {
    if (this.iframeRef) {
      sendMessage({
        targetRef: this.iframeRef,
        message: message as EventMessage,
      });
    }
  },
  /**
   * 전역 AI 설계비서(Ltpa120) 컨트롤러를 등록하고 해제(cleanup) 함수를 반환합니다.
   */
  registerController(controller: ChatbotController): () => void {
    controllers.add(controller);
    return () => {
      controllers.delete(controller);
    };
  },
  /** 등록된 전역 AI 설계비서 컨트롤러 존재 여부 */
  hasController(): boolean {
    return controllers.size > 0;
  },
  /**
   * AI 설계비서 창을 열거나, 이미 열려 최소화되어 있는 경우 최소화를 해제(복원)합니다.
   * @returns 전역 컨트롤러가 존재하여 처리되었으면 true, 아니면 false
   */
  open(options?: ChatbotOpenOptions): boolean {
    const controller = getActiveController();
    if (!controller) return false;
    controller.open(options);
    return true;
  },
  /** AI 설계비서 창 닫기 */
  close(): boolean {
    const controller = getActiveController();
    if (!controller) return false;
    controller.close();
    return true;
  },
  /** AI 설계비서 창의 최소화 상태를 직접 변경합니다. */
  setMinimized(minimized: boolean): boolean {
    const controller = getActiveController();
    if (!controller) return false;
    controller.setMinimized(minimized);
    return true;
  },
  /** 최소화되어 있는 AI 설계비서 창을 복원(열기 + 최소화 해제)합니다. */
  restore(): boolean {
    return this.open({ minimized: false });
  },
};
