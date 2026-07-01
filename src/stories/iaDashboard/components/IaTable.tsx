/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import { IARow, SortKey, SortState, getRowKey, formatCompleteDate, isCompletedRow } from '../useIaDashboard';

type IATableProps = {
  sortedRows: IARow[];
  activeRow: IARow | null;
  setActiveRowKey: (key: string) => void;
  sortState: SortState;
  handleSort: (key: SortKey) => void;
  selectedPlan: string;
  setSelectedPlan: (val: string) => void;
  selectedPub: string;
  setSelectedPub: (val: string) => void;
  selectedDev: string;
  setSelectedDev: (val: string) => void;
  planOptions: string[];
  pubOptions: string[];
  devOptions: string[];
  totalCount: number;
  doneCount: number;
  progressPercent: number;
};

export function IaTable({
  sortedRows,
  activeRow,
  setActiveRowKey,
  sortState,
  handleSort,
  selectedPlan,
  setSelectedPlan,
  selectedPub,
  setSelectedPub,
  selectedDev,
  setSelectedDev,
  planOptions,
  pubOptions,
  devOptions,
  totalCount,
  doneCount,
  progressPercent,
}: IATableProps) {
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
    <div className="h-[calc(100vh-4rem)] overflow-auto flex flex-col justify-start min-w-[40rem]">
      <div className="!text-[1.4rem] IA-list m-0! shrink-0! ![&_b]:tracking-0 !text-[#000] flex items-center gap-4 mb-2">
        반입일: 2026.06.17
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
          className="!text-[1.2rem] text-[#0876ff] hover:underline shrik-0 block w-[auto]"
        >
          📦파일
        </a>
      </div>
      <table className="text-[1.2rem] IA-list m-0! shrink-0! ![&_b]:tracking-0">
        <colgroup>
          <col style={{ width: '3rem' }} />
          <col style={{ width: '6rem' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '5rem' }} />
          <col style={{ width: '4rem' }} />
          <col style={{ width: '4rem' }} />
          <col style={{ width: '4rem' }} />
          <col style={{ width: '4rem' }} />
          <col style={{ width: '4rem' }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="text-center!">
              No
            </th>
            <th
              scope="col"
              className="cursor-pointer select-none text-center!"
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
              className="cursor-pointer select-none text-center!"
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
              className="cursor-pointer select-none text-center!"
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
              className="cursor-pointer select-none text-center!"
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
              className="cursor-pointer select-none text-center!"
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
            <th scope="col" className="text-center !p-0">
              <label className="sr-only" htmlFor="planFilterSelect">
                기획 필터
              </label>
              <select
                id="planFilterSelect"
                className="h-[2.4rem] w-full rounded border border-0 bg-transparent px-0 text-[1.2rem]"
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
            <th scope="col" className="text-center !p-0">
              <label className="sr-only" htmlFor="pubFilterSelect">
                퍼블 필터
              </label>
              <select
                id="pubFilterSelect"
                className="h-[2.4rem] w-full rounded border border-0 bg-transparent px-0 text-[1.2rem]"
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
            <th scope="col" className="text-center !p-0">
              <label className="sr-only" htmlFor="devFilterSelect">
                개발 필터
              </label>
              <select
                id="devFilterSelect"
                className="h-[2.4rem] w-full rounded border border-0 bg-transparent px-0 text-[1.2rem]"
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

            const completeDate = formatCompleteDate(row.date ?? '');
            const modifyDate = formatCompleteDate(row.modify ?? '');
            const pub = row.pub ?? '';
            const isCompleted = isCompletedRow(row);

            return (
              <tr
                key={`${getRowKey(row)}-${index}`}
                data-active={isActive ? 'true' : undefined}
                className={[isActive ? 'selected' : '', isCompleted ? 'complete' : '', rowBgClass]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setActiveRowKey(getRowKey(row))}
              >
                <td className={rowBgClass + ' text-center'}>
                  <b>{row.num ?? index + 1}</b>
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
                <td className={`!text-center ${rowBgClass}`}>
                  <b>{completeDate}</b>
                </td>
                <td className={`!text-center ${rowBgClass}`}>
                  <b>{modifyDate}</b>
                </td>
                <td className={`text-center ${rowBgClass}`}>{row.plan}</td>
                <td className={`text-center ${rowBgClass}`}>{pub}</td>
                <td className={`text-center ${rowBgClass}`}>{row.dev}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
