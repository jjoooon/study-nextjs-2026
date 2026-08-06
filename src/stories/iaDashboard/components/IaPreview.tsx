/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import { IARow } from '../useIaDashboard';

type IAPreviewProps = {
  activeRow: IARow | null;
  previewUrl: string;
  onMovePage: () => void;
  onMoveDevPage: () => void;
};

export function IaPreview({ activeRow, previewUrl, onMovePage, onMoveDevPage }: IAPreviewProps) {
  const iframeWrapRef = React.useRef<HTMLDivElement>(null);
  const [iframeDimensions, setIframeDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!iframeWrapRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setIframeDimensions({
          width: Math.round(width),
          height: Math.round(height),
        });
      }
    });
    observer.observe(iframeWrapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ia-preview-pane">
      {activeRow ? (
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className="ia-preview-label cursor-pointer hover:underline"
              role="button"
              tabIndex={0}
              onClick={onMoveDevPage}
            >
              <b>
                Dev: {activeRow.dep4}({activeRow.id})
              </b>
            </div>
            <div
              className="ia-preview-label cursor-pointer hover:underline"
              role="button"
              tabIndex={0}
              onClick={onMovePage}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onMovePage();
                }
              }}
            >
              {activeRow.dep1} &gt; {activeRow.dep2} &gt; {activeRow.dep3} &gt;{' '}
              <b>
                {activeRow.dep4}({activeRow.id})
              </b>
            </div>
            <div className="ia-preview-path mt-1 text-[#000] tracking-[0] !text-[1.2rem]">{activeRow.path ?? '-'}</div>
          </div>
        </div>
      ) : (
        <div className="ia-preview-label">조건에 맞는 화면이 없습니다.</div>
      )}
      {previewUrl ? (
        <div className="ia-preview-iframe-wrap" ref={iframeWrapRef}>
          <div className="absolute -top-[3.2rem] right-[0.4rem] bg-black/70 text-[#fff] px-[0.8rem] py-[0.3rem] text-[1.1rem] rounded-[0.4rem] pointer-events-none z-10 font-mono select-none">
            {iframeDimensions.width}px × {iframeDimensions.height}px
          </div>
          <iframe
            key={previewUrl}
            src={previewUrl}
            title="화면 미리보기"
            className="ia-preview-iframe"
            id="storybook-preview-iframe"
          />
        </div>
      ) : (
        <div className="ia-preview-iframe flex items-center justify-center text-[1.3rem] text-[#666]">
          미리보기 가능한 STEP 정보가 없습니다.
        </div>
      )}
    </div>
  );
}
