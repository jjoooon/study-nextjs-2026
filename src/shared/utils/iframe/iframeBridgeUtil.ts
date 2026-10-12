/**
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import log from '@/shared/utils/logger';
import { ExternalEventMessage } from '../../types/externalEventTypes';
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
  eventMessage,
  channelPort,
  targetRef = null,
}: {
  targetRef?: HTMLIFrameElement | null;
  eventMessage: ExternalEventMessage;
  channelPort?: MessagePort;
}) => {
  // 현재 창이 iframe내부인지 확인
  if (window !== undefined && window.parent === window) {
    return;
  }

  logger.debug('자식 전송데이터: ', eventMessage);

  // 메시지 전송
  if (targetRef) {
    if (channelPort) {
      targetRef.contentWindow?.postMessage(eventMessage, gParentIframeUrlHost, [channelPort]);
    } else {
      targetRef.contentWindow?.postMessage(eventMessage, gParentIframeUrlHost);
    }
  } else {
    if (channelPort) {
      window.parent.postMessage(eventMessage, gParentIframeUrlHost, [channelPort]);
    } else {
      window.parent.postMessage(eventMessage, gParentIframeUrlHost);
    }
  }
};
