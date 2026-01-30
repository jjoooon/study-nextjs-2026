'use client';

import { useState, useEffect } from 'react';
import log from '@/shared/utils/logger';
import { convertXmlToJson, filterByDateRange, xpathQuery, jsonPathQuery } from '@/shared/utils/xml/xmlConverter';

interface ConvertedData {
  GD: {
    GOCD: string;
    P_APPL_DT: string;
    GD_KORNM: string;
    RISK_OBJCT_CVRGE?: {
      RISK?: any | any[];
    };
  };
}

export default function XmlConverterPage() {
  const logger = log.getLogger('XML');

  const [jsonData, setJsonData] = useState<ConvertedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<any>(null);
  const [selectedRiskType, setSelectedRiskType] = useState<string>('RLA20011');
  const [targetDate, setTargetDate] = useState<string>('20260130');
  const [queryMode, setQueryMode] = useState<'jsonpath' | 'xpath' | 'native'>('jsonpath');

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

        // XML을 JSON으로 변환
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

    if (queryMode === 'jsonpath') {
      // 🚀 JSONPath 방식 (추천 - 가장 간편하고 강력)
      const jsonPath = `$.GD.RISK_OBJCT_CVRGE.RISK[?(@.RK_TPCD=='${selectedRiskType}')].OBJECT.CVRGE[?(@.SL_STRDT<='${targetDate}' && @.SL_NDDT>'${targetDate}')]`;

      try {
        const result = jsonPathQuery(jsonData, jsonPath);

        if (result && result.length > 0) {
          setQueryResult({
            method: 'JSONPath ⭐',
            query: jsonPath,
            coverages: result,
            totalCount: result.length,
          });
        } else {
          setQueryResult({
            method: 'JSONPath ⭐',
            query: jsonPath,
            message: '조건에 맞는 데이터를 찾을 수 없습니다.',
          });
        }
      } catch (error) {
        setQueryResult({
          method: 'JSONPath ⭐',
          query: jsonPath,
          error: error instanceof Error ? error.message : '쿼리 실행 중 오류 발생',
        });
      }
    } else if (queryMode === 'xpath') {
      // 🔥 XPath 레거시 호환 방식
      const xpath = `/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='${selectedRiskType}']/OBJECT/CVRGE[@SL_STRDT<='${targetDate}' and @SL_NDDT>'${targetDate}']`;

      try {
        const result = xpathQuery(jsonData, xpath);
        logger.debug('xpath result', result);

        // XPath는 이제 CVRGE 객체를 직접 반환합니다
        let coverages = [];
        if (Array.isArray(result)) {
          // 배열인 경우 모든 요소를 coverages로 사용
          coverages = result;
        } else if (result && typeof result === 'object') {
          // 단일 객체인 경우 배열로 변환
          coverages = [result];
        }

        if (coverages.length > 0) {
          setQueryResult({
            method: 'XPath (레거시)',
            query: xpath,
            coverages: coverages,
            totalCount: coverages.length,
          });
        } else {
          setQueryResult({
            method: 'XPath (레거시)',
            query: xpath,
            message: '조건에 맞는 데이터를 찾을 수 없습니다.',
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
      // Native JSON 방식 (이전 queryData 사용)
      const risks = jsonData.GD.RISK_OBJCT_CVRGE?.RISK;

      if (Array.isArray(risks)) {
        const filteredRisks = risks.filter((risk: any) => risk.RK_TPCD === selectedRiskType);

        if (filteredRisks.length > 0) {
          const risk = filteredRisks[0];

          if (risk.OBJECT && risk.OBJECT.CVRGE) {
            let coverages = Array.isArray(risk.OBJECT.CVRGE) ? risk.OBJECT.CVRGE : [risk.OBJECT.CVRGE];
            coverages = filterByDateRange(coverages, 'SL_STRDT', 'SL_NDDT', targetDate);

            setQueryResult({
              method: 'Native JSON',
              coverages: coverages,
              totalCount: coverages.length,
            });
          } else {
            setQueryResult({ method: 'Native JSON', message: '해당 리스크 유형에 대한 담보 정보가 없습니다.' });
          }
        } else {
          setQueryResult({ method: 'Native JSON', message: '조건에 맞는 리스크를 찾을 수 없습니다.' });
        }
      }
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
        <p className="text-gray-600 mb-8">xml2js 라이브러리를 사용하여 XML 데이터를 JSON으로 변환하고 쿼리하는 예제</p>

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
                {queryMode === 'jsonpath' && '🚀 JSONPath: 가장 간편하고 강력한 쿼리 방식 (추천)'}
                {queryMode === 'xpath' && '🔥 XPath: 레거시 호환, 기존 XPath 그대로 사용'}
                {queryMode === 'native' && '📦 Native JSON: TypeScript 네이티브 방식'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setQueryMode('jsonpath')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  queryMode === 'jsonpath'
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                }`}
              >
                🚀 JSONPath
              </button>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="riskType" className="block text-sm font-medium text-gray-700 mb-2">
                  리스크 유형 코드 (RK_TPCD)
                </label>
                <select
                  id="riskType"
                  value={selectedRiskType}
                  onChange={(e) => setSelectedRiskType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="RLA20010">RLA20010</option>
                  <option value="RLA20011">RLA20011</option>
                </select>
              </div>
              <div>
                <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-2">
                  기준일자
                </label>
                <input
                  id="targetDate"
                  type="text"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  placeholder="YYYYMMDD"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleQuery}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  조회 실행
                </button>
              </div>
            </div>

            {/* 쿼리 예시 표시 */}
            {queryMode === 'jsonpath' && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">🚀 실행될 JSONPath 쿼리:</p>
                <code className="text-xs text-gray-800 block overflow-x-auto bg-white p-2 rounded">
                  $.GD.RISK_OBJCT_CVRGE.RISK[?(@.RK_TPCD==&apos;{selectedRiskType}
                  &apos;)].OBJECT.CVRGE[?(@.SL_STRDT&lt;=&apos;
                  {targetDate}&apos; && @.SL_NDDT&gt;&apos;{targetDate}&apos;)]
                </code>
              </div>
            )}
            {queryMode === 'xpath' && (
              <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">🔥 실행될 XPath 쿼리:</p>
                <code className="text-xs text-gray-800 block overflow-x-auto bg-white p-2 rounded">
                  /GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD=&apos;{selectedRiskType}&apos;]/OBJECT/CVRGE[@SL_STRDT&lt;=&apos;
                  {targetDate}&apos; and @SL_NDDT&gt;&apos;{targetDate}&apos;]
                </code>
              </div>
            )}
            {queryMode === 'native' && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">📦 Native JSON 방식:</p>
                <code className="text-xs text-gray-800 block overflow-x-auto bg-white p-2 rounded">
                  jsonData.GD.RISK_OBJCT_CVRGE.RISK.filter(r =&gt; r.RK_TPCD === &apos;{selectedRiskType}
                  &apos;).flatMap(r =&gt; r.OBJECT.CVRGE).filter(c =&gt; c.SL_STRDT &lt;= &apos;{targetDate}&apos; &&
                  c.SL_NDDT &gt; &apos;{targetDate}&apos;)
                </code>
              </div>
            )}

            {/* 쿼리 결과 */}
            {queryResult && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">조회 결과 {queryResult?.method}</h3>
                {queryResult?.message && <p className="text-gray-600">{queryResult.message}</p>}
                {queryResult?.error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-700">
                    <p className="font-medium">오류:</p>
                    <p className="text-sm">{queryResult.error}</p>
                  </div>
                )}
                {queryResult?.coverages && (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      찾은 담보(CVRGE) 수: <span className="font-semibold">{queryResult.totalCount}</span>
                    </p>
                    <div className="space-y-2">
                      {queryResult.coverages.map((coverage: any, index: number) => (
                        <div
                          key={index}
                          className={`border rounded-md p-3 ${
                            queryMode === 'jsonpath'
                              ? 'bg-green-50 border-green-200'
                              : queryMode === 'xpath'
                                ? 'bg-orange-50 border-orange-200'
                                : 'bg-blue-50 border-blue-200'
                          }`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="font-medium">담보코드:</span> {coverage.CVRCD}
                            </div>
                            <div>
                              <span className="font-medium">시작일:</span> {coverage.SL_STRDT}
                            </div>
                            <div>
                              <span className="font-medium">종료일:</span> {coverage.SL_NDDT}
                            </div>
                          </div>
                          {coverage.ADD_ATTR && coverage.ADD_ATTR.ATTR && (
                            <div className="mt-2 text-sm">
                              <span className="font-medium">추가속성:</span> {coverage.ADD_ATTR.ATTR.ATRCD}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
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
