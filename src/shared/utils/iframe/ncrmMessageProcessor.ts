/**
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { EventMessage } from '../../types/externalTypes';
import log from '@/shared/utils/logger';

const logger = log.getLogger('IFrameMessage');

export const ncrmMessageProcessor = (event: EventMessage) => {
  if (event.eventName === 'resizeWindow' && event.type === 'REACT') {
    logger.debug('resize Window', event);
  }
};
