'use client';

import * as React from 'react';
import { Grow } from '@atoms';
import LinkGo, { getStoryIframeUrl } from './Link';
import iaListData from './ialist.json';

import iaHsh from './ia-hsh.json';
import iaKot from './ia-kot.json';
import iaJhm from './ia-jhm.json';

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

type PubInfo = {
  화면아이디: string;
  이름: string;
  완료일: string;
  수정일: string;
};

const pubInfoList: PubInfo[] = [
  ...(iaHsh as PubInfo[]),
  ...(iaKot as PubInfo[]),
  ...(iaJhm as PubInfo[]),
];

// pubInfoList에서 화면아이디로 PubInfo를 찾는 헬퍼
const getPubInfo = (row: Pick<IARow, 'id' | 'subId'>) => {
  const bySubId = row.subId ? pubInfoList.find(info => info.화면아이디 === row.subId) : undefined;
  return bySubId ?? pubInfoList.find(info => info.화면아이디 === row.id);
};

const getRowKey = (row: Pick<IARow, 'id' | 'subId'>) => `${row.id}-${row.subId ?? ''}`;

export function IAListWithPreview() {
  const [showPhaseOnly, setShowPhaseOnly] = React.useState(false);
  const [sortState, setSortState] = React.useState<SortState>({ key: null, order: 'default' });
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

  const rowsWithPubInfo = React.useMemo(() => {
    return ROWS.map((row) => {
      const info = getPubInfo(row);
      if (!info) return row;
      const phase = info.완료일 ? 'Y' : row.phase;
      return {
        ...row,
        pub: info.이름,
        date: info.완료일 || row.date,
        modify: info.수정일 || row.modify,
        phase,
      };
    });
  }, [ROWS, pubInfoList]);

  const visibleRows = React.useMemo(() => {
    const filtered = rowsWithPubInfo.filter((row) => row.dep1 === '차세대가입설계');
    if (!showPhaseOnly) {
      return filtered;
    }
    return filtered.filter((row) => row.phase === 'Y');
  }, [rowsWithPubInfo, showPhaseOnly]);

  const totalCount = React.useMemo(() => visibleRows.length, [visibleRows]);
  const doneCount = React.useMemo(() => visibleRows.filter((row) => row.phase === 'Y').length, [visibleRows]);
  const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const activeRow = React.useMemo(() => {
    return visibleRows.find((row) => getRowKey(row) === activeRowKey) ?? visibleRows[0] ?? null;
  }, [activeRowKey, visibleRows]);

  const sortedRows = React.useMemo(() => {
    if (sortState.key === null || sortState.order === 'default') {
      return visibleRows;
    }
    const sortKey = sortState.key;
    return [...visibleRows].sort((left, right) => {
      // 날짜 정렬도 pubInfoList 기준으로 변경
      if (sortKey === 'completeDate' || sortKey === 'modifyDate') {
        const getDateNum = (row: IARow, type: 'completeDate' | 'modifyDate') => {
          const info = getPubInfo(row);
          let result = type === 'completeDate'
            ? (info?.완료일 || row.date)
            : (info?.수정일 || row.modify);
          return result.replace(/\./g, '');
        };
        const leftValue = getDateNum(left, sortKey);
        const rightValue = getDateNum(right, sortKey);
        const compareResult = leftValue.localeCompare(rightValue);
        return sortState.order === 'asc' ? compareResult : -compareResult;
      }
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

  return (
    <Grow className="w-full gap-[1.2rem] items-start ia-preview-root justify-center">
      <div className="h-[calc(100vh-4rem)] overflow-auto flex  flex-col justify-start">
        <div className="!text-[1.4rem] IA-list m-0! shrink-0! ![&_b]:tracking-0 !text-[#000] flex items-center gap-4 mb-2">
            반입일: 2026.04.20
        </div>
        <div className="w-full grid grid-cols-[1fr_auto] gap-2">
          <div className="!mb-2 w-full bg-[#37424e] sticky top-0 border border-[#2da9ff] rounded-[.6rem] flex-1">
            <div
              className="rounded-[.5rem] bg-[#0876ff] !text-[#fff] !px-[0.6rem] !py-[0.3rem] !text-[1.1rem] font-semibold text-[var(--color-gray-700)] !tracking-[0] leading-[1.4] shadow-[0.4rem_0_0.6rem_rgba(255,255,255,0.2)]"
              style={{ width: `${progressPercent}%` }}
            >
              {doneCount} / {totalCount} ({progressPercent}%)
            </div>
          </div>
          <a
              href="https://github.com/jjoooon/study-nextjs-2026/archive/refs/heads/pub.zip"
              download
              className="!text-[1.2rem] text-[#0876ff] hover:underline shrik-0 block w-[8rem]"
            >
              📦다운로드 파일
            </a>
        </div>
        <table className="text-[1.2rem] IA-list m-0! shrink-0! ![&_b]:tracking-0">
          <colgroup>
            <col style={{ width: '1rem' }} />
            <col style={{ width: '4rem' }} />
            <col style={{ width: '8rem' }} />
            <col style={{ width: '12rem' }} />
            <col style={{ width: '6rem' }} />
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
              const rowBgClass = 'tracking-0';
              const rowIdBgClass = 'tracking-0';

              // pubInfoList 기준으로 완료일/수정일 표시
              const info = getPubInfo(row);
              const completeDate = info?.완료일 || row.date;
              const modifyDate = info?.수정일 || row.modify;

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
                  <td className={rowBgClass}>{row.dep4}</td>
                  <td className={rowBgClass}>{row.file}</td>
                  <td className={`text-center ${rowBgClass}`}>
                    <b>{row.phase === 'Y' ? 'Y' : ''}</b>
                  </td>
                  <td className={`text-center ${rowBgClass}`}>
                    <b>{completeDate}</b>
                  </td>
                  <td className={`text-center ${rowBgClass}`}>
                    <b>{modifyDate}</b>
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
