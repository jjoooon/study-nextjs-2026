/**
 * Simple Logging Wrapper using loglevel
 *
 * @purpose
 * - Simple console.log wrapper
 * - Auto-disable in production
 * - Environment-aware log levels
 *
 * @usage
 * import log from '@/utils/logger';
 * const authLogger = log.getLogger('Auth');
 * authLogger.info('Login successful', { userId: '123' });
 */

import log from 'loglevel';

// Set log level based on environment
const isDev = process.env.NODE_ENV === 'development';
log.setDefaultLevel(isDev ? 'debug' : 'error');

export default log;
