'use client';

import { useEffect, useState } from 'react';
import { loadBizcode, getBizcode, clearBizcode } from '@/shared/utils/bizcodeUtils';
import type { BizcodeResultItem, BizCodeTemplate } from '@/shared/utils/bizcodeUtils';

// ============================================================================
// CSR Bizcode 샘플
// loadBizcode(template) → window.__BIZCODE__ 저장 → getBizcode()로 조회
// ============================================================================

/** 5개 search 타입 전체 템플릿 */
const BIZCODE_TEMPLATE: BizCodeTemplate = {
  // clsfCd/detlLvl/pprDtCd/stdt/enGb
  codeSearch: ['CD001', 'CD002/2/PPR01/20130101'],
  // suboRelTpcd/lvl1Dtcd/.../lvlNDtcd
  complexCodeSearch: ['REL01', 'REL02/DTL01/DTL02'],
  // txCode, record, code: [inputCd1/inputCd2/...]
  partCodeSearch: [{ txCode: 'TRX001', record: 'REC01', code: ['PARAM01', 'PARAM02/PARAM03'] }],
  // clsfCd/stdt/detlLvl/pprDtCd
  codeFullSearch: ['FULL01', 'FULL02/20130101/3/PPR01'],
  // gdcd/gdFlg/applDt/atrcdFlg/rkTpcd
  xmlSearch: ['PROD01/GDRSK/20130101/Y/01', 'PROD02'],
};

/** getBizcode에서 조회할 키 목록 */
const SAMPLE_KEYS = {
  codeSearch: ['CD001', 'CD002/2/PPR01/20130101'],
  complexCodeSearch: ['REL01', 'REL02/DTL01/DTL02'],
  partCodeSearch: ['PARAM01', 'PARAM02/PARAM03'],
  codeFullSearch: ['FULL01', 'FULL02/20130101/3/PPR01'],
  xmlSearch: ['PROD01/GDRSK/20130101/Y/01', 'PROD02'],
} as const;

type SearchResults = Record<string, Record<string, BizcodeResultItem[]>>;

export default function BizCodeCSRPage() {
  const [results, setResults] = useState<SearchResults>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const loadAll = async () => {
    setIsLoaded(false);

    await loadBizcode(BIZCODE_TEMPLATE);

    const data: SearchResults = {};
    for (const [type, keys] of Object.entries(SAMPLE_KEYS)) {
      data[type] = {};
      for (const key of keys) {
        data[type][key] = getBizcode(type as keyof typeof SAMPLE_KEYS, key) ?? [];
      }
    }
    setResults(data);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleClear = () => {
    clearBizcode();
    setResults({});
    setIsLoaded(false);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Bizcode CSR 샘플</h1>
      <p className="text-gray-600 mb-8">
        loadBizcode(template) → window.__BIZCODE__ 저장 → getBizcode()로 조회
      </p>

      {/* 액션 버튼 */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={loadAll}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          loadBizcode 재호출
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          clearBizcode
        </button>
      </div>

      {!isLoaded ? (
        <div className="text-gray-500">로딩 중...</div>
      ) : (
        <>
          {/* 각 search 타입별 결과 표시 */}
          {Object.entries(SAMPLE_KEYS).map(([type, keys]) => (
            <section key={type} className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-green-700">{type}</h2>
              {keys.map((key) => (
                <div key={key} className="mb-4">
                  <h3 className="text-sm font-semibold mb-2 text-gray-600">
                    key: &quot;{key}&quot;
                  </h3>
                  <ResultTable items={results[type]?.[key] ?? []} />
                </div>
              ))}
            </section>
          ))}

          {/* window.__BIZCODE__ 상태 확인 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">window.__BIZCODE__ 상태</h2>
            <div className="bg-gray-50 border rounded-lg p-4">
              <pre className="text-xs overflow-auto max-h-96">
                {typeof window !== 'undefined' && window.__BIZCODE__
                  ? JSON.stringify(window.__BIZCODE__, null, 2)
                  : '초기화되지 않음'}
              </pre>
            </div>
          </section>
        </>
      )}

      {/* 사용법 안내 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">CSR 사용법</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <pre className="text-sm whitespace-pre-wrap">{`await loadBizcode({
  codeSearch: ['CD001', 'CD002/2/PPR01/20130101'],
  complexCodeSearch: ['REL01', 'REL02/DTL01/DTL02'],
  partCodeSearch: [{ txCode: 'TRX001', record: 'REC01', code: ['PARAM01', 'PARAM02/PARAM03'] }],
  codeFullSearch: ['FULL01', 'FULL02/20130101/3/PPR01'],
  xmlSearch: ['PROD01/GDRSK/20130101/Y/01', 'PROD02'],
});

const data = getBizcode('codeSearch', 'CD001');
const data2 = getBizcode('complexCodeSearch', 'REL02/DTL01/DTL02');
const data3 = getBizcode('partCodeSearch', 'PARAM02/PARAM03');
const data4 = getBizcode('codeFullSearch', 'FULL02/20130101/3/PPR01');
const data5 = getBizcode('xmlSearch', 'PROD01/GDRSK/20130101/Y/01');`}</pre>
        </div>
      </section>
    </div>
  );
}

function ResultTable({ items }: { items: BizcodeResultItem[] }) {
  if (items.length === 0) {
    return (
      <div className="bg-slate-50 border rounded-lg p-4">
        <p className="text-gray-500 text-sm">데이터 없음 (API 연동 후 결과가 표시됩니다)</p>
      </div>
    );
  }

  const columns = Object.keys(items[0]);

  return (
    <div className="bg-slate-50 border rounded-lg p-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            {columns.map((col) => (
              <th key={col} className="text-left py-2 px-3">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="border-b last:border-b-0">
              {columns.map((col) => (
                <td key={col} className="py-2 px-3">{String(item[col] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
