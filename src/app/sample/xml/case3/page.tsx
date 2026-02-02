'use client';

import { useState, useEffect } from 'react';
import * as xpath from 'xpath';
import log from '@/shared/utils/logger';

interface QueryResult {
  results?: Array<
    | { type: 'attribute'; value: string | null }
    | { type: 'element'; tag: string; content: string }
    | { type: 'number'; content: string | null }
    | { type: 'string'; value: string | null }
    | { type: 'boolean'; value: boolean }
    | { type: string | number; value?: string | number | boolean | null; tag?: string; content?: string | null }
  >;
  nodeCount: number;
  xpath?: string;
  queryTime?: number;
  message?: string;
  error?: string;
}

export default function XmlConverterPage() {
  const logger = log.getLogger('XML-Raw');

  const [xmlDoc, setXmlDoc] = useState<Document | null>(null);
  const [xmlString, setXmlString] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [xpathInput, setXpathInput] = useState<string>("/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20011']/OBJECT/CVRGE");
  const [metrics, setMetrics] = useState<{
    loadTime: number;
    parseTime: number;
    totalTime: number;
  } | null>(null);
  const [selectedFileSize, setSelectedFileSize] = useState<string>('2KB');

  useEffect(() => {
    async function loadXml() {
      try {
        setLoading(true);
        setError(null);

        const totalStart = performance.now();

        // 선택한 파일 크기에 따라 다른 XML 파일 로드
        const fileName =
          selectedFileSize === '2KB' ? 'LA02866001__0_20260129.xml' : `LA02866001__0_20260129_${selectedFileSize}.xml`;

        // 서버 사이드 API 호출 (XML 로드와 DOM 파싱을 서버에서 처리)
        const response = await fetch(`/api/xml/raw-loader?file=${fileName}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const totalEnd = performance.now(); // 클라이언트에서 사용 가능한 시점

        if (result.error) {
          throw new Error(result.error);
        }

        // 서버에서 파싱된 XML 문자열을 클라이언트 DOM으로 변환
        const parseStart = performance.now();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(result.xmlData, 'text/xml');
        const parseEnd = performance.now();

        setXmlDoc(xmlDoc);
        setXmlString(result.xmlData);

        const endToEndTime = totalEnd - totalStart;

        setMetrics({
          loadTime: result.loadTime, // 서버 파일 I/O (참고용)
          parseTime: result.parseTime, // 서버 파싱 (참고용)
          totalTime: endToEndTime, // ⭐ End-to-End: 요청부터 사용 가능까지 (비교 기준)
        });

        logger.info('서버 사이드 Raw XML 로딩 완료', {
          fileSize: selectedFileSize,
          serverLoadTime: result.loadTime,
          serverParseTime: result.parseTime,
          serverProcessingTime: result.totalTime,
          clientParseTime: parseEnd - parseStart,
          endToEndTime,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'XML 로드 중 오류가 발생했습니다.');
        console.error('서버 사이드 Raw XML 로드 오류:', err);
      } finally {
        setLoading(false);
      }
    }

    loadXml();
  }, [selectedFileSize, logger]);

  // XPath로 XML 쿼리
  const handleQuery = () => {
    if (!xmlDoc) return;

    const xpathQuery = xpathInput.trim();

    if (!xpathQuery) {
      setQueryResult({
        error: 'XPath 쿼리를 입력해주세요.',
        nodeCount: 0,
      });
      return;
    }

    try {
      const queryStart = performance.now();

      // XPath로 노드 선택
      const result = xpath.select(xpathQuery, xmlDoc);

      const queryEnd = performance.now();

      logger.debug('XPath query result', {
        xpath: xpathQuery,
        result,
        queryTime: queryEnd - queryStart,
      });

      // 결과가 숫자인 경우 (count() 함수 등)
      if (typeof result === 'number') {
        setQueryResult({
          xpath: xpathQuery,
          results: [
            {
              type: 'number',
              value: result,
            },
          ],
          nodeCount: 1,
          queryTime: queryEnd - queryStart,
        });
      }
      // 결과가 문자열인 경우 (속성값, text() 등)
      else if (typeof result === 'string') {
        setQueryResult({
          xpath: xpathQuery,
          results: [
            {
              type: 'string',
              value: result,
            },
          ],
          nodeCount: 1,
          queryTime: queryEnd - queryStart,
        });
      }
      // 결과가 불리언인 경우
      else if (typeof result === 'boolean') {
        setQueryResult({
          xpath: xpathQuery,
          results: [
            {
              type: 'boolean',
              value: result,
            },
          ],
          nodeCount: 1,
          queryTime: queryEnd - queryStart,
        });
      }
      // 결과가 노드 배열인 경우
      else if (Array.isArray(result)) {
        const nodes = result as Node[];

        if (nodes.length === 0) {
          setQueryResult({
            xpath: xpathQuery,
            message: '조건에 맞는 데이터를 찾을 수 없습니다.',
            nodeCount: 0,
            queryTime: queryEnd - queryStart,
          });
        } else {
          // 노드를 문자열로 변환
          const serializer = new XMLSerializer();
          const results = nodes.map((node) => {
            if (node.nodeType === Node.ATTRIBUTE_NODE) {
              return {
                type: 'attribute',
                value: node.nodeValue,
              };
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              return {
                type: 'element',
                tag: (node as Element).tagName,
                content: serializer.serializeToString(node),
              };
            } else {
              return {
                type: node.nodeType,
                content: node.textContent,
              };
            }
          });

          setQueryResult({
            xpath: xpathQuery,
            results,
            nodeCount: nodes.length,
            queryTime: queryEnd - queryStart,
          });
        }
      }
      // 결과가 null인 경우
      else if (result === null || result === undefined) {
        setQueryResult({
          xpath: xpathQuery,
          message: '조건에 맞는 데이터를 찾을 수 없습니다.',
          nodeCount: 0,
          queryTime: queryEnd - queryStart,
        });
      }
      // 그 외 단일 노드인 경우
      else {
        const node = result as Node;
        const serializer = new XMLSerializer();

        let nodeResult;
        if (node.nodeType === Node.ATTRIBUTE_NODE) {
          nodeResult = {
            type: 'attribute',
            value: node.nodeValue,
          };
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          nodeResult = {
            type: 'element',
            tag: (node as Element).tagName,
            content: serializer.serializeToString(node),
          };
        } else {
          nodeResult = {
            type: node.nodeType,
            content: node.textContent,
          };
        }

        setQueryResult({
          xpath: xpathQuery,
          results: [nodeResult],
          nodeCount: 1,
          queryTime: queryEnd - queryStart,
        });
      }
    } catch (err) {
      setQueryResult({
        xpath: xpathQuery,
        error: err instanceof Error ? err.message : '쿼리 실행 중 오류 발생',
        nodeCount: 0,
      });
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">XML → XPath 쿼리 예제 (Server-Side Raw XML)</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">서버에서 XML을 로드하고 파싱 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">XML → XPath 쿼리 예제 (Server-Side Raw XML)</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-semibold">오류 발생:</p>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">XML → XPath 쿼리 예제 (Server-Side Raw XML)</h1>
        <p className="text-gray-600 mb-8">
          서버에서 XML 로드와 DOM 파싱을 처리하고, 클라이언트는 XPath 쿼리만 실행합니다
        </p>

        {/* 테스트 파일 크기 선택 */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg shadow-sm mb-6">
          <div className="bg-purple-100 px-6 py-4 border-b border-purple-200">
            <h2 className="text-xl font-semibold text-purple-800">📁 테스트 파일 크기 선택</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {['2KB', '1MB', '3MB', '5MB'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedFileSize(size)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedFileSize === size
                      ? 'bg-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white text-purple-700 border-2 border-purple-300 hover:bg-purple-100 hover:border-purple-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="text-sm text-purple-700 mt-3">
              현재 선택: <span className="font-semibold">{selectedFileSize}</span> 파일 테스트
            </p>
          </div>
        </div>

        {/* 성능 메트릭스 */}
        {metrics && (
          <div className="bg-green-50 border border-green-200 rounded-lg shadow-sm mb-6">
            <div className="bg-green-100 px-6 py-4 border-b border-green-200">
              <h2 className="text-xl font-semibold text-green-800">
                ⚡ 서버 사이드 Raw XML 성능 메트릭스 (End-to-End)
              </h2>
            </div>
            <div className="p-6">
              {/* 메인 비교 지표 */}
              <div className="mb-4 pb-4 border-b border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-800">⏱️ 전체 End-to-End</span>
                    <p className="text-sm text-gray-600 mt-1">요청부터 사용 가능까지 (비교 기준)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-green-700">{metrics.totalTime.toFixed(2)}ms</p>
                  </div>
                </div>
              </div>

              {/* 세부 시간 분석 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <span className="text-xs font-medium text-gray-500 block mb-1">서버 파일 I/O</span>
                  <p className="text-lg font-semibold text-gray-600">{metrics.loadTime.toFixed(2)}ms</p>
                  <p className="text-xs text-gray-400 mt-1">서버 처리 (참고)</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <span className="text-xs font-medium text-gray-500 block mb-1">서버 DOM 파싱</span>
                  <p className="text-lg font-semibold text-gray-600">{metrics.parseTime.toFixed(2)}ms</p>
                  <p className="text-xs text-gray-400 mt-1">서버 처리 (참고)</p>
                </div>
              </div>

              {/* 추가 정보 */}
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-xs text-gray-600">
                  💡 서버에서 XML 로드와 DOM 파싱을 처리합니다. 클라이언트는 XPath 쿼리만 실행합니다. JSON 변환 없이
                  원본 XML 구조를 유지합니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 기본 정보 섹션 */}
        {xmlDoc && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">기본 정보</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">상품 코드:</span>
                  <p className="text-lg font-semibold text-gray-900">
                    {xpath.select1('/GD/@GOCD', xmlDoc)?.toString() || '-'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">신청 일자:</span>
                  <p className="text-lg font-semibold text-gray-900">
                    {xpath.select1('/GD/@P_APPL_DT', xmlDoc)?.toString() || '-'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">상품명:</span>
                  <p className="text-lg font-semibold text-gray-900">
                    {xpath.select1('/GD/@GD_KORNM', xmlDoc)?.toString() || '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 쿼리 인터페이스 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">XPath 쿼리</h2>
              <p className="text-sm text-gray-600 mt-1">🔥 Raw XML에서 직접 XPath로 쿼리 (JSON 변환 없음)</p>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label htmlFor="xpathInput" className="block text-sm font-medium text-gray-700 mb-2">
                XPath 쿼리
              </label>
              <input
                id="xpathInput"
                type="text"
                value={xpathInput}
                onChange={(e) => setXpathInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleQuery();
                  }
                }}
                placeholder="/GD/RISK_OBJCT_CVRGE/RISK"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />
              <div className="mt-2 flex items-end gap-2">
                <button
                  onClick={handleQuery}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  조회 실행
                </button>
              </div>

              {/* XPath 예제 버튼들 */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">빠른 예제:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setXpathInput('/GD/RISK_OBJCT_CVRGE/RISK/OBJECT')}
                    className="text-xs px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded-md border border-purple-300 transition-colors"
                  >
                    전체 OBJECT
                  </button>
                  <button
                    onClick={() => setXpathInput("/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20011']/OBJECT/CVRGE")}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors"
                  >
                    CVRGE 요소
                  </button>
                  <button
                    onClick={() => setXpathInput("/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20011']/OBJECT/CVRGE/@CVRCD")}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors"
                  >
                    @CVRCD 속성
                  </button>
                  <button
                    onClick={() => setXpathInput("/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20011']/@RK_TPCD")}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors"
                  >
                    @RK_TPCD 속성
                  </button>
                  <button
                    onClick={() => setXpathInput('/GD/@GD_KORNM')}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors"
                  >
                    상품명 (@GD_KORNM)
                  </button>
                  <button
                    onClick={() =>
                      setXpathInput("/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20010' or @RK_TPCD='RLA20011']")
                    }
                    className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-md border border-blue-300 transition-colors"
                  >
                    OR (RK_TPCD)
                  </button>
                  <button
                    onClick={() => setXpathInput('count(//GD_RISK/RISK)')}
                    className="text-xs px-3 py-1 bg-green-100 hover:bg-green-200 rounded-md border border-green-300 transition-colors"
                  >
                    count() 함수
                  </button>
                </div>
              </div>
            </div>

            {/* 쿼리 예시 표시 */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">🔥 실행될 XPath 쿼리:</p>
              <code className="text-xs text-gray-800 block overflow-x-auto bg-white p-2 rounded">{xpathInput}</code>
            </div>

            {/* 쿼리 결과 */}
            {queryResult && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  조회 결과
                  {queryResult.queryTime && queryResult.queryTime > 0 && (
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      ({queryResult.queryTime.toFixed(2)}ms)
                    </span>
                  )}
                </h3>

                {queryResult.message && <p className="text-gray-600">{queryResult.message}</p>}

                {queryResult.error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-700">
                    <p className="font-medium">오류:</p>
                    <p className="text-sm">{queryResult.error}</p>
                  </div>
                )}

                {queryResult.results && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      결과 수: <span className="font-semibold">{queryResult.nodeCount}</span>
                    </p>
                    {queryResult.results.map((result, index: number) => (
                      <div key={index} className="border rounded-md p-3 bg-blue-50 border-blue-200">
                        {/* 속성값 */}
                        {result.type === 'attribute' && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">속성값:</p>
                            <code className="text-sm font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                              {String(result.value)}
                            </code>
                          </div>
                        )}
                        {/* 요소 */}
                        {result.type === 'element' && 'tag' in result && 'content' in result && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">요소 (&lt;{result.tag}&gt;):</p>
                            <pre className="text-xs bg-white p-2 rounded overflow-x-auto">{result.content}</pre>
                          </div>
                        )}
                        {/* 숫자 (count() 등) */}
                        {result.type === 'number' && 'content' in result && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">숫자 결과:</p>
                            <code className="text-sm font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                              {result.content}
                            </code>
                          </div>
                        )}
                        {/* 문자열 (text(), 속성값 등) */}
                        {result.type === 'string' && 'value' in result && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">문자열 결과:</p>
                            <code className="text-sm font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                              {result.value}
                            </code>
                          </div>
                        )}
                        {/* 불리언 */}
                        {result.type === 'boolean' && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">불리언 결과:</p>
                            <code className="text-sm font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                              {result.value ? 'true' : 'false'}
                            </code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 전체 XML 데이터 표시 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">전체 Raw XML 데이터</h2>
            <p className="text-sm text-gray-600 mt-1">원본 XML (JSON 변환 없음)</p>
          </div>
          <div className="p-6">
            <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">{xmlString}</pre>
          </div>
        </div>

        {/* 사용법 안내 */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">📖 Server-Side Raw XML 처리 특징</h3>
          <div className="space-y-2 text-sm text-green-800">
            <p>
              <strong>1. 서버 사이드 처리:</strong> XML 로드와 DOM 파싱이 서버에서 실행되어 클라이언트 부하 감소
            </p>
            <p>
              <strong>2. JSON 변환 없음:</strong> XML을 그대로 DOM 형태로 유지하여 메모리 효율성
            </p>
            <p>
              <strong>3. 네이티브 XPath:</strong> 브라우저 네이티브 DOMParser와 xpath 라이브러리 사용
            </p>
            <p>
              <strong>4. 빠른 쿼리:</strong> DOM 인덱싱을 활용한 빠른 XPath 쿼리 실행
            </p>
            <p>
              <strong>5. 표준 준수:</strong> W3C XPath 표준을 따르는 호환성 있는 쿼리
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
