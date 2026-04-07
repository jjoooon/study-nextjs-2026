'use client';

/**
 * MDI Tab Panel Component
 *
 * @description
 * 페이지 내 탭 UI로 열린 문서들을 표시하는 컴포넌트
 * - 탭 헤더로 문서 전환
 * - 탭 내용으로 iframe 기반 페이지 렌더링
 * - reloadOnTabSwitch 옵션으로 탭 전환 시 리로드 여부 제어
 */

import { useState } from 'react';

import { MDIPageRenderer } from './MDIPageRenderer';
import type { MDIDocument } from '@/shared/utils/mdiHelper2';

interface MDITabPanelProps {
  documents: MDIDocument[];
  selectedDocId: string | null;
  onSelectDoc: (docId: string) => void;
  onCloseDoc: (docId: string) => void;
  reloadOnTabSwitch?: boolean; // 탭 전환 시 리로드 여부 (default: false)
}

export function MDITabPanel({
  documents,
  selectedDocId,
  onSelectDoc,
  onCloseDoc,
  reloadOnTabSwitch = false,
}: MDITabPanelProps) {
  // Simple tab data to track display names
  const [tabDisplayNames, setTabDisplayNames] = useState<Map<string, string>>(new Map());

  // Update display names when documents change
  if (documents.length > 0) {
    const nextNames = new Map(tabDisplayNames);
    let hasChanges = false;

    documents.forEach((doc) => {
      const currentName = tabDisplayNames.get(doc.id);
      const displayName = doc.name || doc.url;
      if (currentName !== displayName) {
        nextNames.set(doc.id, displayName);
        hasChanges = true;
      }
    });

    // Clean up closed documents
    Array.from(nextNames.keys()).forEach((docId) => {
      if (!documents.find((d) => d.id === docId)) {
        nextNames.delete(docId);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setTabDisplayNames(nextNames);
    }
  }

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12">
        <div className="text-center">
          <div className="text-6xl mb-4">📑</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">열린 문서가 없습니다</h3>
          <p className="text-gray-500">왼쪽 패널에서 &quot;새 문서 열기&quot; 버튼을 클릭하여 문서를 열어주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
        {documents.map((doc, index) => {
          const isSelected = selectedDocId === doc.id;
          const displayName = tabDisplayNames.get(doc.id) || doc.url || `문서 ${index + 1}`;

          return (
            <div
              key={doc.id}
              role="tab"
              tabIndex={0}
              className={`flex items-center gap-2 px-4 py-3 border-r border-gray-200 cursor-pointer transition-colors min-w-max ${
                isSelected ? 'bg-white border-b-2 border-b-blue-500' : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectDoc(doc.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectDoc(doc.id);
                }
              }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className={`text-sm font-medium ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>
                {displayName}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseDoc(doc.id);
                }}
                className="ml-1 p-0.5 rounded hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {/* Tab Content - Render all tabs but only show selected one */}
      <div className="p-6">
        {documents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">위 탭 중 하나를 선택하여 내용을 확인하세요.</p>
          </div>
        ) : reloadOnTabSwitch ? (
          // 리로드 모드: 선택된 탭만 렌더링 (key 기반 remount)
          (() => {
            const selectedDocument = documents.find((d) => d.id === selectedDocId);
            return selectedDocument ? (
              <MDIPageRenderer key={selectedDocId} document={selectedDocument} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">문서를 불러오는 중...</p>
              </div>
            );
          })()
        ) : (
          // 리로드 방지 모드: 모든 탭을 렌더링하고 CSS로 show/hide
          documents.map((doc) => {
            const isSelected = selectedDocId === doc.id;
            return (
              <div key={doc.id} className={isSelected ? 'block' : 'hidden'} aria-hidden={!isSelected}>
                <MDIPageRenderer document={doc} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
