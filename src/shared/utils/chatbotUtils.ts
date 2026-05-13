/**
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { EventMessage } from '../types/externalTypes';
import { sendMessage } from './iframe/iframeBridgeUtil';

export const chatbotUtils = {
  iframeRef: null as HTMLIFrameElement | null,

  setRef(ref: HTMLIFrameElement | null) {
    this.iframeRef = ref;
  },
  sendMessage(message: EventMessage) {
    if (this.iframeRef) {
      sendMessage({
        targetRef: this.iframeRef, message: message as EventMessage
      });
    }
  },
}