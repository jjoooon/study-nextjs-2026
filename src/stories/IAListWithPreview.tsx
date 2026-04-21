'use client';

import { Grow } from '@atoms';
import * as React from 'react';
import LinkGo, { getStoryIframeUrl } from './Link';
// iaEndModify import 제거, meta.data만 사용
import iaDateData from './ia-date.json';
import meta from './ialist-meta.json';
import iaListData from './ialist.json';

type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;
type SortOrder = 'default' | 'asc' | 'desc';
type SortKey = 'dep4' | 'plan' | 'pub' | 'dev' | 'path' | 'id' | 'completeDate' | 'modifyDate';
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
  path?: string;
};

const ROWS: IARow[] = iaListData as IARow[];

const getRowKey = (row: Pick<IARow, 'id' | 'subId'>) => `${row.id}-${row.subId ?? ''}`;

export function IAListWithPreview() {
  const [showPhaseOnly, setShowPhaseOnly] = React.useState(false);
  const [sortState, setSortState] = React.useState<SortState>({ key: null, order: 'default' });
  // 정렬 핸들러 복구
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
  const [activeRowKey, setActiveRowKey] = React.useState<string>(() => getRowKey(ROWS[0]));

  const workListH = React.useMemo(() => meta.workListH as string[], []);
  const workListK = React.useMemo(() => meta.workListK as string[], []);
  const workListJ = React.useMemo(() => meta.workListJ as string[], []);

  const rowsWithPubOwner = React.useMemo(() => {
    const pubOwnerById = new Map<string, string>();

    workListH.forEach((id) => pubOwnerById.set(id, '허승하'));
    workListK.forEach((id) => pubOwnerById.set(id, '권오택'));
    workListJ.forEach((id) => pubOwnerById.set(id, '조현민'));

    return ROWS.map((row) => {
      const matchedPubOwner = pubOwnerById.get(row.subId ?? '') ?? pubOwnerById.get(row.id);

      if (!matchedPubOwner) {
        return row;
      }

      return {
        ...row,
        pub: matchedPubOwner,
      };
    });
  }, [workListH, workListJ, workListK]);

  const visibleRows = React.useMemo(() => {
    // dep1이 '차세대가입설계'인 항목만 노출
    const filtered = rowsWithPubOwner.filter((row) => row.dep1 === '차세대가입설계');
    if (!showPhaseOnly) {
      return filtered;
    }
    return filtered.filter((row) => row.phase === 'Y');
  }, [rowsWithPubOwner, showPhaseOnly]);

  const activeRow = React.useMemo(() => {
    return visibleRows.find((row) => getRowKey(row) === activeRowKey) ?? visibleRows[0] ?? null;
  }, [activeRowKey, visibleRows]);

  // 완료일/수정일 정렬 지원
  const sortedRows = React.useMemo(() => {
    if (sortState.key === null || sortState.order === 'default') {
      return visibleRows;
    }
    const sortKey = sortState.key;
    return [...visibleRows].sort((left, right) => {
      // 날짜 정렬 지원
      if (sortKey === 'completeDate' || sortKey === 'modifyDate') {
        // 날짜 추출 함수 (YYYY.MM.DD → YYYYMMDD)
        const getDateNum = (row: IARow, type: 'completeDate' | 'modifyDate') => {
          let result = type === 'completeDate' ? row.date : row.modify;
          const dateData = iaDateData as Record<string, string[]>;
          for (const key of Object.keys(dateData)) {
            if (key.startsWith(type === 'completeDate' ? 'e' : 'm') && key.length === 7) {
              const dateStr = key.slice(1);
              const idList = dateData[key];
              if (Array.isArray(idList) && idList.includes(row.id)) {
                result = `20${dateStr.slice(0, 2)}.${dateStr.slice(2, 4)}.${dateStr.slice(4, 6)}`;
              }
            }
          }
          return result.replace(/\./g, '');
        };
        const leftValue = getDateNum(left, sortKey);
        const rightValue = getDateNum(right, sortKey);
        const compareResult = leftValue.localeCompare(rightValue);
        return sortState.order === 'asc' ? compareResult : -compareResult;
      }
      // 기존 문자열 정렬
      type SortableKeys = keyof Pick<IARow, 'dep4' | 'plan' | 'pub' | 'dev' | 'path' | 'id'>;
      if (!sortKey || !['dep4', 'plan', 'pub', 'dev', 'path', 'id'].includes(sortKey)) {
        return 0;
      }
      const key = sortKey as SortableKeys;
      const leftValue = left[key] ?? '';
      const rightValue = right[key] ?? '';
      const compareResult = leftValue.localeCompare(rightValue, 'ko');
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
    ? getStoryIframeUrl(activeRow.id, activeRow.path ?? '', activeStep, activeRow.subId)
    : '';

  const handleMovePage = React.useCallback(() => {
    if (!activeRow) {
      return;
    }
    LinkGo(activeRow.id, activeRow.path ?? '', activeStep, activeRow.subId);
  }, [activeRow, activeStep]);

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

  const inspectionList = React.useMemo(() => meta.inspectionList as string[], []);
  const ingList = React.useMemo(() => meta.ingList as string[], []);
  const workList = React.useMemo(() => {
    const workListPrev: string[] = meta.workListPrev as string[];
    return [...workListPrev, ...workListH, ...workListK, ...workListJ];
  }, [workListH, workListJ, workListK]);

  const ingIdSet = React.useMemo(() => new Set(ingList), [ingList]);
  const workIdSet = React.useMemo(() => new Set(workList), [workList]);

  return (
    <Grow className="w-full gap-[1.2rem] items-start ia-preview-root justify-center">
      <div className="h-[calc(100vh-4rem)] overflow-auto flex justify-start">
        <table className="text-[1.2rem] IA-list m-0! shrink-0! ![&_b]:tracking-0">
          <colgroup>
            <col style={{ width: '1rem' }} />
            <col style={{ width: '4rem' }} />
            <col style={{ width: '8rem' }} />
            <col />
            <col />
            <col style={{ width: '2rem' }} />
            <col />
            <col />
            {/* <col style={{ width: '5rem' }} />
            <col style={{ width: '5rem' }} />
            <col style={{ width: '5rem' }} /> */}
          </colgroup>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col" className="cursor-pointer select-none" onClick={() => handleSort('path')}>
                경로{getSortIndicator('path')}
              </th>
              <th scope="col" className="cursor-pointer select-none" onClick={() => handleSort('id')}>
                ID{getSortIndicator('id')}
              </th>
              <th scope="col" className="cursor-pointer select-none" onClick={() => handleSort('dep4')}>
                화면명{getSortIndicator('dep4')}
              </th>
              <th scope="col">설계서명</th>
              <th scope="col">검수</th>
              <th scope="col" className="cursor-pointer select-none" onClick={() => setShowPhaseOnly((prev) => !prev)}>
                1차{showPhaseOnly ? ' ✓' : ''}
              </th>
              <th scope="col" className="cursor-pointer select-none" onClick={() => handleSort('completeDate')}>
                완료일{getSortIndicator('completeDate')}
              </th>
              <th scope="col" className="cursor-pointer select-none" onClick={() => handleSort('modifyDate')}>
                수정일{getSortIndicator('modifyDate')}
              </th>

              {/* <th scope="col" className="text-center cursor-pointer select-none" onClick={() => handleSort('plan')}>
                기획{getSortIndicator('plan')}
              </th>
              <th scope="col" className="text-center cursor-pointer select-none" onClick={() => handleSort('pub')}>
                퍼블{getSortIndicator('pub')}
              </th>
              <th scope="col" className="text-center cursor-pointer select-none" onClick={() => handleSort('dev')}>
                개발{getSortIndicator('dev')}
              </th> */}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => {
              const isActive = activeRow ? getRowKey(activeRow) === getRowKey(row) : false;
              const isIng = ingIdSet.has(row.id) || ingIdSet.has(row.subId ?? '');
              const isWork = workIdSet.has(row.id) || workIdSet.has(row.subId ?? '');
              const rowBgClass = isWork
                ? 'bg-[#dbeafe]! tracking-0'
                : isIng
                  ? 'bg-[#fff3cd]! tracking-0'
                  : 'tracking-0';
              const rowIdBgClass = isWork
                ? 'bg-[#bfdbfe]! tracking-0'
                : isIng
                  ? 'bg-[#c5bfbf]! tracking-0'
                  : 'tracking-0';
              const isInspected = [row.id, row.subId]
                .filter(Boolean)
                .some((id) => inspectionList.some((insp) => insp.toLowerCase() === String(id).toLowerCase()));

              // 완료일/수정일: ia-date.json 기준으로 계산
              let completeDate = row.date;
              let modifyDate = row.modify;
              const dateData = iaDateData as Record<string, string[]>;
              for (const key of Object.keys(dateData)) {
                if (key.startsWith('e') && key.length === 7) {
                  const dateStr = key.slice(1);
                  const idList = dateData[key];
                  if (Array.isArray(idList) && idList.includes(row.id)) {
                    completeDate = `${dateStr.slice(0, 2)}.${dateStr.slice(2, 4)}.${dateStr.slice(4, 6)}`;
                  }
                }
                if (key.startsWith('m') && key.length === 7) {
                  const dateStr = key.slice(1);
                  const idList = dateData[key];
                  if (Array.isArray(idList) && idList.includes(row.id)) {
                    modifyDate = `${dateStr.slice(0, 2)}.${dateStr.slice(2, 4)}.${dateStr.slice(4, 6)}`;
                  }
                }
              }

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
                  <td className={rowBgClass + ' '}>
                    <b>{row.path ?? ''}</b>
                  </td>
                  <th scope="row" className={rowIdBgClass}>
                    {row.id}
                    {row.subId ? <>({row.subId})</> : ''}
                  </th>
                  <td className={rowBgClass}>
                    <b>{row.dep4}</b>
                  </td>

                  <td className={rowBgClass}>{row.file}</td>

                  {/* Inspection status column */}
                  <td className={`text-center ${rowBgClass}`}>{isInspected ? '✔️' : ''}</td>

                  <td className={`text-center ${rowBgClass}`}>
                    <b>{row.phase === 'Y' ? 'Y' : ''}</b>
                  </td>
                  <td className={`text-center ${rowBgClass}`}>
                    <b>{completeDate}</b>
                  </td>
                  <td className={`text-center ${rowBgClass}`}>
                    <b>{modifyDate}</b>
                  </td>

                  {/* 
                  <td className={`text-center ${rowBgClass}`}>{row.plan}</td>
                  <td className={`text-center ${rowBgClass}`}>{row.pub}</td>
                  <td className={`text-center ${rowBgClass}`}>{row.dev}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="ia-preview-pane">
        {activeRow ? (
          <div>
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
            <div className="ia-preview-path mt-2 text-[#000] tracking-[0] !text-[1.2rem]">{activeRow.path ?? '-'}</div>
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
