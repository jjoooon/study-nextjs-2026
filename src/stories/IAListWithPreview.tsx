'use client';


import * as React from 'react';
import { Grow } from '@atoms';
import LinkGo, { getStoryIframeUrl } from './Link';
import iaListData from './ialist.json';

type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;

type IARow = {
  no?: number;
  dep1: string;
  dep2: string;
  dep3: string;
  id: string;
  subId?: string;
  step?: string;
  dep4: string;
  type?: string;
  tab?: string;
  new?: string;
  plan: string;
  pub: string;
  dev: string;
  date: string;
  modify: string;
  file?: string;
  phase?: string;
  popup?: string;
};


const ROWS: IARow[] = iaListData as IARow[];

const getRowKey = (row: Pick<IARow, 'id' | 'subId'>) => `${row.id}-${row.subId ?? ''}`;
  

export function IAListWithPreview() {
  const [showPhaseOnly, setShowPhaseOnly] = React.useState(false);
  const [activeRowKey, setActiveRowKey] = React.useState<string>(() => getRowKey(ROWS[0]));

  const visibleRows = React.useMemo(() => {
    if (!showPhaseOnly) {
      return ROWS;
    }

    return ROWS.filter(row => row.phase === 'Y');
  }, [showPhaseOnly]);

  const activeRow = React.useMemo(() => {
    return visibleRows.find(row => getRowKey(row) === activeRowKey) ?? visibleRows[0] ?? null;
  }, [activeRowKey, visibleRows]);

  const toPageStep = React.useCallback((subId: string): PageProcessStep | undefined => {
    const match = subId.match(/_(\d)$/);

    if (!match) {
      return undefined;
    }

    const step = Number(match[1]);
    if (step >= 1 && step <= 6) {
      return step as PageProcessStep;
    }

    return undefined;
  }, []);

  const activeStep = toPageStep(activeRow?.subId ?? '');
  const previewUrl = activeRow
    ? activeStep
      ? getStoryIframeUrl(activeRow.id, activeStep, activeRow.popup)
      : getStoryIframeUrl(activeRow.id, undefined, activeRow.popup)
    : '';

  const handleMovePage = React.useCallback(() => {
    if (!activeRow) {
      return;
    }

    if (activeStep) {
      LinkGo(activeRow.id, activeStep, activeRow.popup);
      return;
    }

    LinkGo(activeRow.id, undefined, activeRow.popup);
  }, [activeRow, activeStep]);

  const workList = [
    'LTPA350_1', 'LTPA350_2', 'LTPZ010', 'LTPZ011', 'LTPZ017', 'LTPZ020', 'LTPZ021', 'LTPA160', 'LTPA904', 'LTPZ999', 'LTPZ998', 'LTPZ997', 'LTPZ996', 'LTPA170', 'LTPA904', 'LTPA390', 'LTPA430', 'LTPA070', 'LTPA010', 'LTPZ041', 'LTPZ042', 'LTPZ038', 'LTPZ043', 'LTPZ039', 'LTPA400', 'LTPA210', 'LTPA200', 'LTPA190', 'LTPZ001', 'LTPA030', 'LTPA360'

  ];

  const workIdSet = React.useMemo(() => new Set(workList), [workList]);

  return (
    <Grow className="w-full gap-[1.2rem] items-start ia-preview-root justify-center">
      <div className="h-[calc(100vh-4rem)] overflow-auto flex justify-start">
        <table className="text-[1.2rem] IA-list m-0! shrink-0!">
          <colgroup>
            <col style={{ width: '1rem' }} />
            <col style={{ width: '8rem' }} />
            <col />
            <col />
            <col style={{ width: '2rem' }} />
            <col />
            <col />
            <col style={{ width: '5rem' }} />
            <col style={{ width: '5rem' }} />
            <col style={{ width: '5rem' }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">ID</th>
              <th scope="col">화면명</th>  
              <th scope="col">설계서명</th>  
              <th
                scope="col"
                className="cursor-pointer select-none"
                onClick={() => setShowPhaseOnly(prev => !prev)}
              >
                1차{showPhaseOnly ? ' ✓' : ''}
              </th>
              <th scope="col">완료일</th>  
              <th scope="col">수정일</th>  
              
              <th scope="col" className="text-center">기획</th>
              <th scope="col" className="text-center">퍼블</th>
              <th scope="col" className="text-center">개발</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, index) => {
              const isActive = activeRow ? getRowKey(activeRow) === getRowKey(row) : false;

              return (
                <tr
                  key={`${getRowKey(row)}-${index}`}
                  data-active={isActive ? 'true' : undefined}
                  className={isActive ? 'selected' : ''}
                  onClick={() => setActiveRowKey(getRowKey(row))}
                >
                  <td className={workIdSet.has(row.id) || workIdSet.has(row.subId ?? '') ? 'bg-[#fff3cd]!' : ''}>
                    <b>{index + 1}</b>
                  </td>
                  <th scope="row" className={`${workIdSet.has(row.id) || workIdSet.has(row.subId ?? '') ? 'bg-[#c5bfbf]!' : ''}`}>
                    {row.id}{row.subId ? (<><br /> ({row.subId})</>) : ''}
                  </th>
                  <td className={workIdSet.has(row.id) || workIdSet.has(row.subId ?? '') ? 'bg-[#fff3cd]!' : ''}>
                    <b>{row.dep4}</b>
                  </td>

                  <td className={workIdSet.has(row.id) || workIdSet.has(row.subId ?? '') ? 'bg-[#fff3cd]!' : ''}>
                    {row.file}
                  </td>

                  <td className={`text-center ${workIdSet.has(row.id) || workIdSet.has(row.subId ?? '') ? 'bg-[#fff3cd]!' : ''}`}>
                    <b>{row.phase === 'Y' ? 'Y' : ''}</b>
                  </td>

                  <td className={`text-center ${workIdSet.has(row.id) || workIdSet.has(row.subId ?? '') ? 'bg-[#fff3cd]!' : ''}`}>
                    <b>{row.date}</b>
                  </td>
                  <td className={`text-center ${workIdSet.has(row.id) || workIdSet.has(row.subId ?? '') ? 'bg-[#fff3cd]!' : ''}`}>
                    <b>{row.modify}</b>
                  </td>

                  <td className={`text-center ${workIdSet.has(row.id) || workIdSet.has(row.subId ?? '') ? 'bg-[#fff3cd]!' : ''}`}>{row.plan}</td>
                  <td className={`text-center ${workIdSet.has(row.id) || workIdSet.has(row.subId ?? '') ? 'bg-[#fff3cd]!' : ''}`}>{row.pub}</td>
                  <td className={`text-center ${workIdSet.has(row.id) || workIdSet.has(row.subId ?? '') ? 'bg-[#fff3cd]!' : ''}`}>{row.dev}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="ia-preview-pane">
        {activeRow ? (
          <div className="ia-preview-label cursor-pointer" onClick={handleMovePage}>
            {activeRow.dep1} &gt; {activeRow.dep2} &gt; {activeRow.dep3} &gt; <b>{activeRow.dep4}({activeRow.id})</b>
          </div>
        ) : (
          <div className="ia-preview-label">조건에 맞는 화면이 없습니다.</div>
        )}
        {previewUrl ? (
          <iframe
            key={previewUrl}
            src={previewUrl}
            title="화면 미리보기"
            className="ia-preview-iframe"
          />
        ) : (
          <div className="ia-preview-iframe flex items-center justify-center text-[1.3rem] text-[#666]">
            미리보기 가능한 STEP 정보가 없습니다.
          </div>
        )}
      </div>
    </Grow>
  );
}
