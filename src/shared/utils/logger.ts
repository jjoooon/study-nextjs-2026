/**
 * Simple Logging Wrapper using loglevel
 *
 * @purpose
 * - Simple console.log wrapper
 * - Auto-disable in production
 * - Environment-aware log levels
 * - All logger instances respect global log level
 *
 * @usage
 * import log from '@/utils/logger';
 * const authLogger = log.getLogger('Auth');
 * authLogger.info('Login successful', { userId: '123' });
 */

import log from 'loglevel';
import { publicConfig } from '../config/env';

/**
 * Configure global log level and ensure all instances respect it
 *
 * @description
 * - Sets global default log level from environment
 * - Disables global method to prevent instance-level overrides
 * - All getLogger instances will respect this global level
 */
const globalLogLevel = publicConfig.devtools.logLevel;

// Set global log level
log.setDefaultLevel(globalLogLevel);

/**
 * Factory method that creates loggers with proper level inheritance
 *
 * @description
 * - Custom getLogger wrapper that ensures all instances respect global log level
 * - Prevents individual instances from having their own level settings
 * - Maintains loglevel's original API while enforcing consistent behavior
 */
const originalGetLogger = log.getLogger;

log.getLogger = (name: string) => {
  const logger = originalGetLogger(name);
  // Ensure this instance respects global log level
  logger.setLevel(globalLogLevel);
  return logger;
};

export default log;
