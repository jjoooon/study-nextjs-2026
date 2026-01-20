import fs from 'fs';
import path from 'path';

import log from '@/shared/utils/logger';

const logger = log.getLogger('GetPageFiles');

/**
 * 호출 파일 기준으로 ../pages 디렉토리에서 .tsx 파일들의 이름을 배열로 반환합니다.
 *
 * @description
 * - 현재 파일을 기준으로 무조건 ../pages 경로를 탐색합니다.
 * - Next.js App Router 환경에서 동적 페이지 파일 발견에 최적화되어 있습니다.
 *
 * @param callerPath - 호출 파일의 절대 경로 (예: path.dirname(__filename) 또는 fileURLToPath(import.meta.url))
 * @returns .tsx 확장자가 제거된 파일명 배열
 *
 * @example
 * ```ts
 * // app/sample/products/[pageId]/page.tsx에서
 * const pages = getPageFiles(path.dirname(__filename)); // CommonJS
 * const pages = getPageFiles(fileURLToPath(import.meta.url)); // ESM
 * // => ['Detail', 'Edit', 'List', 'New']
 * ```
 */
export function getPageFiles(callerPath: string): string[] {
  // 호출 파일이 있는 디렉토리
  const callerDir = path.dirname(callerPath);

  // 호출 파일 기준 ../pages 경로 계산
  const pagesDir = path.resolve(callerDir, '../pages');
  logger.info('pagesDir', pagesDir);

  try {
    // 디렉토리 내 모든 파일 읽기
    const files = fs.readdirSync(pagesDir);

    // .tsx 파일만 필터링하고 확장자 제거
    return files
      .filter((file) => file.endsWith('.tsx'))
      .map((file) => file.replace('.tsx', ''))
      .sort();
  } catch (error) {
    logger.error(`[getPageFiles] Failed to read directory: ${pagesDir}`, error);
    return [];
  }
}
