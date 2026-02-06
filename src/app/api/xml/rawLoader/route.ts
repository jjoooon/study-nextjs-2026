import { readFile } from 'fs/promises';
import { join } from 'path';
import { DOMParser } from '@xmldom/xmldom';
import { NextRequest, NextResponse } from 'next/server';
import log from '@/shared/utils/logger';

const logger = log.getLogger('Xml');

export async function GET(request: NextRequest) {
  const loadStart = performance.now();

  try {
    // 쿼리 파라미터에서 파일 이름 가져오기
    const { searchParams } = new URL(request.url);
    const fileParam = searchParams.get('file') || 'LA02866001__0_20260129.xml';

    // XML 파일 경로 설정
    const xmlFilePath = join(process.cwd(), 'public', 'mocks', 'data', fileParam);

    // 파일 로드
    const fileReadStart = performance.now();
    const xmlText = await readFile(xmlFilePath, 'utf-8');
    const fileReadEnd = performance.now();

    // DOM 파싱 (서버에서 처리)
    const parseStart = performance.now();
    const parser = new DOMParser({
      errorHandler: {
        warning: () => {},
        error: () => {},
        fatalError: (msg) => {
          throw new Error(msg);
        },
      },
    });
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const parseEnd = performance.now();

    const totalEnd = performance.now();

    // DOM을 XML 문자열로 직렬화하여 전송
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const serializer = new (require('@xmldom/xmldom').XMLSerializer)();
    const serializedXml = serializer.serializeToString(xmlDoc);

    // 성능 메트릭스 계산
    const metrics = {
      loadTime: fileReadEnd - fileReadStart,
      parseTime: parseEnd - parseStart,
      totalTime: totalEnd - loadStart,
    };

    return NextResponse.json(
      {
        xmlData: serializedXml,
        ...metrics,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    logger.error('Server-side XML processing error:', error);
    return NextResponse.json(
      {
        xmlData: null,
        loadTime: 0,
        parseTime: 0,
        totalTime: 0,
        error: error instanceof Error ? error.message : 'XML 처리 중 오류 발생',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  }
}
