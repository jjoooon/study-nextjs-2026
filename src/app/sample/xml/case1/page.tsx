'use client';

import { useState, useEffect } from 'react';
import log from '@/shared/utils/logger';
import { convertXmlToJson } from '@/shared/utils/xml/xmlParser';
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

export default function XmlConverterPage() {
  const logger = log.getLogger('XML');

  const [jsonData, setJsonData] = useState<ConvertedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [queryResult, setQueryResult] = useState<any>(null);
  const [xpathInput, setXpathInput] = useState<string>("/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20011']/OBJECT/CVRGE");
  const [queryMode, setQueryMode] = useState<'xpath' | 'native'>('xpath');

  useEffect(() => {
    async function loadAndConvertXml() {
      try {
        setLoading(true);
        setError(null);

        // XML 파일을 fetch하여 로드
        const response = await fetch('/mocks/data/LA02866001__0_20260129.xml');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const xmlText = await response.text();

        // XML을 JSON으로 변환 (CVRGE 자동 배열화)
        const converted = await convertXmlToJson(xmlText);

        setJsonData(converted);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'XML 변환 중 오류가 발생했습니다.');
        console.error('XML 변환 오류:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAndConvertXml();
  }, []);

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
        data: jsonData,
        totalCount: 1,
      });
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">XML → JSON 변환 예제</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">XML을 JSON으로 변환 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">XML → JSON 변환 예제</h1>
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
        <h1 className="text-3xl font-bold mb-2">XML → JSON 변환 예제</h1>
        <p className="text-gray-600 mb-8">
          xml2js 라이브러리를 사용하여 XML 데이터를 JSON으로 변환하고 xPath로 쿼리하는 예제
        </p>

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
                      전체 OBJECT (2개)
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
                <h3 className="text-lg font-semibold text-gray-800 mb-3">조회 결과 ({queryResult?.method})</h3>

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
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📖 사용법</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              <strong>1. xml2js 설정:</strong> explicitArray=false, mergeAttrs=true 옵션으로 단일 요소는 객체로, 속성은
              프로퍼티로 병합하여 사용하기 쉬운 JSON 생성
            </p>
            <p>
              <strong>2. 쿼리 방식:</strong> queryData() 함수로 경로 기반 접근, filterByDateRange()로 날짜 범위 필터링
            </p>
            <p>
              <strong>3. 성능:</strong> 5MB XML 파일의 경우 변환 후 인덱싱하면 XPath 대비 90% 이상 성능 향상 가능
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
