'use client';

import { useState, useEffect } from 'react';
import log from '@/shared/utils/logger';
import { xpathQuery } from '@/shared/utils/xml/xpathQuery';

interface ConvertedData {
  GD: {
    GOCD: string;
    P_APPL_DT: string;
    GD_KORNM: string;
    RISK_OBJCT_CVRGE?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      RISK?: any | any[];
    };
  };
}

interface ServerDataResponse {
  data: ConvertedData | null;
  loadTime: number;
  parseTime: number;
  totalTime: number;
  error?: string;
}

export default function XmlConverterPage() {
  const logger = log.getLogger('XML-Server');

  const [jsonData, setJsonData] = useState<ConvertedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [queryResult, setQueryResult] = useState<any>(null);
  const [xpathInput, setXpathInput] = useState<string>("/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20011']/OBJECT/CVRGE");
  const [queryMode, setQueryMode] = useState<'xpath' | 'native'>('xpath');
  const [serverMetrics, setServerMetrics] = useState<{
    serverLoadTime: number;
    serverParseTime: number;
    serverProcessingTime: number;
    totalTime: number;
    networkOverhead: number;
  } | null>(null);
  const [selectedFileSize, setSelectedFileSize] = useState<string>('2KB');

  useEffect(() => {
    async function loadFromServer() {
      try {
        setLoading(true);
        setError(null);

        const totalStart = performance.now();

        // 선택한 파일 크기에 따라 다른 XML 파일 로드
        const fileName =
          selectedFileSize === '2KB' ? 'LA02866001__0_20260129.xml' : `LA02866001__0_20260129_${selectedFileSize}.xml`;

        // 서버 사이드 API 호출 (캐시 방지)
        const response = await fetch(`/api/xml/server-loader?file=${fileName}`, {
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ServerDataResponse = await response.json();
        const totalEnd = performance.now(); // 클라이언트에서 사용 가능한 시점

        if (result.error) {
          throw new Error(result.error);
        }

        setJsonData(result.data);
        const endToEndTime = totalEnd - totalStart;
        const networkOverhead = endToEndTime - result.totalTime;

        setServerMetrics({
          serverLoadTime: result.loadTime, // 서버 파일 I/O (참고용)
          serverParseTime: result.parseTime, // 서버 파싱 (참고용)
          serverProcessingTime: result.totalTime, // 서버 전체 처리 (참고용)
          totalTime: endToEndTime, // ⭐ End-to-End: 요청부터 사용 가능까지 (비교 기준)
          networkOverhead, // 네트워크 왕복 + JSON 직렬화/역직렬화
        });

        logger.info('서버 사이드 로딩 완료', {
          fileSize: selectedFileSize,
          serverProcessingTime: result.totalTime,
          networkOverhead,
          endToEndTime,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'XML 변환 중 오류가 발생했습니다.');
        console.error('서버 사이드 XML 변환 오류:', err);
      } finally {
        setLoading(false);
      }
    }

    loadFromServer();
  }, [selectedFileSize, logger]);

  // 특정 조건으로 데이터 조회 예시
  const handleQuery = () => {
    if (!jsonData) return;

    if (queryMode === 'xpath') {
      // 🔥 XPath 레거시 호환 방식 - 직접 입력한 XPath 사용
      const xpath = xpathInput.trim();

      if (!xpath) {
        setQueryResult({
          method: 'XPath (레거시)',
          error: 'XPath 쿼리를 입력해주세요.',
        });
        return;
      }

      try {
        const result = xpathQuery(jsonData, xpath);
        logger.debug('xpath result', result);

        // XPath 결과 처리
        if (result === null || result === undefined) {
          setQueryResult({
            method: 'XPath (레거시)',
            query: xpath,
            message: '조건에 맞는 데이터를 찾을 수 없습니다.',
          });
        } else if (typeof result === 'string' || typeof result === 'number' || typeof result === 'boolean') {
          // 원시값 (속성값 조회 등)
          setQueryResult({
            method: 'XPath (레거시)',
            query: xpath,
            data: [{ value: result, type: typeof result }],
            totalCount: 1,
          });
        } else if (Array.isArray(result)) {
          setQueryResult({
            method: 'XPath (레거시)',
            query: xpath,
            data: result,
            totalCount: result.length,
          });
        } else {
          // 단일 객체
          setQueryResult({
            method: 'XPath (레거시)',
            query: xpath,
            data: [result],
            totalCount: 1,
          });
        }
      } catch (error) {
        setQueryResult({
          method: 'XPath (레거시)',
          query: xpath,
          error: error instanceof Error ? error.message : '쿼리 실행 중 오류 발생',
        });
      }
    } else {
      setQueryResult({
        method: 'Native JSON',
        data: [jsonData], // 배열로 감싸서 일관성 유지
        totalCount: 1,
      });
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">XML → JSON 변환 예제 (Server-Side)</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">서버에서 XML을 JSON으로 변환 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">XML → JSON 변환 예제 (Server-Side)</h1>
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
        <h1 className="text-3xl font-bold mb-2">XML → JSON 변환 예제 (Server-Side)</h1>
        <p className="text-gray-600 mb-8">서버 사이드에서 XML 로드 및 JSON 파싱을 처리하여 성능을 비교하는 예제</p>

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
        {serverMetrics && (
          <div className="bg-green-50 border border-green-200 rounded-lg shadow-sm mb-6">
            <div className="bg-green-100 px-6 py-4 border-b border-green-200">
              <h2 className="text-xl font-semibold text-green-800">⚡ 서버 사이드 성능 메트릭스 (End-to-End)</h2>
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
                    <p className="text-4xl font-bold text-green-700">{serverMetrics.totalTime.toFixed(2)}ms</p>
                  </div>
                </div>
              </div>

              {/* 세부 시간 분석 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <span className="text-xs font-medium text-gray-500 block mb-1">서버 파일 I/O</span>
                  <p className="text-lg font-semibold text-gray-600">{serverMetrics.serverLoadTime.toFixed(2)}ms</p>
                  <p className="text-xs text-gray-400 mt-1">서버 처리 (참고)</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <span className="text-xs font-medium text-gray-500 block mb-1">서버 XML 파싱</span>
                  <p className="text-lg font-semibold text-gray-600">{serverMetrics.serverParseTime.toFixed(2)}ms</p>
                  <p className="text-xs text-gray-400 mt-1">서버 처리 (참고)</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <span className="text-xs font-medium text-gray-500 block mb-1">네트워크 오버헤드</span>
                  <p className="text-lg font-semibold text-gray-600">{serverMetrics.networkOverhead.toFixed(2)}ms</p>
                  <p className="text-xs text-gray-400 mt-1">왕복 + JSON 변환</p>
                </div>
              </div>

              {/* 추가 정보 */}
              <div className="mt-4 pt-4 border-t border-green-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">서버 전체 처리 시간 (참고):</span>
                  <span className="font-semibold text-gray-700">{serverMetrics.serverProcessingTime.toFixed(2)}ms</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * 서버 시간은 참고용입니다. Case1과의 공정한 비교를 위해 ⏱️ End-to-End 시간을 사용하세요.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 기본 정보 섹션 */}
        {jsonData && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">기본 정보</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">상품 코드:</span>
                  <p className="text-lg font-semibold text-gray-900">{jsonData.GD.GOCD}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">신청 일자:</span>
                  <p className="text-lg font-semibold text-gray-900">{jsonData.GD.P_APPL_DT}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">상품명:</span>
                  <p className="text-lg font-semibold text-gray-900">{jsonData.GD.GD_KORNM}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 쿼리 인터페이스 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">데이터 쿼리 방식 선택</h2>
              <p className="text-sm text-gray-600 mt-1">
                {queryMode === 'xpath' && '🔥 XPath: 레거시 호환, 기존 XPath 그대로 사용'}
                {queryMode === 'native' && '📦 Native JSON: TypeScript 네이티브 방식'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setQueryMode('xpath')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  queryMode === 'xpath'
                    ? 'bg-orange-100 text-orange-800 border-2 border-orange-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                }`}
              >
                🔥 XPath
              </button>
              <button
                onClick={() => setQueryMode('native')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  queryMode === 'native'
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                }`}
              >
                📦 Native
              </button>
            </div>
          </div>
          <div className="p-6">
            {queryMode === 'xpath' ? (
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
                      CVRGE 객체
                    </button>
                    <button
                      onClick={() =>
                        setXpathInput("/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20011']/OBJECT/CVRGE/@CVRCD")
                      }
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
                      onClick={() =>
                        setXpathInput("/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20011' and @RK_TPCD='RLA20011']")
                      }
                      className="text-xs px-3 py-1 bg-green-100 hover:bg-green-200 rounded-md border border-green-300 transition-colors"
                    >
                      AND (RK_TPCD)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <div className="flex items-end">
                  <button
                    onClick={handleQuery}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    전체 데이터 조회
                  </button>
                </div>
              </div>
            )}

            {/* 쿼리 예시 표시 */}
            {queryMode === 'xpath' && (
              <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">🔥 실행될 XPath 쿼리:</p>
                <code className="text-xs text-gray-800 block overflow-x-auto bg-white p-2 rounded">{xpathInput}</code>
              </div>
            )}
            {/* 쿼리 결과 */}
            {queryResult && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  조회 결과 ({queryResult?.method})
                  {queryResult?.queryTime > 0 && (
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      ({queryResult.queryTime.toFixed(2)}ms)
                    </span>
                  )}
                </h3>

                {queryResult?.message && <p className="text-gray-600">{queryResult.message}</p>}

                {queryResult?.error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-700">
                    <p className="font-medium">오류:</p>
                    <p className="text-sm">{queryResult.error}</p>
                  </div>
                )}

                {queryResult?.data && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      결과 수: <span className="font-semibold">{queryResult.totalCount}</span>
                    </p>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {queryResult.data.map((item: any, index: number) => (
                      <div
                        key={index}
                        className={`border rounded-md p-3 ${
                          queryMode === 'xpath' ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        {/* 원시값 (속성값 조회 결과) */}
                        {item.type && (item.type === 'string' || item.type === 'number' || item.type === 'boolean') ? (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">속성값 ({item.type}):</p>
                            <code className="text-sm font-semibold text-gray-800 bg-white px-2 py-1 rounded">
                              {String(item.value)}
                            </code>
                          </div>
                        ) : (
                          /* 객체 또는 배열 */
                          <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
                            {JSON.stringify(item, null, 2)}
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 전체 JSON 데이터 표시 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">전체 변환된 JSON 데이터</h2>
            <p className="text-sm text-gray-600 mt-1">원본 XML이 JSON 객체로 변환된 결과</p>
          </div>
          <div className="p-6">
            <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-sm">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        </div>

        {/* 사용법 안내 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📖 Server-Side 처리 특징</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              <strong>1. 서버 사이드 처리:</strong> XML 로드와 파싱이 서버에서 일어나 클라이언트 부하 감소
            </p>
            <p>
              <strong>2. 성능 향상:</strong> 대용량 XML 파일 처리 시 클라이언트보다 빠른 처리 속도
            </p>
            <p>
              <strong>3. 네트워크 전송:</strong> JSON 형태로만 전송되어 전송량 최적화
            </p>
            <p>
              <strong>4. 캐싱 가능:</strong> 변환된 JSON 데이터를 서버에서 캐싱 가능
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
