'use client';

import * as React from 'react';
import { Grow } from '@atoms';
import LinkGo, { getStoryIframeUrl } from './Link';
import iaListData from './ialist.json';

type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;
type SortOrder = 'default' | 'asc' | 'desc';
type SortKey = 'dep4' | 'plan' | 'pub' | 'dev';

type SortState = {
  key: SortKey | null;
  order: SortOrder;
};

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
  const [showPhaseOnly, setShowPhaseOnly] = React.useState(true);
  const [sortState, setSortState] = React.useState<SortState>({ key: null, order: 'default' });
  const [activeRowKey, setActiveRowKey] = React.useState<string>(() => getRowKey(ROWS[0]));

  const visibleRows = React.useMemo(() => {
    if (!showPhaseOnly) {
      return ROWS;
    }

    return ROWS.filter((row) => row.phase === 'Y');
  }, [showPhaseOnly]);

  const activeRow = React.useMemo(() => {
    return visibleRows.find((row) => getRowKey(row) === activeRowKey) ?? visibleRows[0] ?? null;
  }, [activeRowKey, visibleRows]);

  const sortedRows = React.useMemo(() => {
    if (sortState.key === null || sortState.order === 'default') {
      return visibleRows;
    }

    const sortKey = sortState.key;

    return [...visibleRows].sort((left, right) => {
      const compareResult = left[sortKey].localeCompare(right[sortKey], 'ko');

      return sortState.order === 'asc' ? compareResult : -compareResult;
    });
  }, [sortState, visibleRows]);

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

  const handleSort = React.useCallback((key: SortKey) => {
    setSortState((prev) => {
      if (prev.key !== key || prev.order === 'default') {
        return { key, order: 'asc' };
      }

      if (prev.order === 'asc') {
        return { key, order: 'desc' };
      }

      return { key: null, order: 'default' };
    });
  }, []);

  const getSortIndicator = React.useCallback(
    (key: SortKey) => {
      if (sortState.key !== key) {
        return '';
      }

      if (sortState.order === 'asc') {
        return ' ↑';
      }

      if (sortState.order === 'desc') {
        return ' ↓';
      }

      return '';
    },
    [sortState]
  );

  const ingList = React.useMemo(() => ['LTPA350_1', 'LTPA350_2', 'LTPZ021', 'LTPZ032'], []);
  const workList = React.useMemo(() => {
    const workListPrev: string[] = [
      'LTPZ010',
      'LTPZ011',
      'LTPZ017',
      'LTPZ020',
      'LTPA160',
      'LTPA904',

      'LTPZ998',
      'LTPZ997',
      'LTPZ996',
      'LTPA170',
      'LTPA904',
      'LTPA390',
      'LTPA430',
      'LTPA070',
      'LTPA010',
      'LTPZ041',
      'LTPZ042',
      'LTPZ038',
      'LTPZ039',
      'LTPA400',
      'LTPA210',
      'LTPA200',
      'LTPA190',
      'LTPZ001',
      'LTPZ040',
      'LTPZ043',
      'LTPZ046',
      'LTPZ047',
      'LTPA030',
      'LTPA360',
      'LTPZ049',
      'LTPZ050',
      'LTPZ051',
      'LTPZ002',
      'LTPZ052',
      'LTPZ053',
      'LTPZ057',
      'LTPZ009',
      'LTPA401',
      'LTPA301',
      'LTPA303',
      'LTPZ048',
      'LTPZ045',
      'LTRZ085',
      'LTPA300',
      'LTPZ994',
      'LTPZ995',
      'LTPZ030',
      'LTPZ031',
      'LTPZ005',
    ];
    const workListH: string[] = [];
    const workListK: string[] = ['LTPZ085', 'LTPZ086'];
    const workListJ: string[] = ['LTPZ999', 'LTPZ018'];

    return [...workListPrev, ...workListH, ...workListK, ...workListJ];
  }, []);

  const ingIdSet = React.useMemo(() => new Set(ingList), [ingList]);
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
              <th scope="col" className="cursor-pointer select-none" onClick={() => handleSort('dep4')}>
                화면명{getSortIndicator('dep4')}
              </th>
              <th scope="col">설계서명</th>
              <th scope="col" className="cursor-pointer select-none" onClick={() => setShowPhaseOnly((prev) => !prev)}>
                1차{showPhaseOnly ? ' ✓' : ''}
              </th>
              <th scope="col">완료일</th>
              <th scope="col">수정일</th>

              <th scope="col" className="text-center cursor-pointer select-none" onClick={() => handleSort('plan')}>
                기획{getSortIndicator('plan')}
              </th>
              <th scope="col" className="text-center cursor-pointer select-none" onClick={() => handleSort('pub')}>
                퍼블{getSortIndicator('pub')}
              </th>
              <th scope="col" className="text-center cursor-pointer select-none" onClick={() => handleSort('dev')}>
                개발{getSortIndicator('dev')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => {
              const isActive = activeRow ? getRowKey(activeRow) === getRowKey(row) : false;
              const isIng = ingIdSet.has(row.id) || ingIdSet.has(row.subId ?? '');
              const isWork = workIdSet.has(row.id) || workIdSet.has(row.subId ?? '');
              const rowBgClass = isWork ? 'bg-[#dbeafe]!' : isIng ? 'bg-[#fff3cd]!' : '';
              const rowIdBgClass = isWork ? 'bg-[#bfdbfe]!' : isIng ? 'bg-[#c5bfbf]!' : '';

              return (
                <tr
                  key={`${getRowKey(row)}-${index}`}
                  data-active={isActive ? 'true' : undefined}
                  className={isActive ? 'selected' : ''}
                  onClick={() => setActiveRowKey(getRowKey(row))}
                >
                  <td className={rowBgClass}>
                    <b>{index + 1}</b>
                  </td>
                  <th scope="row" className={rowIdBgClass}>
                    {row.id}
                    {row.subId ? (
                      <>
                        <br /> ({row.subId})
                      </>
                    ) : (
                      ''
                    )}
                  </th>
                  <td className={rowBgClass}>
                    <b>{row.dep4}</b>
                  </td>

                  <td className={rowBgClass}>{row.file}</td>

                  <td className={`text-center ${rowBgClass}`}>
                    <b>{row.phase === 'Y' ? 'Y' : ''}</b>
                  </td>

                  <td className={`text-center ${rowBgClass}`}>
                    <b>{row.date}</b>
                  </td>
                  <td className={`text-center ${rowBgClass}`}>
                    <b>{row.modify}</b>
                  </td>

                  <td className={`text-center ${rowBgClass}`}>{row.plan}</td>
                  <td className={`text-center ${rowBgClass}`}>{row.pub}</td>
                  <td className={`text-center ${rowBgClass}`}>{row.dev}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="ia-preview-pane">
        {activeRow ? (
          <div
            className="ia-preview-label cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={handleMovePage}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleMovePage();
              }
            }}
          >
            {activeRow.dep1} &gt; {activeRow.dep2} &gt; {activeRow.dep3} &gt;{' '}
            <b>
              {activeRow.dep4}({activeRow.id})
            </b>
          </div>
        ) : (
          <div className="ia-preview-label">조건에 맞는 화면이 없습니다.</div>
        )}
        {previewUrl ? (
          <iframe key={previewUrl} src={previewUrl} title="화면 미리보기" className="ia-preview-iframe" />
        ) : (
          <div className="ia-preview-iframe flex items-center justify-center text-[1.3rem] text-[#666]">
            미리보기 가능한 STEP 정보가 없습니다.
          </div>
        )}
      </div>
    </Grow>
  );
}
