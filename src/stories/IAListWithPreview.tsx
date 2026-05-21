/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ 'use client';

import { Grow } from '@atoms';
import * as React from 'react';
import LinkGo, { getStoryIframeUrl } from './Link';

import iaHsh from './ia-hsh.json';
import iaJhm from './ia-jhm.json';
import iaKot from './ia-kot.json';
import pub from './ia-pub.json';
import sData from './ia-sdate.json';
import iaListData from './ialist.json';

type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;
type SortOrder = 'default' | 'asc' | 'desc';
type SortKey = 'dep4' | 'file' | 'planDate' | 'plan' | 'pub' | 'dev' | 'path' | 'id' | 'completeDate' | 'modifyDate';
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
  planDate?: string;
  pubName?: string;
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

const pubInfoList: PubInfo[] = [...(iaHsh as PubInfo[]), ...(iaKot as PubInfo[]), ...(iaJhm as PubInfo[])];

// pubInfoList에서 화면아이디로 PubInfo를 찾는 헬퍼
const getPubInfo = (row: Pick<IARow, 'id' | 'subId'>) => {
  const bySubId = row.subId ? pubInfoList.find((info) => info.화면아이디 === row.subId) : undefined;
  return bySubId ?? pubInfoList.find((info) => info.화면아이디 === row.id);
};

const getRowKey = (row: Pick<IARow, 'id' | 'subId'>) => `${row.id}-${row.subId ?? ''}`;

const formatCompleteDate = (value: string) => value.replace(/^26\./, '');

const parseDateValue = (value: string, baseYear: number): Date | null => {
  const digits = value.replace(/\D/g, '');
  let year = baseYear;
  let month = 0;
  let day = 0;

  if (digits.length === 4) {
    month = Number(digits.slice(0, 2));
    day = Number(digits.slice(2, 4));
  } else if (digits.length === 6) {
    year = 2000 + Number(digits.slice(0, 2));
    month = Number(digits.slice(2, 4));
    day = Number(digits.slice(4, 6));
  } else if (digits.length === 8) {
    year = Number(digits.slice(0, 4));
    month = Number(digits.slice(4, 6));
    day = Number(digits.slice(6, 8));
  } else {
    return null;
  }

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }

  const parsed = new Date(year, month - 1, day);
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  parsed.setHours(0, 0, 0, 0);
  return parsed;
};

const isPastDate = (value: string, today: Date) => {
  const parsed = parseDateValue(value, today.getFullYear());
  if (!parsed) {
    return false;
  }
  return parsed.getTime() < today.getTime();
};

const isTodayDate = (value: string, today: Date) => {
  const parsed = parseDateValue(value, today.getFullYear());
  if (!parsed) {
    return false;
  }
  return parsed.getTime() === today.getTime();
};

export function IAListWithPreview() {
  const today = React.useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  const [showPhaseOnly] = React.useState(false);
  const [sortState, setSortState] = React.useState<SortState>({ key: null, order: 'default' });
  const [selectedPlan, setSelectedPlan] = React.useState<string>('all');
  const [selectedPub, setSelectedPub] = React.useState<string>('all');
  const [selectedDev, setSelectedDev] = React.useState<string>('all');
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
    return ROWS.map((row, index) => {
      const info = getPubInfo(row);
      const planDate = sData[index] ?? '';
      const pubName = pub[index] ?? '';
      if (!info) {
        return {
          ...row,
          planDate,
          pubName,
        };
      }
      const phase = info.완료일 ? 'Y' : row.phase;
      return {
        ...row,
        pub: info.이름,
        date: info.완료일 || row.date,
        modify: info.수정일 || row.modify,
        planDate,
        pubName,
        phase,
      };
    });
  }, []);

  const visibleRows = React.useMemo(() => {
    const filtered = rowsWithPubInfo.filter((row) => row.dep1 === '차세대가입설계');
    if (!showPhaseOnly) {
      return filtered;
    }
    return filtered.filter((row) => row.phase === 'Y');
  }, [rowsWithPubInfo, showPhaseOnly]);

  const pubOptions = React.useMemo(() => {
    const names = new Set<string>();
    visibleRows.forEach((row) => {
      const value = row.pubName ?? row.pub ?? '';
      if (value) {
        names.add(value);
      }
    });
    return Array.from(names).sort((left, right) => left.localeCompare(right, 'ko'));
  }, [visibleRows]);

  const devOptions = React.useMemo(() => {
    const names = new Set<string>();
    visibleRows.forEach((row) => {
      if (row.dev) {
        names.add(row.dev);
      }
    });
    return Array.from(names).sort((left, right) => left.localeCompare(right, 'ko'));
  }, [visibleRows]);

  const planOptions = React.useMemo(() => {
    const names = new Set<string>();
    visibleRows.forEach((row) => {
      if (row.plan) {
        names.add(row.plan);
      }
    });
    return Array.from(names).sort((left, right) => left.localeCompare(right, 'ko'));
  }, [visibleRows]);

  const ownerFilteredRows = React.useMemo(() => {
    return visibleRows.filter((row) => {
      const isPlanMatched = selectedPlan === 'all' || row.plan === selectedPlan;
      const pubName = row.pubName ?? row.pub ?? '';
      const isPubMatched = selectedPub === 'all' || pubName === selectedPub;
      const isDevMatched = selectedDev === 'all' || row.dev === selectedDev;
      return isPlanMatched && isPubMatched && isDevMatched;
    });
  }, [selectedDev, selectedPlan, selectedPub, visibleRows]);

  const totalCount = React.useMemo(() => ownerFilteredRows.length, [ownerFilteredRows]);
  const doneCount = React.useMemo(() => {
    return ownerFilteredRows.filter((row) => row.phase === 'Y').length;
  }, [ownerFilteredRows]);
  const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const activeRow = React.useMemo(() => {
    return ownerFilteredRows.find((row) => getRowKey(row) === activeRowKey) ?? ownerFilteredRows[0] ?? null;
  }, [activeRowKey, ownerFilteredRows]);

  const sortedRows = React.useMemo(() => {
    if (sortState.key === null || sortState.order === 'default') {
      return ownerFilteredRows;
    }
    const sortKey = sortState.key;
    return [...ownerFilteredRows].sort((left, right) => {
      // 날짜 정렬도 pubInfoList 기준으로 변경
      if (sortKey === 'completeDate' || sortKey === 'modifyDate') {
        const getDateNum = (row: IARow, type: 'completeDate' | 'modifyDate') => {
          const info = getPubInfo(row);
          const result = type === 'completeDate' ? info?.완료일 || row.date : info?.수정일 || row.modify;
          return result.replace(/\./g, '');
        };
        const leftValue = getDateNum(left, sortKey);
        const rightValue = getDateNum(right, sortKey);
        const compareResult = leftValue.localeCompare(rightValue);
        return sortState.order === 'asc' ? compareResult : -compareResult;
      }
      type SortableKeys = keyof Pick<IARow, 'dep4' | 'file' | 'planDate' | 'plan' | 'pub' | 'dev' | 'path' | 'id'>;
      if (!sortKey || !['dep4', 'file', 'planDate', 'plan', 'pub', 'dev', 'path', 'id'].includes(sortKey)) {
        return 0;
      }
      const key = sortKey as SortableKeys;
      const leftValue = key === 'pub' ? (left.pubName ?? left.pub ?? '') : (left[key] ?? '');
      const rightValue = key === 'pub' ? (right.pubName ?? right.pub ?? '') : (right[key] ?? '');
      const compareResult = leftValue.localeCompare(rightValue, 'ko');
      return sortState.order === 'asc' ? compareResult : -compareResult;
    });
  }, [ownerFilteredRows, sortState]);

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
          반입일: 2026.05.18
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
            <col style={{ width: '8rem' }} />
            <col style={{ width: '8rem' }} />
            <col style={{ width: '10rem' }} />
            <col style={{ width: '6rem' }} />
            <col />
            <col />
            <col />
            <col style={{ width: '7rem' }} />
            <col style={{ width: '7rem' }} />
            <col style={{ width: '7rem' }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th
                scope="col"
                className="cursor-pointer select-none"
                onClick={() => handleSort('path')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSort('path');
                }}
                role="button"
                aria-label="경로 정렬"
              >
                경로{getSortIndicator('path')}
              </th>
              <th
                scope="col"
                className="cursor-pointer select-none"
                onClick={() => handleSort('id')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSort('id');
                }}
                role="button"
                aria-label="ID 정렬"
              >
                ID{getSortIndicator('id')}
              </th>
              <th
                scope="col"
                className="cursor-pointer select-none"
                onClick={() => handleSort('dep4')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSort('dep4');
                }}
                role="button"
                aria-label="화면명 정렬"
              >
                화면명{getSortIndicator('dep4')}
              </th>
              <th
                scope="col"
                className="cursor-pointer select-none"
                onClick={() => handleSort('file')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSort('file');
                }}
                role="button"
                aria-label="설계서명 정렬"
              >
                설계서명{getSortIndicator('file')}
              </th>
              <th
                scope="col"
                className="cursor-pointer select-none"
                onClick={() => handleSort('planDate')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSort('planDate');
                }}
                role="button"
                aria-label="계획일 정렬"
              >
                계획일{getSortIndicator('planDate')}
              </th>
              <th
                scope="col"
                className="cursor-pointer select-none"
                onClick={() => handleSort('completeDate')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSort('completeDate');
                }}
                role="button"
                aria-label="완료일 정렬"
              >
                완료일{getSortIndicator('completeDate')}
              </th>
              <th
                scope="col"
                className="cursor-pointer select-none"
                onClick={() => handleSort('modifyDate')}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSort('modifyDate');
                }}
                role="button"
                aria-label="수정일 정렬"
              >
                수정일{getSortIndicator('modifyDate')}
              </th>
              <th scope="col" className="text-center">
                <label className="sr-only" htmlFor="planFilterSelect">
                  기획 필터
                </label>
                <select
                  id="planFilterSelect"
                  className="h-[2.4rem] w-full rounded border border-[#c8ccd3] bg-white px-1 text-[1.2rem]"
                  value={selectedPlan}
                  onChange={(event) => setSelectedPlan(event.target.value)}
                >
                  <option value="all">기획</option>
                  {planOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </th>
              <th scope="col" className="text-center">
                <label className="sr-only" htmlFor="pubFilterSelect">
                  퍼블 필터
                </label>
                <select
                  id="pubFilterSelect"
                  className="h-[2.4rem] w-full rounded border border-[#c8ccd3] bg-white px-1 text-[1.2rem]"
                  value={selectedPub}
                  onChange={(event) => setSelectedPub(event.target.value)}
                >
                  <option value="all">퍼블</option>
                  {pubOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </th>
              <th scope="col" className="text-center">
                <label className="sr-only" htmlFor="devFilterSelect">
                  개발 필터
                </label>
                <select
                  id="devFilterSelect"
                  className="h-[2.4rem] w-full rounded border border-[#c8ccd3] bg-white px-1 text-[1.2rem]"
                  value={selectedDev}
                  onChange={(event) => setSelectedDev(event.target.value)}
                >
                  <option value="all">개발</option>
                  {devOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
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
              const completeDate = formatCompleteDate(info?.완료일 || row.date);
              const modifyDate = formatCompleteDate(info?.수정일 || row.modify);
              const planDate = row.planDate ?? '';
              const pubName = row.pubName ?? '';

              const isPlanOverdue = isPastDate(planDate, today);
              const isPlanToday = isTodayDate(planDate, today);
              const planDateTextClass = !info?.완료일
                ? isPlanOverdue
                  ? '!text-[red]'
                  : isPlanToday
                    ? '!text-[blue]'
                    : ''
                : '';

              return (
                <tr
                  key={`${getRowKey(row)}-${index}`}
                  data-active={isActive ? 'true' : undefined}
                  className={[isActive ? 'selected' : '', info?.완료일 ? 'complete' : '', rowBgClass]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setActiveRowKey(getRowKey(row))}
                >
                  <td className={rowBgClass + ' text-center'}>
                    <b>{index + 1}</b>
                  </td>
                  <td className={rowBgClass + ' '}>
                    <span className="break-all !text-[1.1rem]">{row.path ?? ''}</span>
                  </td>
                  <td scope="row" className={rowIdBgClass}>
                    <b>{row.id}</b>
                    {row.subId ? (
                      <>
                        <br />
                        <span className="break-all !text-[1rem]">({row.subId})</span>
                      </>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className={rowBgClass}>{row.dep4}</td>
                  <td className={rowBgClass}>{row.file}</td>

                  <td className={`text-center ${rowBgClass} ${planDateTextClass}`}>
                    <b>{planDate}</b>
                  </td>
                  <td className={`!text-center ${rowBgClass}`}>
                    <b>{completeDate}</b>
                  </td>
                  <td className={`!text-center ${rowBgClass}`}>
                    <b>{modifyDate}</b>
                  </td>
                  <td className={`text-center ${rowBgClass}`}>{row.plan}</td>
                  <td className={`text-center ${rowBgClass}`}>{pubName}</td>
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
