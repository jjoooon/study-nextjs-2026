/**
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import log from '@/shared/utils/logger';
import { EventMessage } from '@/shared/types/externalTypes';
import { gParentIframeUrlHost } from '../authUtils';

const logger = log.getLogger('IFrameMessage');

/**
 * 부모 또는 특정 iframe에 메세지 전송
 * 
 * 예)
 * import { sendMessage } from '@/shared/utils/iframe/iframeBridgeUtils';
 * 
 * sendMessage({
 *   type: 'REACT',
 *   eventName: 'changeTitle',
 *   title: '가입설계(1010100)',
 * };  
 * sendMessage({
 *   targetRef: aiFrameRef,
 *   type: 'REACT',
 *   eventName: 'changeTitle',
 *   title: '가입설계(1010100)',
 * });  
 */
export const sendMessage = ({
  message,
  channelPort,
  targetRef = null,
}: {
  targetRef?: HTMLIFrameElement | null;
  message: EventMessage;
  channelPort?: MessagePort;
}) => {
  // 현재 창이 iframe 내부인지 확인
  if (window.parent === window) {
    return;
  }
  if (targetRef) {
    if (channelPort) {
      targetRef.contentWindow?.postMessage(message, gParentIframeUrlHost, [channelPort]);
    } else {
      targetRef.contentWindow?.postMessage(message, gParentIframeUrlHost);
    }
  } else {
    logger.debug('자식 전송데이터: ', message);
    if (channelPort) {
      window.parent.postMessage(message, gParentIframeUrlHost, [channelPort]);
    } else {
      window.parent.postMessage(message, gParentIframeUrlHost);
    }
  }
};

