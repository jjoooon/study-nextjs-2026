'use client';

import { useState, useEffect } from 'react';
import { getBizcode } from '@/shared/utils/bizcodeUtils';
import type { BizcodeResultItem } from '@/shared/utils/bizcodeUtils';

// ============================================================================
// SSR Bizcode 샘플 - Page (클라이언트 컴포넌트)
// layout.tsx(SSR) → StoreHydrator → hydrateBizcode() → 여기서 getBizcode()
// ============================================================================

/** 샘플에서 조회할 키 목록 (layout.tsx의 BIZCODE_TEMPLATE과 대응) */
const SAMPLE_KEYS = {
  codeSearch: ['CD001', 'CD002/2/PPR01/20130101'],
  complexCodeSearch: ['REL01', 'REL02/DTL01/DTL02'],
  partCodeSearch: ['PARAM01', 'PARAM02/PARAM03'],
  codeFullSearch: ['FULL01', 'FULL02/20130101/3/PPR01'],
  xmlSearch: ['PROD01/GDRSK/20130101/Y/01', 'PROD02'],
} as const;

type SearchResults = Record<string, Record<string, BizcodeResultItem[]>>;

export default function BizCodeSSRPage() {
  const [results, setResults] = useState<SearchResults>({});

  useEffect(() => {
    const data: SearchResults = {};
    for (const [type, keys] of Object.entries(SAMPLE_KEYS)) {
      data[type] = {};
      for (const key of keys) {
        data[type][key] = getBizcode(type as keyof typeof SAMPLE_KEYS, key) ?? [];
      }
    }
    setResults(data);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Bizcode SSR 샘플</h1>
      <p className="text-gray-600 mb-8">
        layout.tsx(SSR) → fetchBizcodeData(template) → StoreHydrator → hydrateBizcode() → page.tsx → getBizcode()
      </p>

      {/* 각 search 타입별 결과 표시 */}
      {Object.entries(SAMPLE_KEYS).map(([type, keys]) => (
        <section key={type} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">{type}</h2>
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
