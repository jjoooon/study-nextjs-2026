import log from '@/shared/utils/logger';
import { EventMessage } from '../../types/externalTypes';

const logger = log.getLogger('IFrameMessage');

export const chatbotMessageProcessor = (e: EventMessage) => {
  logger.debug('chatbotMessageProcessor received :', e);
  // if (e.eventName === 'GET_UI_INFO') {
  // }
};
