'use client';

import * as React from 'react';
import { Grow } from '@atoms';
import LinkGo, { getStoryIframeUrl, getStoryUrl } from './Link';

type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;

type IARow = {
  id: string;
  step: PageProcessStep;
  label: string;
  breadcrumb: string;
};

const ROWS: IARow[] = [
  { id: 'LniPl020', step: 1, label: '계약사항',  breadcrumb: '차세대가입설계 > 가입설계 > 가입설계' },
  { id: 'LniPl020', step: 2, label: '담보설계',  breadcrumb: '차세대가입설계 > 가입설계 > 가입설계' },
  { id: 'LniPl020', step: 3, label: '알릴사항',  breadcrumb: '차세대가입설계 > 가입설계 > 가입설계' },
  { id: 'LniPl020', step: 4, label: '심사요청',  breadcrumb: '차세대가입설계 > 가입설계 > 가입설계' },
  { id: 'LniPl020', step: 5, label: '추가사항',  breadcrumb: '차세대가입설계 > 가입설계 > 가입설계' },
  { id: 'LniPl020', step: 6, label: '수납',      breadcrumb: '차세대가입설계 > 가입설계 > 가입설계' },

];

export function IAListWithPreview() {
  const [hoveredStep, setHoveredStep] = React.useState<PageProcessStep>(1);
  const previewUrl = getStoryIframeUrl(ROWS[hoveredStep - 1].id, hoveredStep);

  return (
    <Grow className="w-full gap-[1.2rem] items-start ia-preview-root">
      <div className="w-full h-[calc(100vh-10rem)] overflow-auto">
        <table className="text-[1.2rem] IA-list w-full m-0!">
          <colgroup>
            <col style={{ width: '10rem' }} />
            <col />
          </colgroup>
          <tbody>
            {ROWS.map((row) => (
              <tr
                key={`${row.id}-${row.step}`}
                data-active={hoveredStep === row.step ? 'true' : undefined}
                onClick={() => LinkGo(row.id, row.step)}
                onMouseEnter={() => setHoveredStep(row.step)}
              >
                <th scope="row">{row.id}</th>
                <td>
                  {row.breadcrumb} &gt; <b>{row.label}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ia-preview-pane">
        <div className="ia-preview-label">
          {ROWS[hoveredStep - 1].breadcrumb} &gt; <b>{ROWS[hoveredStep - 1].label}</b>
        </div>
        <iframe
          key={previewUrl}
          src={previewUrl}
          title="화면 미리보기"
          className="ia-preview-iframe"
        />
      </div>
    </Grow>
  );
}
