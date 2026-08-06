/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';

type DevPageIframeProps = {
  pageId: string;
  activeStep?: number;
  subId?: string;
  popup?: boolean;
};

export function DevPageIframe({ pageId, activeStep, subId }: DevPageIframeProps) {
  const stepQuery = activeStep ? `?activeStep=${activeStep}` : '';
  const subIdQuery = subId && subId.includes('sub_') ? `${stepQuery ? '&' : '?'}step=${encodeURIComponent(subId)}` : '';
  const query = `${stepQuery}${subIdQuery}`;

  const devUrl = `http://localhost:3000/pub/ispl/${pageId}${query}`;

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 20px)', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '6px 12px',
          backgroundColor: '#1e2124',
          color: '#ffffff',
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #333',
          fontFamily: 'sans-serif',
        }}
      >
        <span>
          🚀 Dev Live Server: <b style={{ color: '#ff7d58' }}>{devUrl}</b>
        </span>
        <a
          href={devUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0876ff', textDecoration: 'underline', fontWeight: 'bold' }}
        >
          새 탭으로 열기 ↗
        </a>
      </div>
      <iframe
        src={devUrl}
        title={`Dev Page ${pageId}`}
        style={{ width: '100%', flex: 1, border: 'none', backgroundColor: '#ffffff' }}
      />
    </div>
  );
}
