'use client';

/**
 * MDI Page Renderer Component
 *
 * @description
 * Dynamically renders Next.js pages based on URL using iframe
 * - Shows loading state while fetching page content
 * - Displays document info header
 */

import { useState } from 'react';
import type { MDIDocument } from '@/shared/utils/mdiHelper2';

interface MDIPageRendererProps {
  document: MDIDocument;
}

// Page renderer using iframe
function IframePageRenderer({ url, documentName }: { url: string; documentName?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">페이지를 불러오는 중...</p>
          </div>
        </div>
      )}
      <iframe
        src={url}
        className="w-full h-full border-0"
        onLoad={() => setIsLoading(false)}
        title={`MDI: ${documentName || url}`}
      />
    </div>
  );
}

export function MDIPageRenderer({ document }: MDIPageRendererProps) {
  // Always use iframe approach for simplicity
  // This works with any Next.js page or external URL
  return (
    <div className="min-h-[600px]">
      {/* Header with document info */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{document.name || document.url}</h3>
            <p className="text-xs text-gray-500">{document.url}</p>
          </div>
        </div>
        {document.name && (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">{document.name}</span>
        )}
      </div>

      {/* Page content in iframe */}
      <IframePageRenderer url={document.url} documentName={document.name} />
    </div>
  );
}
